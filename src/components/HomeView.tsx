"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FeedPage, Game } from "@/lib/types";
import type { FeedTab } from "@/lib/feed";
import { useApp } from "./AppState";
import GameCard from "./GameCard";
import PlayOverlay from "./PlayOverlay";
import LeaveGate, { type LeaveTarget } from "./LeaveGate";
import SidePanel from "./SidePanel";

export default function HomeView() {
  const { ready, mode, interests, markPlayed } = useApp();
  const [tab, setTab] = useState<FeedTab>("foryou");
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState(false);
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState<Game | null>(null);
  const [leaving, setLeaving] = useState<LeaveTarget | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const cursor = useRef<number | null>(0);
  const busy = useRef(false);
  const key = `${mode}|${interests.join(",")}|${tab}`;

  const loadMore = useCallback(async () => {
    if (busy.current || cursor.current === null) return;
    busy.current = true; setError(false);
    try {
      const q = new URLSearchParams({ mode, tab, cursor: String(cursor.current), genres: interests.join(",") });
      const r = await fetch(`/api/feed?${q}`);
      if (!r.ok) throw new Error();
      const page = (await r.json()) as FeedPage;
      cursor.current = page.nextCursor;
      setGames((g) => [...g, ...page.games]);
    } catch { setError(true); } finally { busy.current = false; }
  }, [mode, tab, interests]);

  // New mode / interests / tab: start the feed over from the top.
  useEffect(() => {
    if (!ready) return;
    cursor.current = 0; setGames([]); setActive(0);
    scroller.current?.scrollTo({ top: 0 });
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, key]);

  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const io = new IntersectionObserver((es) => {
      for (const e of es) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
    }, { root, threshold: 0.6 });
    root.querySelectorAll(".card").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [games.length]);

  useEffect(() => { if (games.length && active >= games.length - 3) loadMore(); }, [active, games.length, loadMore]);

  const jump = useCallback((i: number) => {
    const root = scroller.current;
    if (root) root.scrollTo({ top: i * root.clientHeight, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (playing || leaving || (e.target as HTMLElement).closest("input, textarea")) return;
      if (e.key === "ArrowDown" || e.key === "j") { e.preventDefault(); jump(active + 1); }
      if (e.key === "ArrowUp" || e.key === "k") { e.preventDefault(); jump(Math.max(0, active - 1)); }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [active, jump, playing, leaving]);

  const play = (g: Game) => { markPlayed(g.id); setPlaying(g); };
  const busyOverlay = !!playing || !!leaving;

  return (
    <div className="home">
      <div className="player-col">
        <div className="feed-tabs phone-only" role="tablist">
          <button role="tab" aria-selected={tab === "foryou"} className={tab === "foryou" ? "on" : ""} onClick={() => setTab("foryou")}>For You</button>
          <Link role="tab" aria-selected={false} href="/following">Following</Link>
          <button role="tab" aria-selected={tab === "new"} className={tab === "new" ? "on" : ""} onClick={() => setTab("new")}>New</button>
        </div>
        <div className="feed" ref={scroller}>
          {games.map((g, i) => (
            <GameCard key={`${g.id}-${i}`} game={g} index={i} active={i === active} suspended={busyOverlay}
              preload={i === active + 1} muted={muted} onMuted={setMuted} onPlay={play} onLeave={setLeaving} />
          ))}
          {games.length === 0 && (
            <div className="feed-empty">
              {error ? <><p>Couldn&apos;t load games.</p><button onClick={loadMore}>Retry</button></> : <div className="spinner" />}
            </div>
          )}
        </div>
      </div>

      <SidePanel game={games[active]} tab={tab} onTab={setTab} />

      {playing && (
        <PlayOverlay game={playing} onClose={() => setPlaying(null)}
          onFullGame={() => setLeaving({ game: playing, url: playing.fullGameUrl, what: "full" })} />
      )}
      {leaving && <LeaveGate target={leaving} onDone={() => setLeaving(null)} />}
    </div>
  );
}

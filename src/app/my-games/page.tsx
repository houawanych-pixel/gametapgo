"use client";

import { useState } from "react";
import { GAMES } from "@/lib/games";
import { canSee } from "@/lib/ratings";
import type { Game } from "@/lib/types";
import { useApp } from "@/components/AppState";
import RatingBadge from "@/components/RatingBadge";
import PlayOverlay from "@/components/PlayOverlay";
import LeaveGate, { type LeaveTarget } from "@/components/LeaveGate";
import { Bookmark, PlaySolid } from "@/components/Icons";

type Tab = "all" | "demos" | "full";

export default function MyGamesPage() {
  const { ready, mode, lists, markPlayed, toggleSaved } = useApp();
  const [tab, setTab] = useState<Tab>("all");
  const [playing, setPlaying] = useState<Game | null>(null);
  const [leaving, setLeaving] = useState<LeaveTarget | null>(null);

  const pick = (ids: string[]) =>
    ids.map((id) => GAMES.find((g) => g.id === id)).filter((g): g is Game => !!g && canSee(mode, g.rating));
  const all = pick(lists.saved);
  const demos = pick(lists.played);
  const full = pick(lists.fullGame);
  const shown = tab === "all" ? all : tab === "demos" ? demos : full;

  return (
    <div className="page wide">
      <h1 className="with-icon"><Bookmark size={26} filled /> My Games</h1>
      <div className="seg" role="tablist">
        {([["all", `All (${all.length})`], ["demos", `Demos played (${demos.length})`], ["full", `Full games (${full.length})`]] as const).map(([id, label]) => (
          <button key={id} role="tab" aria-selected={tab === id} className={tab === id ? "on" : ""} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>

      {ready && shown.length === 0 && (
        <p className="muted empty">
          {tab === "all" ? "Nothing saved yet. Tap Save on any game in the feed." : tab === "demos" ? "Demos you play show up here." : "Games you've gone to get show up here."}
        </p>
      )}

      <div className="grid">
        {shown.map((g) => (
          <article key={g.id} className="tile">
            <div className="tile-art" style={{ backgroundImage: `url(${g.poster})` }}>
              <span className="tile-badge"><RatingBadge rating={g.rating} size="sm" /></span>
              {tab === "all" && (
                <button className="tile-unsave" aria-label={`Remove ${g.title}`} onClick={() => toggleSaved(g.id)}>×</button>
              )}
            </div>
            <div className="tile-body">
              <strong>{g.title}</strong>
              <small>{g.genres[0]}</small>
              <button className="tile-play" onClick={() => {
                if (g.demo.kind === "web") { markPlayed(g.id); setPlaying(g); }
                else setLeaving({ game: g, url: g.demo.url, what: "demo" });
              }}>
                <PlaySolid size={16} /> {g.demo.kind === "web" ? "Play Demo" : "Get Demo"}
              </button>
              <button className="tile-full" onClick={() => setLeaving({ game: g, url: g.fullGameUrl, what: "full" })}>Get Full Game</button>
            </div>
          </article>
        ))}
      </div>

      {playing && <PlayOverlay game={playing} onClose={() => setPlaying(null)}
        onFullGame={() => setLeaving({ game: playing, url: playing.fullGameUrl, what: "full" })} />}
      {leaving && <LeaveGate target={leaving} onDone={() => setLeaving(null)} />}
    </div>
  );
}

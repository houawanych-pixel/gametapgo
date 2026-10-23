"use client";

import { useEffect, useRef, useState } from "react";
import type { Game } from "@/lib/types";
import { useApp } from "./AppState";
import { Bookmark, Bubble, Heart, PlaySolid, Plus, Send, SpeakerOff, SpeakerOn, Verified } from "./Icons";
import RatingBadge from "./RatingBadge";
import DevAvatar, { compact } from "./DevAvatar";
import type { LeaveTarget } from "./LeaveGate";

type Props = {
  game: Game;
  index: number;
  active: boolean;
  suspended: boolean;
  preload: boolean;
  muted: boolean;
  onMuted: (m: boolean) => void;
  onPlay: (g: Game) => void;
  onLeave: (t: LeaveTarget) => void;
};

export default function GameCard({ game, index, active, suspended, preload, muted, onMuted, onPlay, onLeave }: Props) {
  const v = useRef<HTMLVideoElement>(null);
  const { lists, toggleSaved } = useApp();
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const saved = lists.saved.includes(game.id);

  // Only the active card's trailer plays; others pause and rewind.
  useEffect(() => {
    const el = v.current;
    if (!el) return;
    if (active && !suspended) {
      el.play().catch(() => { el.muted = true; onMuted(true); el.play().catch(() => {}); });
    } else {
      el.pause();
      if (!active) el.currentTime = 0;
    }
  }, [active, suspended, onMuted]);

  useEffect(() => { if (v.current) v.current.muted = muted; }, [muted]);

  const flash = (m: string) => { setToast(m); setTimeout(() => setToast(null), 1500); };
  const share = async () => {
    const url = `${location.origin}/?game=${game.id}`;
    try {
      if (navigator.share) await navigator.share({ title: game.title, url });
      else { await navigator.clipboard.writeText(url); flash("Link copied"); }
    } catch { /* closed */ }
  };

  const web = game.demo.kind === "web";

  return (
    <section className="card" data-index={index} aria-label={game.title}>
      <div className="stage">
        <video ref={v} className="trailer" src={game.trailer} poster={game.poster} playsInline loop muted={muted}
          preload={active || preload ? "auto" : "none"} />
        <div className="shade" />

        <span className="badge-pos"><RatingBadge rating={game.rating} /></span>
        <button className="mute" onClick={() => onMuted(!muted)} aria-label={muted ? "Unmute trailer" : "Mute trailer"}>
          {muted ? <SpeakerOff /> : <SpeakerOn />}
        </button>

        <div className="rail">
          <div className="dev-wrap">
            <DevAvatar dev={game.developer} size={48} />
            <button className={`dev-follow ${following ? "on" : ""}`} aria-pressed={following}
              aria-label={following ? `Unfollow ${game.developer.name}` : `Follow ${game.developer.name}`}
              onClick={() => setFollowing((f) => !f)}>
              {following ? "✓" : <Plus size={13} />}
            </button>
          </div>
          <button className={`act ${liked ? "liked" : ""}`} onClick={() => setLiked((l) => !l)} aria-pressed={liked} aria-label="Like">
            <Heart filled={liked} /><span>{compact(game.likes + (liked ? 1 : 0))}</span>
          </button>
          <button className="act" onClick={() => flash("Comments coming soon")} aria-label="Comments">
            <Bubble /><span>{compact(game.comments)}</span>
          </button>
          <button className={`act save ${saved ? "on" : ""}`} onClick={() => { toggleSaved(game.id); flash(saved ? "Removed from My Games" : "Saved to My Games"); }}
            aria-pressed={saved} aria-label={saved ? "Remove from My Games" : "Save to My Games"}>
            <span className="save-chip"><Bookmark size={22} filled={saved} /></span><span>{saved ? "Saved" : "Save"}</span>
          </button>
          <button className="act" onClick={share} aria-label="Share"><Send /><span>Share</span></button>
          {toast && <div className="toast" role="status">{toast}</div>}
        </div>

        <div className="info">
          <h2 className="g-title">{game.title}</h2>
          <p className="g-dev"><DevAvatar dev={game.developer} size={20} /> {game.developer.name} <Verified size={14} /></p>
          <div className="chips">
            {game.genres.slice(0, 1).map((g) => <span key={g} className="chip strong">{g}</span>)}
            {game.platforms.map((p) => <span key={p} className="chip">{p}</span>)}
          </div>
          <button className="tap-btn" onClick={() => (web ? onPlay(game) : onLeave({ game, url: game.demo.url, what: "demo" }))}>
            <PlaySolid /> {web ? "TAP TO PLAY" : "GET DEMO"}
          </button>
          {!web && <p className="demo-note">This game&apos;s demo is a download for {game.platforms.join(" / ")}.</p>}
          <button className="full-btn" onClick={() => onLeave({ game, url: game.fullGameUrl, what: "full" })}>Get Full Game</button>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import type { Game } from "@/lib/types";
import { Arrow, Close } from "./Icons";
import RatingBadge from "./RatingBadge";

/**
 * Runs a web demo full-screen in a locked-down frame.
 * sandbox="allow-scripts" WITHOUT allow-same-origin: the demo gets its own blank origin,
 * so it can't read GameTapGo cookies/storage, open pop-ups, submit forms or navigate us.
 * Before launch, uploaded demos are also served from a separate domain (like itch.io's html.itch.zone).
 */
export default function PlayOverlay({ game, onClose, onFullGame }: {
  game: Game; onClose: () => void; onFullGame: () => void;
}) {
  const [ended, setEnded] = useState<number | null>(null);

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      // Sandboxed frames report origin "null"; only accept our demo's end message shape.
      const d = e.data as { type?: unknown; score?: unknown };
      if (d && d.type === "gtg:demo-end") setEnded(typeof d.score === "number" ? d.score : 0);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("message", onMsg);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("message", onMsg);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (game.demo.kind !== "web") return null;

  return (
    <div className="play" role="dialog" aria-modal="true" aria-label={`Playing ${game.title} demo`}>
      <div className="play-bar">
        <button onClick={onClose} aria-label="Close demo" className="icon-round"><Close /></button>
        <span className="play-title">{game.title} <RatingBadge rating={game.rating} size="sm" /></span>
        <button className="full-btn small" onClick={onFullGame}>Get Full Game <Arrow size={16} /></button>
      </div>
      <div className="play-stage">
        <iframe
          src={game.demo.url}
          title={`${game.title} demo`}
          sandbox="allow-scripts"
          allow="autoplay; fullscreen; gamepad"
          referrerPolicy="no-referrer"
        />
        {ended !== null && (
          <div className="demo-end">
            <p className="big">Demo over!</p>
            <p className="muted">You scored {ended}. Liked it?</p>
            <button className="tap-btn" onClick={onFullGame}>Get Full Game</button>
            <button className="ghost" onClick={onClose}>Back to games</button>
          </div>
        )}
      </div>
    </div>
  );
}

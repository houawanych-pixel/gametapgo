"use client";

import type { Game } from "@/lib/types";
import { useApp } from "./AppState";
import { PinPrompt } from "./ParentLock";
import { Arrow } from "./Icons";

export type LeaveTarget = { game: Game; url: string; what: "full" | "demo" };

/**
 * Leaving GameTapGo for a developer's store or download page.
 * Kids Mode: a grown-up must enter the parent PIN first ("ask a grown-up to buy").
 * Other modes: a plain "you're leaving" confirmation.
 */
export default function LeaveGate({ target, onDone }: { target: LeaveTarget; onDone: () => void }) {
  const { mode, markFullGame } = useApp();
  const go = () => {
    if (target.what === "full") markFullGame(target.game.id);
    window.open(target.url, "_blank", "noopener,noreferrer");
    onDone();
  };
  const label = target.what === "full" ? "the full game" : "the demo download";

  if (mode === "kids") {
    return <PinPrompt title={`Get ${target.game.title}?`}
      note={`This opens ${target.game.developer.name}'s website to get ${label}. A grown-up needs to say OK.`}
      onPass={go} onCancel={onDone} />;
  }

  return (
    <div className="sheet-backdrop" onClick={onDone}>
      <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="leave-title" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grip" />
        <h2 id="leave-title">Leaving GameTapGo</h2>
        <p className="muted">You&apos;re going to {target.game.developer.name}&apos;s website to get {label} of <strong>{target.game.title}</strong>. Prices and purchases are handled there.</p>
        <div className="sheet-actions">
          <button className="ghost" onClick={onDone}>Stay</button>
          <button className="go" onClick={go}>Continue <Arrow size={16} /></button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { MODE_LABEL } from "@/lib/ratings";
import { useApp } from "./AppState";
import { Lock } from "./Icons";
import { ModeSheet } from "./ParentLock";

/** "Kids Mode ON" card with switch. Opens the mode chooser (parent PIN to go up). */
export default function ModeCard({ compact = false }: { compact?: boolean }) {
  const { mode } = useApp();
  const [open, setOpen] = useState(false);
  const kids = mode === "kids";
  return (
    <>
      <button className={`mode-card ${kids ? "kids" : ""} ${compact ? "compact" : ""}`} onClick={() => setOpen(true)}
        aria-label={`${MODE_LABEL[mode]} is on. Change mode`}>
        <span className="mc-top">
          <Lock size={20} />
          <strong>{kids ? "Kids Mode ON" : `${MODE_LABEL[mode]}`}</strong>
          <span className={`switch ${kids ? "on" : ""}`} aria-hidden><span /></span>
        </span>
        {!compact && (
          <span className="mc-sub">
            {kids ? "Kid-friendly games only, with age ratings" : mode === "teen" ? "Everyone, 10+ and Teen games" : "All games, including Mature"}
          </span>
        )}
      </button>
      {open && <ModeSheet onClose={() => setOpen(false)} />}
    </>
  );
}

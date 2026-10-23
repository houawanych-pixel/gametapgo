"use client";

import { useState } from "react";
import { MODE_LABEL } from "@/lib/ratings";
import type { Mode } from "@/lib/types";
import { useApp } from "./AppState";
import { Lock } from "./Icons";

/** Asks for the parent PIN. If no PIN exists yet, the grown-up creates one first. */
export function PinPrompt({ title, note, onPass, onCancel }: {
  title: string; note?: string; onPass: () => void; onCancel: () => void;
}) {
  const { hasPin, setPin, checkPin } = useApp();
  const [pin, setPinText] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");
  const creating = !hasPin;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{4}$/.test(pin)) return setErr("Use 4 numbers.");
    if (creating) {
      if (pin !== confirm) return setErr("The two PINs don't match.");
      setPin(pin);
      return onPass();
    }
    if (checkPin(pin)) onPass();
    else { setErr("That's not the parent PIN."); setPinText(""); }
  };

  return (
    <div className="sheet-backdrop" onClick={onCancel}>
      <form className="sheet" role="dialog" aria-modal="true" aria-labelledby="pin-title"
        onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <div className="sheet-grip" />
        <p className="sheet-icon"><Lock size={28} /></p>
        <h2 id="pin-title">{title}</h2>
        <p className="muted">
          {creating ? "Grown-up: create a 4-number parent PIN. Kids will need it to change modes or leave GameTapGo." : "Ask a grown-up to enter the parent PIN."}
        </p>
        {note && <p className="note">{note}</p>}
        <input className="pin" inputMode="numeric" autoComplete="off" maxLength={4} placeholder="••••" aria-label="Parent PIN"
          type="password" value={pin} autoFocus onChange={(e) => { setPinText(e.target.value.replace(/\D/g, "")); setErr(""); }} />
        {creating && (
          <input className="pin" inputMode="numeric" autoComplete="off" maxLength={4} placeholder="Repeat" aria-label="Repeat PIN"
            type="password" value={confirm} onChange={(e) => { setConfirm(e.target.value.replace(/\D/g, "")); setErr(""); }} />
        )}
        {err && <p className="err">{err}</p>}
        <div className="sheet-actions">
          <button type="button" className="ghost" onClick={onCancel}>Cancel</button>
          <button type="submit" className="go">{creating ? "Save PIN" : "Unlock"}</button>
        </div>
      </form>
    </div>
  );
}

const MODES: { id: Mode; desc: string }[] = [
  { id: "kids", desc: "Everyone and 10+ games only. No tracking." },
  { id: "teen", desc: "Adds Teen (13+) games." },
  { id: "adult", desc: "All games, including Mature (17+)." },
];

/** Switch between Kids / Teen / Adult. Going down is free; going up needs the parent PIN. */
export function ModeSheet({ onClose }: { onClose: () => void }) {
  const { mode, setMode } = useApp();
  const [want, setWant] = useState<Mode | null>(null);
  const [adultOk, setAdultOk] = useState(false);
  const rank = (m: Mode) => MODES.findIndex((x) => x.id === m);

  if (want) {
    return (
      <PinPrompt title={`Unlock ${MODE_LABEL[want]}`}
        note={want === "adult" ? "Preview only. Before launch, Adult Mode will need a real ID age check, not just the PIN." : undefined}
        onPass={() => { setMode(want); onClose(); }} onCancel={() => setWant(null)} />
    );
  }

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="mode-title" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grip" />
        <h2 id="mode-title">Who&apos;s playing?</h2>
        <div className="modes">
          {MODES.map((m) => (
            <button key={m.id} className={`mode-opt ${mode === m.id ? "on" : ""}`}
              disabled={m.id === "adult" && mode !== "adult" && !adultOk}
              onClick={() => {
                if (m.id === mode) return onClose();
                if (rank(m.id) < rank(mode)) { setMode(m.id); onClose(); } else setWant(m.id);
              }}>
              <strong>{MODE_LABEL[m.id]}</strong>
              <span>{m.desc}</span>
            </button>
          ))}
        </div>
        {mode !== "adult" && (
          <label className="check">
            <input type="checkbox" checked={adultOk} onChange={(e) => setAdultOk(e.target.checked)} />
            I&apos;m a grown-up, 17 or older
          </label>
        )}
        <button className="ghost wide" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

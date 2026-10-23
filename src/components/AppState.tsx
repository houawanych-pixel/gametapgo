"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Genre, Mode } from "@/lib/types";

/**
 * Device-only state for the preview. Nothing here leaves the browser.
 * Accounts phase: mode comes from the verified account, saves move to the database.
 */
type Lists = { saved: string[]; played: string[]; fullGame: string[] };
type State = {
  ready: boolean;
  mode: Mode;
  interests: Genre[];
  hasPin: boolean;
  lists: Lists;
};
type Api = State & {
  setMode: (m: Mode) => void;
  toggleInterest: (g: Genre) => void;
  setPin: (pin: string) => void;
  checkPin: (pin: string) => boolean;
  toggleSaved: (id: string) => void;
  markPlayed: (id: string) => void;
  markFullGame: (id: string) => void;
};

const KEY = "gtg.v1";
const EMPTY: Lists = { saved: [], played: [], fullGame: [] };
type Stored = { mode?: Mode; interests?: Genre[]; pinHash?: string; lists?: Lists };

// Not real security (the device holds it); it just stops a kid tapping straight past.
// The accounts phase replaces this with a parent account check on the server.
function hashPin(pin: string) {
  let h = 5381;
  for (const ch of `gtg:${pin}`) h = ((h << 5) + h + ch.charCodeAt(0)) | 0;
  return String(h >>> 0);
}

function load(): Stored {
  try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; }
}
function save(s: Stored) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* storage blocked */ }
}

const Ctx = createContext<Api | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [stored, setStored] = useState<Stored>({});
  const [ready, setReady] = useState(false);

  useEffect(() => { setStored(load()); setReady(true); }, []);

  const update = useCallback((fn: (s: Stored) => Stored) => {
    setStored((s) => { const next = fn(s); save(next); return next; });
  }, []);

  const lists = stored.lists ?? EMPTY;
  const toggleIn = (arr: string[], id: string) => (arr.includes(id) ? arr.filter((x) => x !== id) : [id, ...arr]);
  const addFront = (arr: string[], id: string) => [id, ...arr.filter((x) => x !== id)].slice(0, 50);

  const api = useMemo<Api>(() => ({
    ready,
    mode: stored.mode ?? "kids",
    interests: stored.interests ?? [],
    hasPin: !!stored.pinHash,
    lists,
    setMode: (mode) => update((s) => ({ ...s, mode })),
    toggleInterest: (g) => update((s) => {
      const cur = s.interests ?? [];
      return { ...s, interests: cur.includes(g) ? cur.filter((x) => x !== g) : [...cur, g] };
    }),
    setPin: (pin) => update((s) => ({ ...s, pinHash: hashPin(pin) })),
    checkPin: (pin) => !!stored.pinHash && hashPin(pin) === stored.pinHash,
    toggleSaved: (id) => update((s) => ({ ...s, lists: { ...(s.lists ?? EMPTY), saved: toggleIn((s.lists ?? EMPTY).saved, id) } })),
    markPlayed: (id) => update((s) => ({ ...s, lists: { ...(s.lists ?? EMPTY), played: addFront((s.lists ?? EMPTY).played, id) } })),
    markFullGame: (id) => update((s) => ({ ...s, lists: { ...(s.lists ?? EMPTY), fullGame: addFront((s.lists ?? EMPTY).fullGame, id) } })),
  }), [ready, stored, lists, update]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp outside AppStateProvider");
  return v;
}

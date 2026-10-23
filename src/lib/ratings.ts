import type { Mode, Rating } from "./types";

/** Which ratings each mode may ever see. Enforced on the server when the feed is built. */
export const ALLOWED: Record<Mode, readonly Rating[]> = {
  kids: ["E", "10+"],
  teen: ["E", "10+", "T"],
  adult: ["E", "10+", "T", "M"],
};

export const RATING_LABEL: Record<Rating, string> = {
  E: "Everyone",
  "10+": "Ages 10+",
  T: "Teen 13+",
  M: "Mature 17+",
};

export const MODE_LABEL: Record<Mode, string> = {
  kids: "Kids Mode",
  teen: "Teen Mode",
  adult: "Adult Mode",
};

export function isMode(x: unknown): x is Mode {
  return x === "kids" || x === "teen" || x === "adult";
}

export function canSee(mode: Mode, rating: Rating) {
  return ALLOWED[mode].includes(rating);
}

import { GAMES } from "./games";
import { ALLOWED } from "./ratings";
import { GENRES, type FeedPage, type Game, type Genre, type Mode } from "./types";

export const PAGE_SIZE = 6;

export type FeedTab = "foryou" | "new";

export function parseGenres(raw: string | null): Genre[] {
  if (!raw) return [];
  return raw.split(",").filter((g): g is Genre => (GENRES as readonly string[]).includes(g)).slice(0, 8);
}

/**
 * Simple, explainable ranking:
 *  1. Age filter first. A game outside the mode's ratings is never a candidate.
 *  2. Interests (genres the player or parent picked) add the most.
 *  3. Popularity (likes + saves) and freshness break ties.
 * Kids' interests come only from what they picked, never from tracking them.
 */
export function rankGames(mode: Mode, interests: Genre[], tab: FeedTab, games: Game[] = GAMES): Game[] {
  const allowed = games.filter((g) => ALLOWED[mode].includes(g.rating));
  const now = Date.parse("2026-10-23");
  const score = (g: Game) => {
    const match = g.genres.filter((x) => interests.includes(x)).length;
    const pop = Math.log10(1 + g.likes + 2 * g.saves);
    const ageDays = Math.max(0, (now - Date.parse(g.addedAt)) / 86_400_000);
    const fresh = Math.max(0, 1 - ageDays / 30);
    return tab === "new" ? fresh * 10 + pop * 0.1 : match * 3 + pop + fresh;
  };
  return [...allowed].sort((a, b) => score(b) - score(a));
}

/** Endless feed: the ranked list repeats so swiping never dead-ends in the preview. */
export function buildFeed(mode: Mode, interests: Genre[], tab: FeedTab, cursor = 0, size = PAGE_SIZE): FeedPage {
  const ranked = rankGames(mode, interests, tab);
  if (ranked.length === 0) return { games: [], nextCursor: null, mode };
  const games = Array.from({ length: size }, (_, i) => ranked[(cursor + i) % ranked.length]);
  return { games, nextCursor: cursor + size, mode };
}

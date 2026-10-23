import { NextResponse } from "next/server";
import { buildFeed, parseGenres, type FeedTab } from "@/lib/feed";
import { isMode } from "@/lib/ratings";

export const dynamic = "force-dynamic";

/**
 * GET /api/feed?mode=kids|teen|adult&genres=Racing,Puzzle&tab=foryou|new&cursor=0
 * The age filter runs here, on the server. Unknown or missing mode = kids.
 * TODO (accounts phase): take mode from the signed-in, age-verified account instead of the query.
 */
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const rawMode = q.get("mode");
  const mode = isMode(rawMode) ? rawMode : "kids";
  const tab: FeedTab = q.get("tab") === "new" ? "new" : "foryou";
  const cursor = Math.max(0, Number(q.get("cursor")) || 0);
  return NextResponse.json(buildFeed(mode, parseGenres(q.get("genres")), tab, cursor));
}

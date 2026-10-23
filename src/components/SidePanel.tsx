"use client";

import { useState } from "react";
import { rankGames, type FeedTab } from "@/lib/feed";
import { GENRES, type Game } from "@/lib/types";
import { useApp } from "./AppState";
import DevAvatar, { compact } from "./DevAvatar";
import RatingBadge from "./RatingBadge";
import { Verified } from "./Icons";

const GENRE_COLOR: Record<string, string> = {
  Racing: "#ff4f6d", Puzzle: "#8b5cf6", Adventure: "#2f7bff", Sports: "#ff8a1f",
  Platformer: "#36d15c", Action: "#ef4444", Strategy: "#14b8a6", Shooter: "#71717a",
};

/** Desktop right column: developer card, trending games (age-filtered), browse by genre. */
export default function SidePanel({ game, tab, onTab }: { game?: Game; tab: FeedTab; onTab: (t: FeedTab) => void }) {
  const { mode, interests, toggleInterest } = useApp();
  const [follow, setFollow] = useState<Record<string, boolean>>({});
  const trending = rankGames(mode, [], "foryou").slice(0, 4);
  const genres = mode === "kids" ? GENRES.filter((g) => g !== "Shooter") : GENRES;
  const d = game?.developer;

  return (
    <aside className="side desk-wide" aria-label="Developer and trending games">
      <div className="tabs-desk">
        <button className={tab === "foryou" ? "on" : ""} onClick={() => onTab("foryou")}>For You</button>
        <button className={tab === "new" ? "on" : ""} onClick={() => onTab("new")}>New</button>
      </div>

      {d && (
        <section className="panel">
          <div className="dev-row">
            <DevAvatar dev={d} size={54} />
            <div className="dev-id">
              <p className="name">{d.name} <Verified size={15} /></p>
              <p className="muted small">@{d.id} · {compact(d.followers + (follow[d.id] ? 1 : 0))} followers</p>
            </div>
          </div>
          <p className="bio">{d.bio}</p>
          <button className={`follow-wide ${follow[d.id] ? "on" : ""}`} aria-pressed={!!follow[d.id]}
            onClick={() => setFollow((f) => ({ ...f, [d.id]: !f[d.id] }))}>
            {follow[d.id] ? "Following" : "Follow"}
          </button>
        </section>
      )}

      <section className="panel">
        <h3>Trending Games</h3>
        <ul className="trend">
          {trending.map((g) => (
            <li key={g.id}>
              <span className="trend-thumb" style={{ backgroundImage: `url(${g.poster})` }} />
              <span className="trend-text">
                <strong>{g.title}</strong>
                <small>{g.genres[0]}</small>
                <small className="muted">{compact(g.likes)} likes</small>
              </span>
              <RatingBadge rating={g.rating} size="sm" />
            </li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <h3>Browse by Genre</h3>
        <p className="muted small">{mode === "kids" ? "Pick what you like. Your feed follows your picks." : "Tap genres to steer your feed."}</p>
        <div className="genre-chips">
          {genres.map((g) => {
            const on = interests.includes(g);
            return (
              <button key={g} className={`genre ${on ? "on" : ""}`} aria-pressed={on}
                style={{ ["--gc" as string]: GENRE_COLOR[g] }} onClick={() => toggleInterest(g)}>
                {g}
              </button>
            );
          })}
        </div>
      </section>
    </aside>
  );
}

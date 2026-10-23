"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { rankGames } from "@/lib/feed";
import { GENRES } from "@/lib/types";
import { useApp } from "@/components/AppState";
import ModeCard from "@/components/ModeCard";
import RatingBadge from "@/components/RatingBadge";
import { Search } from "@/components/Icons";

function Explore() {
  const { mode, interests, toggleInterest } = useApp();
  const [q, setQ] = useState(useSearchParams().get("q") ?? "");
  const genres = mode === "kids" ? GENRES.filter((g) => g !== "Shooter") : GENRES;
  const needle = q.trim().toLowerCase();
  // Same age filter as the feed: search can never surface a game above the current mode.
  const results = rankGames(mode, interests, "foryou").filter((g) =>
    !needle || g.title.toLowerCase().includes(needle) || g.developer.name.toLowerCase().includes(needle) ||
    g.genres.some((x) => x.toLowerCase().includes(needle)));

  return (
    <div className="page wide">
      <h1>Explore</h1>
      <label className="search-big">
        <Search />
        <input type="search" placeholder="Search games, developers…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search games" />
      </label>

      <h2 className="h2">What do you like?</h2>
      <p className="muted small">{mode === "kids" ? "Your feed shows more of what you pick. We don't track what you watch." : "Picks steer your For You feed."}</p>
      <div className="genre-chips">
        {genres.map((g) => (
          <button key={g} className={`genre ${interests.includes(g) ? "on" : ""}`} aria-pressed={interests.includes(g)} onClick={() => toggleInterest(g)}>{g}</button>
        ))}
      </div>

      <div className="phone-only"><ModeCard /></div>

      <h2 className="h2">{needle ? `Results for “${q}”` : "Games for you"}</h2>
      <ul className="trend big">
        {results.map((g) => (
          <li key={g.id}>
            <span className="trend-thumb" style={{ backgroundImage: `url(${g.poster})` }} />
            <span className="trend-text"><strong>{g.title}</strong><small>{g.genres.join(" · ")}</small><small className="muted">{g.developer.name}</small></span>
            <RatingBadge rating={g.rating} size="sm" />
          </li>
        ))}
        {results.length === 0 && <li className="muted">No games match.</li>}
      </ul>
    </div>
  );
}

export default function Page() {
  return <Suspense><Explore /></Suspense>;
}

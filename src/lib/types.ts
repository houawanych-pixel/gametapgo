/** Age ratings, lowest to highest. */
export const RATINGS = ["E", "10+", "T", "M"] as const;
export type Rating = (typeof RATINGS)[number];

/** Who is using the site right now. Kids is the default for everyone logged out. */
export type Mode = "kids" | "teen" | "adult";

export const GENRES = ["Platformer", "Racing", "Puzzle", "Adventure", "Sports", "Action", "Strategy", "Shooter"] as const;
export type Genre = (typeof GENRES)[number];

export type Platform = "Web" | "PC" | "Mobile" | "Console";

export type Developer = {
  id: string;
  name: string;
  bio: string;
  hue: number;
  followers: number;
};

export type Demo =
  /** Runs right here in a locked-down frame. */
  | { kind: "web"; url: string }
  /** Can't run in a browser: send the player to the developer's demo download. */
  | { kind: "download"; url: string };

export type Game = {
  id: string;
  title: string;
  developer: Developer;
  rating: Rating;
  genres: Genre[];
  platforms: Platform[];
  trailer: string;
  poster: string;
  demo: Demo;
  /** Developer's own store / download page for the full game. */
  fullGameUrl: string;
  likes: number;
  comments: number;
  saves: number;
  addedAt: string;
};

export type FeedPage = { games: Game[]; nextCursor: number | null; mode: Mode };

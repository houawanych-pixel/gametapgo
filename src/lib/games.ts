import type { Developer, Game } from "./types";

/**
 * Sample catalog for the development preview. All games and studios are made up.
 * Sky Hopper, Turbo Kart Rush and Star Pop have real playable demos in /public/demos.
 * Neon Siege (Teen) and Iron Front (Mature) exist to test the age filter.
 */
const dev = (id: string, name: string, bio: string, hue: number, followers: number): Developer =>
  ({ id, name, bio, hue, followers });

const CLOUDPOP = dev("cloudpop", "CloudPop Games", "Indie studio making bright, playful worlds for everyone.", 205, 18_400);
const TURBOBEAN = dev("turbobean", "TurboBean Studio", "Tiny team, fast karts, big smiles.", 25, 9_200);
const NOVAKIDS = dev("novakids", "Nova Kids Lab", "Simple, happy games for little hands.", 285, 12_700);
const GRIDFORGE = dev("gridforge", "GridForge", "Tactics and strategy for thinkers.", 170, 6_100);
const IRONWORKS = dev("ironworks", "Ironworks Interactive", "Intense action for grown-up players.", 0, 31_000);

export const GAMES: Game[] = [
  {
    id: "sky-hopper", title: "Sky Hopper", developer: CLOUDPOP, rating: "E",
    genres: ["Platformer", "Adventure"], platforms: ["Web", "Mobile"],
    trailer: "/trailers/sky-hopper.mp4", poster: "/trailers/sky-hopper.jpg",
    demo: { kind: "web", url: "/demos/sky-hopper/index.html" },
    fullGameUrl: "https://example.com/cloudpop/sky-hopper",
    likes: 12_400, comments: 842, saves: 1_300, addedAt: "2026-10-20",
  },
  {
    id: "kart-rush", title: "Turbo Kart Rush", developer: TURBOBEAN, rating: "E",
    genres: ["Racing", "Sports"], platforms: ["Web", "PC", "Mobile"],
    trailer: "/trailers/kart-rush.mp4", poster: "/trailers/kart-rush.jpg",
    demo: { kind: "web", url: "/demos/kart-rush/index.html" },
    fullGameUrl: "https://example.com/turbobean/kart-rush",
    likes: 8_900, comments: 511, saves: 970, addedAt: "2026-10-18",
  },
  {
    id: "star-pop", title: "Star Pop", developer: NOVAKIDS, rating: "E",
    genres: ["Puzzle"], platforms: ["Web", "Mobile"],
    trailer: "/trailers/star-pop.mp4", poster: "/trailers/star-pop.jpg",
    demo: { kind: "web", url: "/demos/star-pop/index.html" },
    fullGameUrl: "https://example.com/novakids/star-pop",
    likes: 5_300, comments: 260, saves: 640, addedAt: "2026-10-22",
  },
  {
    id: "neon-siege", title: "Neon Siege", developer: GRIDFORGE, rating: "T",
    genres: ["Strategy"], platforms: ["PC"],
    trailer: "/trailers/neon-siege.mp4", poster: "/trailers/neon-siege.jpg",
    demo: { kind: "download", url: "https://example.com/gridforge/neon-siege-demo" },
    fullGameUrl: "https://example.com/gridforge/neon-siege",
    likes: 3_100, comments: 188, saves: 410, addedAt: "2026-10-15",
  },
  {
    id: "iron-front", title: "Iron Front", developer: IRONWORKS, rating: "M",
    genres: ["Shooter", "Action"], platforms: ["PC", "Console"],
    trailer: "/trailers/iron-front.mp4", poster: "/trailers/iron-front.jpg",
    demo: { kind: "download", url: "https://example.com/ironworks/iron-front-demo" },
    fullGameUrl: "https://example.com/ironworks/iron-front",
    likes: 22_800, comments: 1_930, saves: 2_600, addedAt: "2026-10-10",
  },
];

export const getGame = (id: string) => GAMES.find((g) => g.id === id);

import { describe, expect, it } from "vitest";
import { buildFeed, parseGenres, rankGames } from "./feed";

describe("age filter", () => {
  it("kids never see Teen or Mature games", () => {
    const page = buildFeed("kids", ["Shooter", "Strategy"], "foryou", 0, 30);
    expect(page.games.length).toBe(30);
    expect(page.games.every((g) => g.rating === "E" || g.rating === "10+")).toBe(true);
  });
  it("teens see Teen but not Mature", () => {
    const r = rankGames("teen", [], "foryou").map((g) => g.rating);
    expect(r).toContain("T");
    expect(r).not.toContain("M");
  });
  it("adults who like shooters get the shooter first", () => {
    expect(rankGames("adult", ["Shooter"], "foryou")[0].id).toBe("iron-front");
  });
});

describe("interests", () => {
  it("a kid who picks Racing gets racing first", () => {
    expect(rankGames("kids", ["Racing"], "foryou")[0].id).toBe("kart-rush");
  });
  it("ignores unknown genres", () => {
    expect(parseGenres("Racing,Nope,Puzzle")).toEqual(["Racing", "Puzzle"]);
  });
});

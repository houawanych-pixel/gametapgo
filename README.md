# GameTapGo

Scroll. Tap. Play. Scroll short game trailers, tap to play a free demo right in the browser, save games to My Games, and get the full game from the developer.

**Private development preview.**

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # age-filter and feed tests
python3 scripts/record-trailers.py   # re-record demo trailers (needs playwright + ffmpeg)
```

## What works

- Vertical trailer feed: swipe/scroll, one trailer plays at a time, next one preloads, keyboard arrows on desktop
- **Age ratings** (E, 10+, T, M) with **Kids Mode on by default**
  - Kids: E and 10+ only · Teen: + T · Adult: everything incl. Mature
  - Filter runs on the server (`/api/feed`); unknown mode = Kids
  - Going up a mode needs the **parent PIN**; Adult also needs a 17+ confirmation (real ID age check before launch)
  - Kids' feed follows genres they pick, never tracking
- **TAP TO PLAY**: 3 real playable demos (Sky Hopper, Turbo Kart Rush, Star Pop) in a locked-down frame (`sandbox="allow-scripts"`, no same-origin)
- Demos that can't run in a browser show **GET DEMO** (download link) instead
- **Get Full Game** → developer's site; in Kids Mode a grown-up must enter the PIN first
- **Save** → **My Games** (All / Demos played / Full games)
- Developer card, trending games, browse by genre, search (all age-filtered)

## Not yet

Accounts and database (saves/PIN/mode are on the device for now), real likes/comments/follows, developer uploads + demo checks, separate domain for demos, hosting.

All games and studios in the sample catalog are made up.

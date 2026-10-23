# GameTapGo

Scroll, tap, play game demos in your browser. Live at https://gametapgo.com

- `index.html` holds the whole site (feed, My Games, Kids Mode / 17+ unlock).
- Add a game: add an entry to `GAMES` in `index.html` and a 540x960 cover in `img/`.
- Pushing to `main` deploys it with GitHub Pages (`.github/workflows/pages.yml`).

The 17+ unlock is a birth-year check stored on the device. It's a placeholder until real accounts exist.

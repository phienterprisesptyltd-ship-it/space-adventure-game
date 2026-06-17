# Galactic Brick Saga

A browser-playable toy-brick space adventure prototype with 9 movie-style episodes, 20 levels per episode, Force-like powers, saber-style loadouts, studs, puzzles, and boss-duel progression.

## Play locally

```bash
npm start
```

Then open <http://localhost:5173> in your browser.

## Test and build

```bash
npm test
npm run build
```

The build command creates a static `dist/` folder that GitHub Pages can host.

## GitHub Pages deployment

This repository includes a GitHub Actions workflow at `.github/workflows/pages.yml` that tests, builds, and deploys the game to GitHub Pages whenever changes are pushed to the `main` branch. You can also run it manually from the **Actions** tab with **Deploy Galactic Brick Saga to GitHub Pages → Run workflow**.

After the workflow succeeds, open the Pages URL shown in the workflow summary. It is usually:

```text
https://<your-github-username>.github.io/<repository-name>/
```

If GitHub asks for a Pages source, choose **GitHub Actions** in **Settings → Pages**.

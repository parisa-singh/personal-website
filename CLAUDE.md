# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start Vite dev server at localhost:5173 (or next available port)
npm run build      # production build → dist/
npm run deploy     # build + push dist/ to gh-pages branch (runs predeploy automatically)
npm run lint       # ESLint
npm run preview    # locally preview the production build
```

## Architecture

**Static site** deployed to GitHub Pages. No backend. All data is fetched client-side.

**Routing**: `HashRouter` is required (not `BrowserRouter`) — GitHub Pages serves static files with no server rewrite support, so `/#/about` style URLs are used throughout.

**Base URL**: Vite is configured with `base: '/personal-website/'`. All public asset references must use `import.meta.env.BASE_URL` as a prefix (e.g. the profile image: `${import.meta.env.BASE_URL}avatar.JPEG`). The filename case matters on Linux (GitHub Pages) — `avatar.JPEG` not `avatar.jpeg`.

**Page transitions**: `App.jsx` wraps `<Routes>` in a div keyed on `location.pathname`. Changing the key causes React to remount the div, re-triggering the `.page-reveal` CSS animation defined in `index.css`.

**Backgrounds**: Each page has a unique full-page `<canvas>` component using `useEffect` + `requestAnimationFrame`. All use `document.addEventListener('mousemove', ...)` (not `canvas.addEventListener`) so mouse interaction works even when the cursor is over text. Canvas components: `StarsBackground` (Projects), `FloatBackground` (About), `BokehBackground` (Skills), `RippleBackground` (Articles), `CircuitBackground` (Experience).

**Live data**:
- `useGitHubRepos` — fetches `api.github.com/users/parisa-singh/repos`, filters `!fork && !private`, refreshes on `window` focus
- `useSubstackFeed` — fetches Substack RSS via `api.rss2json.com` (avoids CORS), sorts by `pubDate` desc, refreshes on focus

**Styling**: Tailwind CSS v4 (CSS-first — `@import "tailwindcss"` at top of `index.css`, no `tailwind.config.js`). Custom design tokens and component classes (`.btn-cyan`, `.btn-violet`, `.skill-pill`, `.topic-tag`, `.fade-in-up`, `.page-reveal`) are defined in `index.css`, not via Tailwind utilities.

**Color system**:
- Background: `#07080f` (near-black with blue tint)
- Card surfaces: `rgba(12, 14, 28, 0.75)`
- Primary accent: `#818cf8` (indigo) — buttons, nav active, glows, particle colors
- Secondary accent: `#a78bfa` / `#a5b4fc` (violet) — `.btn-violet` secondary buttons
- UI chrome: `#14163a`, `#1e2040` (dark navy, scrollbar/swiper)

## Content to Edit

**Experience page** (`src/pages/Experience.jsx`): The `CLUBS` and `CAREER` arrays at the top of the file contain real experience data (UMass Design Club, PIT, EyeZense, UMass IT, etc.).

**Deploy flow**: `npm run deploy` is the only deploy command needed — it runs `vite build` first via `predeploy`, then pushes `dist/` to the `gh-pages` branch. The `main` branch holds source; `gh-pages` holds the built output.

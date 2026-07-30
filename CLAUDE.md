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

**Theme (light/dark)**: A single `data-theme` attribute on `<html>` drives everything. An inline script in `index.html` sets it before first paint (from `localStorage.theme`, else `prefers-color-scheme`) to avoid a flash. `src/hooks/useTheme.js` owns the state: it writes the attribute + `localStorage`, syncs the `<meta name="theme-color">`, and fires a `themechange` window event. The `ThemeToggle` in `Navbar` is the only place `useTheme()` is instantiated. All colors are CSS variables defined per-theme in `index.css` (`:root[data-theme="dark"]` / `[data-theme="light"]`) — components reference `var(--token)` (in inline styles too), so the whole site recolors from one place.

**Background**: One shared `<canvas>` component, `src/components/Background.jsx`, used on every page with a `variant` prop (`about`/`experience`/`projects`/`skills`/`articles`) that nudges density/speed. It reads its particle colors from CSS variables via `readParticleColors()` (in `useTheme.js`) and re-reads them on the `themechange` event; it respects `prefers-reduced-motion` (paints one static frame, no rAF loop) and caps particle count on small screens. Uses `document.addEventListener('mousemove', ...)` so cursor interaction works over text. (The old per-page canvases — StarsBackground/FloatBackground/BokehBackground/RippleBackground/CircuitBackground — were consolidated into this.)

**Live data**:
- `useGitHubRepos` — fetches `api.github.com/users/parisa-singh/repos`, filters `!fork && !private`, refreshes on `window` focus
- `useSubstackFeed` — fetches the raw Substack RSS (`creativecompiler77.substack.com/feed`) through CORS proxies (`allorigins` → `corsproxy.io`) and parses it client-side with `DOMParser`; falls back to `api.rss2json.com` if both proxies fail. `api.rss2json.com`'s anonymous tier is rate-limited and was the original cause of the feed silently failing — do not make it the sole source again. Sorts by `pubDate` desc, refreshes on focus. Projects render in a responsive grid (`.grid-cards`); Swiper is no longer used.

**Styling**: Tailwind CSS v4 (CSS-first — `@import "tailwindcss"` at top of `index.css`, no `tailwind.config.js`). Design tokens (CSS variables, per-theme) and component/layout classes are defined in `index.css`, not via Tailwind utilities. Key classes: layout — `.container`, `.page`, `.page-content`, `.section-head`, `.card`, `.eyebrow`, `.section-title`, `.grid-2col`, `.grid-cards`; buttons — `.btn` + `.btn-primary` / `.btn-outline` (legacy `.btn-cyan` / `.btn-violet` are kept as aliases); plus `.skill-pill`, `.topic-tag`, `.fade-in-up`, `.page-reveal`, `.line-clamp-3`. A `prefers-reduced-motion` block neutralizes animations/transitions.

**Color system**: All colors are theme-aware CSS variables (never hardcode hex in components — use `var(--token)`). Semantic tokens include `--bg`, `--surface` / `--surface-2` / `--surface-solid`, `--border` / `--border-strong`, text ramp (`--text`, `--text-2`, `--text-muted`, `--text-dim`, `--text-faint`, `--text-ghost`), accents (`--accent`, `--accent-strong`, `--accent-2`, `--accent-contrast` = accent text safe on the page bg), accent tints/borders/glow, `--grad-1`/`--grad-2` (gradient text), nav/footer surfaces, `--chrome`/`--chrome-2`, and `--particle-a/-b/-c/-line` (rgb triplets for the canvas). Dark defaults to `#07080f` bg + `#818cf8` indigo accent; light uses a light surface set with a deeper `#4f46e5` indigo for contrast.

## Content to Edit

**Experience page** (`src/pages/Experience.jsx`): The `CLUBS` and `CAREER` arrays at the top of the file contain real experience data (UMass Design Club, PIT, EyeZense, UMass IT, etc.).

**Deploy flow**: `npm run deploy` is the only deploy command needed — it runs `vite build` first via `predeploy`, then pushes `dist/` to the `gh-pages` branch. The `main` branch holds source; `gh-pages` holds the built output.

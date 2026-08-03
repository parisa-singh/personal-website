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

**Design language**: Editorial/minimal. Display type is **Fraunces** (serif, via `--display`), body is Inter, labels are JetBrains Mono. Two themes: **light = "Bone & Ink"** (warm paper `#f4f1e9`, ink text) and **dark = "Noir"** (`#100f0d`, bone text). A **single red accent `#c0392b`** is used in both modes (chosen because it reads on both surfaces — gold/yellow would fail on the light paper). No cards-with-glow or particle effects — the look is hairline rules, whitespace, and restraint. This replaced an earlier indigo/dark "dev portfolio" theme with animated canvases.

**Theme (light/dark)**: A single `data-theme` attribute on `<html>` drives everything. An inline script in `index.html` sets it before first paint (from `localStorage.theme`, else `prefers-color-scheme`, default light) to avoid a flash. `src/hooks/useTheme.js` owns the state: writes the attribute + `localStorage` and syncs `<meta name="theme-color">`. The `ThemeToggle` in `Navbar` is the only place `useTheme()` is instantiated. All colors are CSS variables defined per-theme in `index.css` (`:root[data-theme="light"]` / `[data-theme="dark"]`) — components reference `var(--token)` (in inline styles too), so the whole site recolors from one place. **There is no animated/canvas background** (removed for the editorial look). Scroll-reveal is handled by `src/hooks/useReveal.js` (IntersectionObserver adds `.in` to `.reveal` elements); call `useReveal()` once per page.

**Cross-page halo highlight**: `src/hooks/useHighlight.js` reads a `?highlight=<value>` query param (works under HashRouter via `useSearchParams`), finds the element with a matching `data-hl="<value>"` attribute, scrolls it into view, adds the `.halo` class, and injects a `.halo-fx` overlay — held ~2.8s, then dismissed by adding `.halo-out` which fades the overlay's opacity to 0 over ~0.9s before it's removed. `.halo` is a deliberately loud, hover-distinct cue: the injected `.halo-fx` overlay draws a persistent solid accent ring + accent wash + a **sonar-style echo** of three staggered rings (each an expanding, fading `box-shadow` on a `<span>`; the target covers their centers so each reads as an outward ring). The overlay (not a CSS pseudo-element) is used so the effect is identical on every target regardless of the pseudo-elements it already uses (e.g. `.exp-row`'s `::before` timeline dot); it's absolutely positioned (out of flow) so it never disturbs the target's grid/flex layout, and uses `border-radius: inherit` to hug each target's corners. Used so overview items on About deep-link into their page with the target highlighted: Core-Skills chips → `/skills?highlight=<skill>` (each `.logo-tile`/`.drow` has `data-hl={label}`), Recent-Experience items → `/experience?highlight=<role>` (`.exp-row` has `data-hl={role}`), Recent-Projects items → `/projects?highlight=<repo>` (`.proj-card` has `data-hl={repo.name}`). Pages call `useHighlight()` (Projects passes a `ready` flag so it waits for repos to load). Highlight labels must match the target's `data-hl` exactly.

**Live data**:
- `useGitHubRepos` — fetches `api.github.com/users/parisa-singh/repos`, filters `!fork && !private`, refreshes on `window` focus
- `useSubstackFeed` — fetches the raw Substack RSS (`creativecompiler77.substack.com/feed`) through CORS proxies (`allorigins` → `corsproxy.io`), parses it client-side with `DOMParser`, and falls back to `api.rss2json.com` only if both proxies fail (its anonymous tier is rate-limited — do not make it the sole source). **Stale-while-revalidate**: the last successful fetch is cached in `localStorage` (`substack-articles-v1`) and painted instantly on load, then revalidated in the background — so Articles is fast on repeat visits and never shows a cold spinner once cached.

**Projects curation**: `src/data/projects.js` controls which repos appear. `VISIBLE` (allowlist) — empty = show all public repos; non-empty = show exactly those names in that order. `HIDDEN` — names to drop when `VISIBLE` is empty. `OVERRIDES` — per-repo `{ title, description, tags, featured, hidden }`. `curateRepos(repos)` applies all of it (featured sorts to top). `ABOUT_PROJECTS` — names (in order) for the "Recent Projects" box on the About page; empty = first 3 of the curated list. `Projects.jsx` renders the curated repos as a **card grid** (`.proj-grid`/`.proj-card`, Code = `.pbtn-code` outline, Live = `.pbtn-live` filled) and computes the **language breakdown bar** using validated categorical colors (`--lang-blue/-orange/-aqua/-yellow/-magenta/-violet/-other`, top-6-by-count + Other) — these passed the dataviz CVD/contrast validator on both surfaces; keep red out of that set (it's the brand accent).

**Styling**: Tailwind CSS v4 (CSS-first — `@import "tailwindcss"` at top of `index.css`, no `tailwind.config.js`). Design tokens and component/layout classes live in `index.css`, not Tailwind utilities. Key classes: layout — `.container` (max 940px), `.page` (`flex:1` so short pages pin the footer to the bottom), `.kicker`, `.lede`, `.slabel` (`.n` + `h2`), `.page-head`; links/buttons — `.tlink` (underline text link), `.btn` + `.btn-solid` / `.btn-outline`; content — `.timeline` + `.exp-row` (`.current` marks ongoing; Experience uses two side-by-side columns via `.exp-cols`), `.proj-grid` + `.proj-card` (`.pbtn-code` outline / `.pbtn-live` filled actions), `.langbar` + `.langbar-legend`, `.logo-grid` + `.logo-tile` + `.dots` (proficiency) + `.drow`, `.article-grid` + `.article-card`, `.ov-grid` + `.ov-panel` (About overview, `align-items:stretch` for equal heights); plus `.reveal`/`.reveal.in`, `.halo` (cross-page highlight), `.mono`, `.italic-em`, `.sk` (skeleton). Per-page responsive tweaks live in scoped `<style>` blocks inside the page components. A `prefers-reduced-motion` block neutralizes animation (and gives `.halo` a static ring).

**Color system**: All colors are theme-aware CSS variables — never hardcode hex in components. Tokens: `--bg`, `--panel` / `--panel-2`, ink ramp (`--ink`, `--ink-2`, `--mut`, `--faint`), `--line` / `--line-soft`, `--accent` / `--accent-2` / `--on-accent`, `--display` (font), and `--lang-*` (validated language chart colors). Same accent hex in both modes; the surfaces/inks flip.

## Content to Edit

**Experience** (`src/data/experience.js`): the `EXPERIENCE` array — each item has `type` (`'work'` | `'club'`), `start` (`YYYY-MM`, for sorting), `current` (ongoing = shows "Current" + sorts above ended roles), `role`, `org`, `period`, `desc`. `LINKEDIN` is where every row links. `Experience.jsx` splits it into two columns (Internships & Work / Clubs & Organizations); within each, ongoing roles rank first, then by `start` descending.

**Projects** (`src/data/projects.js`): edit `VISIBLE` / `HIDDEN` / `OVERRIDES` / `ABOUT_PROJECTS` to curate — see **Projects curation** above.

**Skills** (`src/data/skills.js`): `TOOLS` (with devicon `icon`), `FOCUS`, `STRENGTHS` — each item has a `level` (1–5) shown as proficiency dots. Tools render as a logo grid; focus/strengths as dot rows.

**About** (`src/pages/AboutMe.jsx`): hero copy, the `FOCUS` topic line, `CORE_SKILLS` (must match Skills labels for the halo to resolve), and the overview panels (Recent Experience/Projects/Skills/Writing) pulling from the data files + live hooks.

**Deploy flow**: `npm run deploy` is the only deploy command needed — it runs `vite build` first via `predeploy`, then pushes `dist/` to the `gh-pages` branch. The `main` branch holds source; `gh-pages` holds the built output.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Vite dev server at localhost:5173 (or next free port)
npm run build      # production build → dist/
npm run deploy     # build + push dist/ to gh-pages branch (predeploy runs the build)
npm run lint       # ESLint (flat config; eslint-plugin-react-hooks v7 — note its strict
                   # `immutability` / "setState in effect" rules; prefer derived state)
npm run preview    # preview the production build locally
```

## What this is

Parisa Singh's personal site — a **"Command Deck"** portfolio: a premium dark, emerald-accented,
data-panel aesthetic (Linear/Bloomberg-terminal feel) that reads well to both technical and business
audiences. It opens with a **Matrix-style boot sequence**, then reveals a **multi-page** site.

**Static site** on GitHub Pages. No backend; all data is fetched client-side.

## Architecture

**Entry & boot gate** (`src/App.jsx`): mounts `<HashRouter>` and, until the boot completes, overlays
`src/boot/Boot.jsx`. Boot plays **once per tab** (guarded by `sessionStorage.introSeen`). The **⏻ power
button** in the command bar replays it (`replayBoot` sets `booted=false`, remounting Boot). After Boot's
`onDone`, the routed site shows.

**Boot sequence** (`src/boot/`): three stages — a glitchy **terminal** types an intro (`Typewriter.jsx`,
lines prefixed `::` render as the glitch headline), then on ENTER/tap a **code-particle** stage
(`three/ParticleCanvas.jsx` → `three/concepts/ParticleFlow.jsx`, the `</>` shape, Matrix-green) with a
**loading bar that morphs into a "Proceed" button** (framer-motion shared `layoutId`), the particles
scaling up and lifting. `MatrixRain.jsx` is the digital-rain backdrop. The WebGL is lazy-loaded behind an
error boundary (`Safe` in `Boot.jsx`) with a CSS-orb fallback. Self-contained green theme, independent of
the site palette.

**Routing** (HashRouter — GitHub Pages has no server rewrites, so URLs are `/#/projects` etc.). Routes:
`/` → `Home` (Overview deck), `/work` → `Work` (Experience), `/projects` → `Projects`, `/skills` →
`Skills`, `/writing` → `Writing`, `*` → `Home`. The `Routed` component scrolls to top on path change and
wraps `<Routes>` in an `AnimatePresence` keyed on `location.pathname` for a fade/slide page transition.

**Shell**:
- `components/CommandBar.jsx` — sticky top nav: ⏻ replay button + `PARISA/SINGH` brand, nav links
  (Overview / Experience / Projects / Skills / Writing) **plus a `Résumé` button** that opens the résumé
  modal, a `looking for internships` status chip, and a mobile burger menu. Active link styled via
  `NavLink` `.active`.
- `components/SiteFooter.jsx` — "Signal" contact block (LinkedIn / GitHub / Substack / Email).
- `components/ResumeModal.jsx` — popup launched from the hero button and the nav `Résumé` item; lists the
  three résumé variants from `RESUMES` (SWE → FDE → PM), each opening its Drive PDF in a new tab. Closes on
  ✕ / Esc / backdrop click.
- `components/Panel.jsx` — the reusable deck module (border + corner ticks + mono `tag`/`label` header).
- `components/PageHead.jsx` — shared inner-page header (`tag` · title · note).

**Pages** (`src/pages/`):
- `Home` — **one clear focus**: a hero (eyebrow, big name, one-line pitch, `View the work` + `Résumé`
  CTAs, a status line, and the avatar portrait) followed by **four "doorway" cards** into the detail pages.
  Deliberately sparse — detail lives on the dedicated pages, not here. Takes `onResume` to open the modal.
- `Work` — two columns, **Internships & Work** | **Clubs & Organizations**, each a timeline (`.exp-row`);
  ongoing roles (`current`) sort first and get an emerald dot.
- `Projects` — `curateRepos(repos)` card grid + a **language-breakdown bar** (top-6 languages + Other).
  **Owner pin mode**: add `?edit` to the Projects URL (`/#/projects?edit`) to unlock pin toggles
  (remembered in `localStorage.ownerMode`). Pins live in `localStorage.pinnedProjects`; pinned repos sort
  first with an emerald border + `◆ pinned` marker. `copy pins` copies the list so it can be **baked into
  the code** for all visitors (localStorage is per-device). Visitors never see pin controls.
- `Skills` — tools as a **4-wide logo grid** (devicon icons + proficiency dots), Focus & Strengths as
  **dot rows**.
- `Writing` — **article cards** from the Substack feed, with a loading skeleton and empty-state fallback.

**Live data**:
- `useGitHubRepos` — `api.github.com/users/parisa-singh/repos`, filters `!fork && !private`, refreshes on window focus.
- `useSubstackFeed` — Substack RSS via CORS proxies (`allorigins` → `corsproxy.io`), falling back to
  `api.rss2json.com`. **Stale-while-revalidate** with a `localStorage` cache (`substack-articles-v1`).

**Design system** — all under a single `.site` scope so it's self-contained and theme-independent (the
site is **dark-only**; it does not use `data-theme`). Premium dark ground, cool off-white ink, a refined
**emerald accent `--grn:#34d399`** used sparingly. **Inter** for prose and headings (business-legible),
**JetBrains Mono** (`.mono`) reserved for labels, tags, and data. Panels carry hairline borders + corner
ticks; a faint emerald radial + grid sits behind everything. Tokens live on `.site`: `--bg/--bg-2`,
`--panel/--panel-2`, ink ramp (`--ink/--ink-2/--mut/--faint`), `--line/--line-2`, `--grn/--grn-2/--grn-dim/
--on-grn`. **Never hardcode colors in components** — reference `var(--token)`. All CSS lives in
`src/index.css` (Tailwind v4 CSS-first `@import "tailwindcss"`, no config file); component/layout classes
are hand-written there, not Tailwind utilities.

## Content to edit

- **Experience** (`src/data/experience.js`): `EXPERIENCE` items — `type` (`'work'`|`'club'`), `start`
  (`YYYY-MM`, sort key), `current`, `role`, `org`, `period`, `desc`. `LINKEDIN` is where rows link.
- **Projects** (`src/data/projects.js`): `curateRepos(repos)` — only repos with a live site (`hasLiveSite`,
  non-empty GitHub `homepage`) ever show. `VISIBLE` (allowlist/order), `HIDDEN`, `OVERRIDES`
  (`{title, description, tags, featured, hidden}`). `LENS_WEIGHTS`/`lensFor` are an unused leftover helper.
- **Skills** (`src/data/skills.js`): `TOOLS` / `FOCUS` / `STRENGTHS`, each `{ cap, items }`; items have
  `label`, 1–5 `level`, and tools also a devicon `icon`.
- **Links** (`src/data/links.js`): `LINKS` (socials + `resume`), `RESUMES` (the SWE/FDE/PM picker list),
  `prettyName`.
- **Hero / nav / footer copy** lives in `pages/Home.jsx`, `components/CommandBar.jsx`,
  `components/SiteFooter.jsx`.

## Parked / legacy (present but not mounted)

The current site does **not** use these — they're earlier explorations kept in the tree:
`sections/*` (the single-page-scroll version), `fx/*` (Cursor, Intro, Magnetic, Marquee, Reveal),
`sections/HeroLab.jsx` + `three/{HeroCanvas,ConceptCanvas,Safe3D}` + `three/concepts/{Globe,Crystal}`
(the hero concept lab), `landing/*` (the landing concept lab), `components/{SectionLabel,ThemeToggle}`,
and `hooks/{useTheme,useSmoothScroll}`. Only `three/ParticleCanvas` + `three/concepts/ParticleFlow` are
live (used by the boot). Safe to delete when doing cleanup, but verify no import first.

Also stale: `index.html` `<title>`/meta/OG still describe an old "Adaptive Portfolio / AI engine" concept;
`package.json` still lists `swiper` and `@tsparticles/slim` (unused). `fuse.js` is installed, not yet used.

## Deploy flow

`npm run deploy` builds and pushes `dist/` to `gh-pages`. `main` holds source; `gh-pages` holds the built
output. The command-deck redesign currently lives on the `feat/3d-overhaul` branch — merge to `main` before
deploying when it's ready.

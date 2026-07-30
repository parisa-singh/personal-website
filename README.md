# Parisa Singh — Personal Website

My portfolio: an editorial, responsive single-page-app portfolio built with React and Vite, deployed to GitHub Pages.
Live at **https://parisa-singh.github.io/personal-website/**

Pages: **About** (hero + overview dashboard), **Experience** (timeline), **Projects** (live from GitHub), **Skills**, and **Writing** (live from Substack).

## Tech

- **React 19** + **Vite** (SPA)
- **HashRouter** (`/#/about` URLs — required for GitHub Pages static hosting)
- **Tailwind v4** (CSS-first) with a custom design-token system in `src/index.css`
- Light (**Bone & Ink**) / dark (**Noir**) themes with a single red accent; toggle persisted to `localStorage`
- Display type **Fraunces**, body **Inter**, labels **JetBrains Mono**
- Live data: GitHub repos + Substack RSS, both fetched client-side (Substack is cached for instant loads)

## Commands

```bash
npm install        # install dependencies
npm run dev        # dev server at localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build locally
npm run lint       # ESLint
npm run deploy     # build + publish dist/ to the gh-pages branch (this is the live site)
```

`main` holds the source; `gh-pages` holds the built output that GitHub Pages serves.

## Editing content

Most content lives in plain data files — no component surgery needed:

| What | Where |
|------|-------|
| Experience / timeline | `src/data/experience.js` |
| Which GitHub repos show (+ overrides) | `src/data/projects.js` (`VISIBLE` / `HIDDEN` / `OVERRIDES` / `ABOUT_PROJECTS`) |
| Skills + proficiency levels | `src/data/skills.js` |
| About hero copy, focus line, core skills | `src/pages/AboutMe.jsx` |

By default Projects shows every public repo; set `VISIBLE` to curate a focused, ordered set.

## Notes

- All colors are theme-aware CSS variables — reference `var(--token)`, never hardcode hex.
- Public asset paths must be prefixed with `import.meta.env.BASE_URL` (base is `/personal-website/`); filename case matters on GitHub Pages (`avatar.JPEG`).
- See `CLAUDE.md` for the full architecture reference.

🤖 This site was designed and built with [Claude Code](https://claude.com/claude-code).

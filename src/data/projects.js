// ============================================================
//  PROJECTS — curate what shows, live from GitHub.
//  Only repos with a deployed homepage (live site) are shown.
//  Each repo is tagged with per-lens relevance for the adaptive engine.
// ============================================================

// VISIBLE — the allowlist, in display order. Empty = show every public repo
// that has a live site. (Use the repo name as it appears on GitHub.)
export const VISIBLE = [
  'personal-website',
  'nikshi-foundation',
  'igcse-zyarisa',
  'your-nudge',
  'hearsay-v2',
  'mind-glow',
  'photography-showcase',
  'ui-components-library',
  'pixel-art-editor',
  'world-clock',
  'pomodoro-timer',
  'to-do-list',
  'snake',
  'color-picker',
  'hovering-buttons-showcase',
  'weather',
]

// HIDDEN — repos to always drop (only applies when VISIBLE is empty).
export const HIDDEN = []

// Per-repo title/description/tag overrides (polish sparse GitHub metadata).
export const OVERRIDES = {
  'ui-components-library': { title: 'UI Components Library' },
}

// Per-repo relevance by audience lens (0–3). Unlisted repos get a neutral 1/1/1.
//   swe = software engineering · fde = forward-deployed eng · pm = product
export const LENS_WEIGHTS = {
  'personal-website': { swe: 3, fde: 2, pm: 2 },
  'nikshi-foundation': { swe: 2, fde: 1, pm: 2 },
  'igcse-zyarisa': { swe: 1, fde: 1, pm: 1 },
  'your-nudge': { swe: 2, fde: 2, pm: 3 },
  'hearsay-v2': { swe: 2, fde: 2, pm: 2 },
  'mind-glow': { swe: 2, fde: 1, pm: 2 },
  'photography-showcase': { swe: 1, fde: 0, pm: 1 },
  'ui-components-library': { swe: 3, fde: 1, pm: 2 },
  'pixel-art-editor': { swe: 3, fde: 1, pm: 1 },
  'world-clock': { swe: 2, fde: 1, pm: 1 },
  'pomodoro-timer': { swe: 2, fde: 1, pm: 1 },
  'to-do-list': { swe: 1, fde: 1, pm: 1 },
  'snake': { swe: 2, fde: 0, pm: 1 },
  'color-picker': { swe: 1, fde: 0, pm: 1 },
  'hovering-buttons-showcase': { swe: 1, fde: 0, pm: 1 },
  'weather': { swe: 2, fde: 2, pm: 1 },
}
const NEUTRAL = { swe: 1, fde: 1, pm: 1 }
export const lensFor = (name) => LENS_WEIGHTS[name] || NEUTRAL

/** A repo counts as "live" only if it has a homepage (deployed website) set. */
export const hasLiveSite = (r) => typeof r.homepage === 'string' && r.homepage.trim() !== ''

/**
 * Apply the config above to the raw repo list from GitHub.
 * Returns the final, ordered, curated array of projects (live sites only),
 * each carrying `title`, `descOverride`, and `lens` weights.
 */
export function curateRepos(repos) {
  const publics = repos.filter((r) => !r.private && !r.fork && hasLiveSite(r))

  const shaped = publics.map((r) => {
    const o = OVERRIDES[r.name] || {}
    return {
      ...r,
      title: o.title || null,
      descOverride: o.description || null,
      tagsOverride: o.tags || null,
      featured: !!o.featured,
      hidden: !!o.hidden,
      lens: lensFor(r.name),
    }
  })

  if (VISIBLE.length > 0) {
    const byName = Object.fromEntries(shaped.map((r) => [r.name, r]))
    return VISIBLE.map((name) => byName[name]).filter(Boolean)
  }
  return shaped.filter((r) => !r.hidden && !HIDDEN.includes(r.name))
}

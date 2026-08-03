// ============================================================
//  PROJECTS — curate what shows on the Projects page.
//  Default behavior: load ALL your public repos live from GitHub.
//  Edit the lists below to control visibility, order, and details.
// ============================================================

// 1) VISIBLE — the allowlist.
//    Leave it EMPTY ([]) to show every public repo (the default).
//    Put repo names here to show ONLY those, in exactly this order.
//    (Use the repo name as it appears on GitHub, e.g. 'personal-website'.)
export const VISIBLE = [
  'personal-website',
  'nikshi-foundation',
  'igcse-zyarisa',
  'your-nudge',
  'hearsay',
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

// 2) HIDDEN — repos to always drop (only applies when VISIBLE is empty).
export const HIDDEN = [
  // 'test-repo',
  // 'old-homework',
]

// 2b) ABOUT_PROJECTS — pick which repos appear in the "Recent Projects"
//     box on the About page, in this order. Leave EMPTY to auto-show the
//     first 3 visible repos. (Use exact GitHub repo names.)
export const ABOUT_PROJECTS = [
  // 'personal-website',
  // 'eyezense-edm',
  // 'my-design-system',
]

// 3) OVERRIDES — polish any repo: rename it, rewrite the blurb,
//    set custom tags, pin it to the top, or hide it.
export const OVERRIDES = {
  // 'personal-website': {
  //   title: 'Personal Website',
  //   description: 'This portfolio — React + Vite, live GitHub & Substack data.',
  //   tags: ['React', 'Vite'],
  //   featured: true,   // pins to the top with a "Featured" mark
  //   hidden: false,
  // },
}

/** A repo counts as "live" only if it has a homepage (deployed website) set.
 *  Projects without a live, functioning site are never shown. */
export const hasLiveSite = (r) => typeof r.homepage === 'string' && r.homepage.trim() !== ''

/**
 * Apply the config above to the raw repo list from GitHub.
 * Returns the final, ordered, curated array of projects.
 * Only repos with a live website (see `hasLiveSite`) are ever included.
 */
export function curateRepos(repos) {
  const publics = repos.filter((r) => !r.private && !r.fork && hasLiveSite(r))

  const withOverrides = publics.map((r) => {
    const o = OVERRIDES[r.name] || {}
    return {
      ...r,
      title: o.title || null,
      descOverride: o.description || null,
      tagsOverride: o.tags || null,
      featured: !!o.featured,
      hidden: !!o.hidden,
    }
  })

  let list
  if (VISIBLE.length > 0) {
    // Show exactly VISIBLE, in that order.
    const byName = Object.fromEntries(withOverrides.map((r) => [r.name, r]))
    list = VISIBLE.map((name) => byName[name]).filter(Boolean)
  } else {
    // Show all, minus HIDDEN and per-repo hidden.
    list = withOverrides.filter((r) => !r.hidden && !HIDDEN.includes(r.name))
  }

  // Featured first (stable otherwise).
  return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
}

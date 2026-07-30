import { useMemo } from 'react'
import { useGitHubRepos } from '../hooks/useGitHubRepos'
import { curateRepos } from '../data/projects'
import { useReveal } from '../hooks/useReveal'
import { useHighlight } from '../hooks/useHighlight'

const SLOTS = ['--lang-blue', '--lang-orange', '--lang-aqua', '--lang-yellow', '--lang-magenta', '--lang-violet']
const OTHER = '--lang-other'

const fmt = (name) => name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

/** Count languages across visible repos, assign the validated colors (top 6 + Other). */
function buildLanguageData(projects) {
  const counts = {}
  projects.forEach((p) => { if (p.language) counts[p.language] = (counts[p.language] || 0) + 1 })
  const ranked = Object.entries(counts).sort((a, b) => b[1] - a[1])
  const total = ranked.reduce((s, [, n]) => s + n, 0)

  const colorOf = {}
  ranked.forEach(([lang], i) => { colorOf[lang] = i < SLOTS.length ? SLOTS[i] : OTHER })

  const top = ranked.slice(0, SLOTS.length)
  const restCount = ranked.slice(SLOTS.length).reduce((s, [, n]) => s + n, 0)
  const segments = top.map(([lang, n]) => ({ label: lang, count: n, cssVar: colorOf[lang], pct: Math.round((n / total) * 100) }))
  if (restCount > 0) segments.push({ label: 'Other', count: restCount, cssVar: OTHER, pct: Math.round((restCount / total) * 100) })

  return { segments, total, colorOf }
}

function LanguageBar({ segments, total }) {
  if (!total) return null
  return (
    <div className="langbar-card reveal">
      <div className="langbar-title">Language breakdown</div>
      <div className="langbar-cap">across {total} visible {total === 1 ? 'project' : 'projects'}</div>
      <div className="langbar" role="img" aria-label={'Language breakdown: ' + segments.map((s) => `${s.label} ${s.pct}%`).join(', ')}>
        {segments.map((s) => (
          <span key={s.label} style={{ flexGrow: s.count, background: `var(${s.cssVar})` }} title={`${s.label} · ${s.pct}%`} />
        ))}
      </div>
      <div className="langbar-legend">
        {segments.map((s) => (
          <div className="leg" key={s.label}>
            <span className="dot" style={{ background: `var(${s.cssVar})` }} />
            {s.label}
            <span className="pct">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function LinkIcon() {
  return <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 17L17 7M8 7h9v9" /></svg>
}

function ProjectCard({ repo, colorOf, delay }) {
  const lang = repo.language
  const cssVar = lang ? (colorOf[lang] || OTHER) : null
  const title = repo.title || fmt(repo.name)
  const desc = repo.descOverride || repo.description || 'No description provided.'

  return (
    <div className="proj-card reveal" data-hl={repo.name} style={{ transitionDelay: `${delay}ms` }}>
      <div className="top">
        <div className="proj-name">{title}</div>
        {repo.featured && <span className="badge-featured">★ Featured</span>}
      </div>
      <p className="proj-desc">{desc}</p>
      {lang && (
        <div className="proj-meta" style={{ marginTop: 0 }}>
          <span className="proj-lang"><span className="dot" style={{ background: `var(${cssVar})` }} />{lang}</span>
          {repo.stargazers_count > 0 && (
            <span className="proj-lang" style={{ color: 'var(--mut)' }}>
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              {repo.stargazers_count}
            </span>
          )}
        </div>
      )}
      <div className="proj-meta" style={{ marginTop: '4px' }}>
        <a className="pbtn pbtn-code" href={repo.html_url} target="_blank" rel="noopener noreferrer">
          <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
          Code
        </a>
        {repo.homepage && (
          <a className="pbtn pbtn-live" href={repo.homepage} target="_blank" rel="noopener noreferrer">
            Live <LinkIcon />
          </a>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const { repos, loading, error } = useGitHubRepos()
  const projects = useMemo(() => curateRepos(repos), [repos])
  const { segments, total, colorOf } = useMemo(() => buildLanguageData(projects), [projects])
  useReveal([loading, projects.length])
  useHighlight(!loading && projects.length > 0)

  return (
    <section className="page">
      <div className="container">
        <div className="page-head" style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}>
          <p className="kicker">Projects</p>
          <p className="lede" style={{ maxWidth: '560px' }}>Pulled live from GitHub, curated in code.</p>
        </div>

        {loading && (
          <div className="proj-grid">
            {[0, 1, 2, 3].map((i) => (
              <div className="proj-card" key={i}>
                <div className="sk" style={{ height: '20px', width: '55%', marginBottom: '4px' }} />
                <div className="sk" style={{ height: '13px', width: '90%' }} />
                <div className="sk" style={{ height: '13px', width: '70%' }} />
              </div>
            ))}
          </div>
        )}

        {error && (
          <p style={{ color: 'var(--mut)', fontSize: '15px' }}>
            Couldn't reach GitHub right now. Browse everything at{' '}
            <a href="https://github.com/parisa-singh" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>github.com/parisa-singh</a>.
          </p>
        )}

        {!loading && !error && projects.length === 0 && (
          <p style={{ color: 'var(--mut)', fontSize: '15px' }}>No projects to show yet.</p>
        )}

        {!loading && !error && projects.length > 0 && (
          <>
            <LanguageBar segments={segments} total={total} />
            <div className="proj-grid" style={{ marginTop: 'clamp(24px, 3.5vw, 36px)' }}>
              {projects.map((repo, i) => <ProjectCard key={repo.id} repo={repo} colorOf={colorOf} delay={i * 40} />)}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

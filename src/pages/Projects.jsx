import { useGitHubRepos } from '../hooks/useGitHubRepos'
import Background from '../components/Background'

const LANG_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#2b7489', Python: '#3572A5',
  Java: '#b07219', HTML: '#e34c26', CSS: '#a855f7', 'C++': '#f34b7d',
  C: '#888', Go: '#00ADD8', Rust: '#dea584', Ruby: '#701516',
  Swift: '#f05138', Kotlin: '#7F52FF', Shell: '#89e051',
}

const fmt = (name) => name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

function SkeletonCard() {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '220px' }}>
      {[55, 85, 70, 40].map((w, i) => (
        <div key={i} style={{ height: '12px', width: `${w}%`, borderRadius: '6px', background: 'var(--border-strong)' }} />
      ))}
    </div>
  )
}

function ProjectCard({ repo }) {
  const langColor = LANG_COLORS[repo.language] || 'var(--accent)'
  return (
    <div
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '18px', padding: 'clamp(20px, 3vw, 28px)',
        display: 'flex', flexDirection: 'column', gap: '14px', height: '100%',
        transition: 'transform 0.18s ease, box-shadow 0.2s, border-color 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent-border-strong)'
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 16px 40px var(--accent-glow)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '19px', fontWeight: 700,
          color: 'var(--text)', letterSpacing: '-0.5px', lineHeight: 1.2,
        }}>
          {fmt(repo.name)}
        </h2>
        {repo.language && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0,
            background: `${langColor}20`, border: `1px solid ${langColor}66`,
            borderRadius: '999px', padding: '4px 11px 4px 8px',
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: langColor, display: 'block' }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: langColor }}>
              {repo.language}
            </span>
          </div>
        )}
      </div>

      <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7, flex: 1 }}>
        {repo.description || 'No description provided.'}
      </p>

      {repo.topics?.length > 0 && (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {repo.topics.slice(0, 5).map(t => <span key={t} className="topic-tag">{t}</span>)}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', paddingTop: '2px' }}>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '13px' }}>
          <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
          Code
        </a>
        {repo.homepage && (
          <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Live
          </a>
        )}
        {repo.stargazers_count > 0 && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-faint)', fontSize: '12px', marginLeft: 'auto' }}>
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            {repo.stargazers_count}
          </span>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const { repos, loading, error } = useGitHubRepos()
  const publicRepos = repos.filter(r => !r.private)

  return (
    <section className="page">
      <Background variant="projects" />

      <div className="container page-content">
        <div className="section-head">
          <h1>Projects</h1>
          {!loading && publicRepos.length > 0 && (
            <p style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {publicRepos.length} public repositories · live from GitHub
            </p>
          )}
        </div>

        {loading && (
          <div className="grid-cards">
            {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '48px', color: '#ef4444', fontFamily: "'JetBrains Mono', monospace", fontSize: '14px' }}>
            Could not load repositories. Check your connection.
          </div>
        )}

        {!loading && !error && publicRepos.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-faint)', padding: '48px', fontSize: '16px' }}>
            No public repositories found.
          </div>
        )}

        {!loading && !error && publicRepos.length > 0 && (
          <div className="grid-cards">
            {publicRepos.map(repo => <ProjectCard key={repo.id} repo={repo} />)}
          </div>
        )}
      </div>
    </section>
  )
}

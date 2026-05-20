import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Keyboard, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { useGitHubRepos } from '../hooks/useGitHubRepos'
import StarsBackground from '../components/StarsBackground'

const LANG_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#2b7489', Python: '#3572A5',
  Java: '#b07219', HTML: '#e34c26', CSS: '#563d7c', 'C++': '#f34b7d',
  C: '#888', Go: '#00ADD8', Rust: '#dea584', Ruby: '#701516',
  Swift: '#f05138', Kotlin: '#7F52FF', Shell: '#89e051',
}

const fmt = (name) => name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

function Skeleton() {
  return (
    <div style={{
      height: '440px', borderRadius: '20px',
      background: 'rgba(20,6,4,0.7)',
      border: '1px solid rgba(255,255,255,0.05)',
      padding: '40px',
      display: 'flex', flexDirection: 'column', gap: '18px',
    }}>
      {[55, 85, 70, 40, 60].map((w, i) => (
        <div key={i} style={{
          height: '13px', width: `${w}%`, borderRadius: '6px',
          background: 'rgba(255,255,255,0.04)',
        }} />
      ))}
    </div>
  )
}

function ProjectCard({ repo }) {
  const cardRef = useRef(null)
  const langColor = LANG_COLORS[repo.language] || '#666'

  const onMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`
    card.style.boxShadow = `${-x * 20}px ${-y * 20}px 60px rgba(255,59,48,0.08), 0 0 40px rgba(255,59,48,0.05)`
  }
  const onLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) scale(1)'
    card.style.boxShadow = 'none'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        background: 'rgba(20,6,4,0.85)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
        borderRadius: '20px',
        padding: '40px',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.2s',
        cursor: 'default',
        willChange: 'transform',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,59,48,0.3)' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <div>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            color: '#4a2820',
            letterSpacing: '1.5px',
            display: 'block',
            marginBottom: '8px',
            textTransform: 'uppercase',
          }}>
            public repo
          </span>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '24px',
            fontWeight: 700,
            color: '#e8eaf2',
            letterSpacing: '-0.5px',
          }}>
            {fmt(repo.name)}
          </h2>
        </div>
        {repo.language && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            paddingTop: '22px', flexShrink: 0,
          }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: langColor, display: 'block' }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#6b4035' }}>
              {repo.language}
            </span>
          </div>
        )}
      </div>

      <p style={{ fontSize: '15px', color: '#6b4035', lineHeight: 1.75, flex: 1 }}>
        {repo.description || 'No description provided.'}
      </p>

      {repo.topics?.length > 0 && (
        <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap' }}>
          {repo.topics.slice(0, 6).map(t => (
            <span key={t} className="topic-tag">{t}</span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '4px' }}>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="btn-violet">
          <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
          View on GitHub
        </a>
        {repo.homepage && (
          <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="btn-cyan">
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Live Site
          </a>
        )}
      </div>

      {repo.stargazers_count > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#4a2820', fontSize: '12px' }}>
          <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          {repo.stargazers_count}
        </div>
      )}
    </div>
  )
}

export default function Projects() {
  const { repos, loading, error } = useGitHubRepos()
  const publicRepos = repos.filter(r => !r.private)

  return (
    <section style={{ position: 'relative', minHeight: 'calc(100vh - 80px)', padding: '40px 28px 72px', overflow: 'hidden' }}>
      <StarsBackground />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ marginBottom: '52px', textAlign: 'center' }}>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(32px, 4vw, 54px)',
            fontWeight: 700,
            letterSpacing: '-1.5px',
            color: '#e8eaf2',
            marginBottom: '10px',
          }}>
            My Projects
          </h1>
          {!loading && publicRepos.length > 0 && (
            <p style={{ color: '#4a2820', fontSize: '14px', fontFamily: "'JetBrains Mono', monospace" }}>
              {publicRepos.length} public repositories · live from GitHub
            </p>
          )}
        </div>

        {loading && (
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <Skeleton />
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '48px', color: '#ef4444', fontFamily: "'JetBrains Mono', monospace", fontSize: '14px' }}>
            Could not load repositories. Check your connection.
          </div>
        )}

        {!loading && !error && publicRepos.length === 0 && (
          <div style={{ textAlign: 'center', color: '#4a2820', padding: '48px', fontSize: '16px' }}>
            No public repositories found.
          </div>
        )}

        {!loading && !error && publicRepos.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination, Keyboard, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            navigation
            pagination={{ clickable: true }}
            keyboard={{ enabled: true }}
            speed={500}
            style={{ paddingBottom: '52px' }}
          >
            {publicRepos.map(repo => (
              <SwiperSlide key={repo.id}>
                <div style={{ padding: '4px 44px 8px' }}>
                  <ProjectCard repo={repo} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  )
}

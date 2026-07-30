import { NavLink } from 'react-router-dom'
import Background from '../components/Background'

const PROFILE_IMG = `${import.meta.env.BASE_URL}avatar.JPEG`
const RESUME_URL = 'https://drive.google.com/file/d/1lIrF5fA7tJJ1c-Dzn06On99H8tWSh_ta/view?usp=sharing'
const FALLBACK_IMG = 'https://avatars.githubusercontent.com/parisa-singh'

const BIO = `I'm an Honors Computer Science student at UMass Amherst who builds software that people actually use. My work spans AI/machine learning, full-stack development, and UI/UX design — and I care most about the point where thoughtful engineering meets real-world impact.`

const BIO_2 = `Currently a Software Engineer Intern at EyeZense, where I work on distributed edge systems and AI-driven monitoring.`

const QUICK_LINKS = [
  {
    to: '/experience',
    label: 'Experience',
    sub: 'Internships, leadership & work',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
  },
  {
    to: '/projects',
    label: 'Projects',
    sub: 'What I\'ve built, live from GitHub',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    to: '/skills',
    label: 'Skills',
    sub: 'Languages, tools & focus areas',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6a2 2 0 0 0 2.8 2.8l6-6a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.1-2.1 2.6-2.6z" />
      </svg>
    ),
  },
]

function QuickLink({ to, icon, label, sub }) {
  return (
    <NavLink to={to} style={{ textDecoration: 'none' }}>
      <div
        className="quick-link"
        style={{
          display: 'flex', alignItems: 'center', gap: '14px',
          padding: '14px 18px', borderRadius: '12px',
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          transition: 'background 0.2s, border-color 0.2s, transform 0.15s',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'var(--accent-tint-soft)'
          e.currentTarget.style.borderColor = 'var(--accent-border)'
          e.currentTarget.style.transform = 'translateX(4px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'var(--surface-2)'
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.transform = 'translateX(0)'
        }}
      >
        <span style={{ color: 'var(--accent-contrast)', flexShrink: 0, display: 'flex' }}>{icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '14px', color: 'var(--text)' }}>
            {label}
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--text-faint)', marginTop: '2px' }}>
            {sub}
          </div>
        </div>
        <svg width="14" height="14" fill="none" stroke="var(--accent-contrast)" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </NavLink>
  )
}

export default function AboutMe() {
  return (
    <section className="page" style={{ display: 'flex', alignItems: 'center' }}>
      <Background variant="about" />

      <div className="container about-hero">
        {/* Left: text */}
        <div className="about-text">
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '13px',
            color: 'var(--accent-contrast)', marginBottom: '18px', letterSpacing: '1.5px',
            fontWeight: 500, textTransform: 'uppercase',
          }}>
            Software Engineer · CS @ UMass Amherst
          </p>

          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(42px, 7vw, 76px)', fontWeight: 700,
            lineHeight: 1.02, letterSpacing: '-2.5px', paddingBottom: '6px', marginBottom: '10px',
            background: 'linear-gradient(135deg, var(--grad-1) 0%, var(--grad-2) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Parisa Singh
          </h1>

          <p style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: '15px',
            color: 'var(--text-dim)', fontWeight: 500, marginBottom: '26px',
          }}>
            B.S. Computer Science (Honors), Business Minor
            <span style={{ color: 'var(--text-ghost)', margin: '0 8px' }}>·</span>
            Class of 2028
          </p>

          <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '14px' }}>
            {BIO}
          </p>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '30px' }}>
            {BIO_2}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
            {QUICK_LINKS.map(ql => <QuickLink key={ql.to} {...ql} />)}
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
              </svg>
              Resume
            </a>
            <a href="https://www.linkedin.com/in/parisa-singh/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" aria-label="LinkedIn">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
              LinkedIn
            </a>
            <a href="https://github.com/parisa-singh" target="_blank" rel="noopener noreferrer" className="btn btn-outline" aria-label="GitHub">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* Right: avatar */}
        <div className="about-avatar">
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: '-26px', borderRadius: '50%',
              background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)', zIndex: 0,
            }} />
            <div style={{
              position: 'absolute', inset: '-3px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--grad-1) 0%, var(--grad-2) 100%)', zIndex: 1,
            }} />
            <img
              src={PROFILE_IMG}
              alt="Portrait of Parisa Singh"
              onError={e => { e.target.src = FALLBACK_IMG }}
              style={{
                position: 'relative', zIndex: 2,
                width: 'clamp(200px, 42vw, 300px)', height: 'clamp(200px, 42vw, 300px)',
                borderRadius: '50%', objectFit: 'cover',
                border: '5px solid var(--bg)', display: 'block',
                boxShadow: '0 20px 60px var(--accent-glow)',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        .about-hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(32px, 6vw, 72px);
          flex-wrap: wrap;
        }
        .about-text { flex: 1 1 440px; max-width: 620px; }
        .about-avatar { flex: 0 0 auto; display: flex; justify-content: center; }
        @media (max-width: 860px) {
          .about-hero { flex-direction: column-reverse; align-items: stretch; }
          .about-text { max-width: 100%; }
          .about-avatar { margin-bottom: 8px; }
        }
      `}</style>
    </section>
  )
}

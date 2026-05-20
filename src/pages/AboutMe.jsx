import { NavLink } from 'react-router-dom'
import FloatBackground from '../components/FloatBackground'

const PROFILE_IMG = `${import.meta.env.BASE_URL}avatar.JPEG`
const RESUME_URL = 'https://drive.google.com/file/d/1lIrF5fA7tJJ1c-Dzn06On99H8tWSh_ta/view?usp=sharing'
const FALLBACK_IMG = 'https://avatars.githubusercontent.com/parisa-singh'

const BIO = `I'm an Honors Computer Science student at UMass Amherst, driven by a passion for building technology that creates real impact. My work spans artificial intelligence, machine learning, software development, UI/UX design, and game development — I thrive at the intersection of creativity and engineering. With a deep interest in tech entrepreneurship, I aim to build products that matter and businesses that last.`

const QUICK_LINKS = [
  {
    to: '/skills',
    emoji: '🛠',
    label: 'My Toolbox',
    sub: 'Python · React · Machine Learning',
    external: false,
  },
  {
    to: '/projects',
    emoji: '⚡',
    label: 'See me in action!',
    sub: 'Browse my projects',
    external: false,
  },
  {
    to: '/articles',
    emoji: '📖',
    label: 'My Thoughts on Tech',
    sub: 'Read my articles',
    external: false,
  },
]

function QuickLink({ to, emoji, label, sub }) {
  return (
    <NavLink
      to={to}
      style={{ textDecoration: 'none' }}
    >
      {({ isActive }) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '13px 18px',
            borderRadius: '12px',
            background: isActive ? 'rgba(255,59,48,0.08)' : 'rgba(20,6,4,0.6)',
            border: `1px solid ${isActive ? 'rgba(255,59,48,0.35)' : 'rgba(255,255,255,0.07)'}`,
            transition: 'background 0.2s, border-color 0.2s, transform 0.15s',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,59,48,0.08)'
            e.currentTarget.style.borderColor = 'rgba(255,59,48,0.3)'
            e.currentTarget.style.transform = 'translateX(4px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(20,6,4,0.6)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
            e.currentTarget.style.transform = 'translateX(0)'
          }}
        >
          <span style={{ fontSize: '20px', flexShrink: 0 }}>{emoji}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '14px', color: '#e8eaf2' }}>
              {label}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#3d4663', marginTop: '2px' }}>
              {sub}
            </div>
          </div>
          <svg width="14" height="14" fill="none" stroke="#ff3b30" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </NavLink>
  )
}

export default function AboutMe() {
  return (
    <section style={{ position: 'relative', minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'flex-start', overflow: 'hidden' }}>
      <FloatBackground />

      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '36px 32px 60px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '64px',
        flexWrap: 'wrap',
      }}>
        {/* Left: text */}
        <div style={{ flex: '1 1 440px', maxWidth: '620px' }}>

          {/* Mono label */}
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '20px',
            color: '#ff3b30',
            marginBottom: '16px',
            letterSpacing: '1px',
            fontWeight: 500,
          }}>
            &gt; hello world!
          </p>

          {/* Name */}
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(48px, 6vw, 80px)',
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: '-3px',
            marginBottom: '14px',
            background: 'linear-gradient(135deg, #ff3b30 0%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Parisa Singh
          </h1>

          {/* Academic title */}
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '15px',
            color: '#5a6078',
            fontWeight: 500,
            marginBottom: '28px',
            letterSpacing: '0.1px',
          }}>
            CS Major &amp; Business Minor &nbsp;·&nbsp;{' '}
            <span style={{ color: '#ff3b30' }}>UMass Amherst</span>
            &nbsp;·&nbsp; Class of 2028
          </p>

          {/* Bio */}
          <p style={{
            fontSize: '16px',
            lineHeight: 1.82,
            color: '#8a90a8',
            marginBottom: '10px',
          }}>
            {BIO}
          </p>
          <p style={{
            fontSize: '16px',
            lineHeight: 1.82,
            color: '#8a90a8',
            marginBottom: '32px',
          }}>
            Always exploring, always building —{' '}
            <span style={{ color: '#e8eaf2', fontWeight: 500 }}>let's connect and create something great.</span>
          </p>

          {/* Quick links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
            {QUICK_LINKS.map(ql => <QuickLink key={ql.to} {...ql} />)}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn-cyan">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
              </svg>
              Resume
            </a>
            <a href="https://github.com/parisa-singh" target="_blank" rel="noopener noreferrer" className="btn-violet">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              GitHub
            </a>
            <a href="https://substack.com/@creativecompiler77" target="_blank" rel="noopener noreferrer" className="btn-violet">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
              </svg>
              Substack
            </a>
          </div>
        </div>

        {/* Right: avatar */}
        <div style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              inset: '-28px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(245,158,11,0.14) 0%, transparent 70%)',
              zIndex: 0,
            }} />
            <div style={{
              position: 'absolute',
              inset: '-3px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff3b30 0%, #f59e0b 100%)',
              zIndex: 1,
            }} />
            <img
              src={PROFILE_IMG}
              alt="Parisa Singh"
              onError={e => { e.target.src = FALLBACK_IMG }}
              style={{
                position: 'relative',
                zIndex: 2,
                width: 'clamp(220px, 24vw, 320px)',
                height: 'clamp(220px, 24vw, 320px)',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '5px solid #06060f',
                display: 'block',
                boxShadow: '0 0 80px rgba(245,158,11,0.18), 0 0 140px rgba(245,158,11,0.12)',
              }}
            />
          </div>
        </div>
      </div>

    </section>
  )
}

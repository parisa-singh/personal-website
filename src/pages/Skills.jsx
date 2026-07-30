import Background from '../components/Background'

const SOFT_SKILLS = [
  'Leadership', 'Communication', 'Teamwork', 'Problem Solving',
  'Adaptability', 'Time Management', 'Critical Thinking', 'Creativity',
]

const HARD_SKILLS = [
  { label: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { label: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { label: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { label: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { label: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { label: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { label: 'HTML / CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { label: 'C / C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
]

const ICON = {
  ai: <path d="M9 3h6v3h3a2 2 0 0 1 2 2v3h-3M9 3H6a2 2 0 0 0-2 2v3h3M9 3v3m6-3v3M4 11H1m3 4H1m20-4h3m-3 4h3M9 21H6a2 2 0 0 1-2-2v-3h3m2 5h6v-3H9v3zm6 0h3a2 2 0 0 0 2-2v-3h-3M8 8h8v8H8z" />,
  web: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></>,
  ml: <path d="M3 3v18h18M7 15l3-4 3 3 5-7" />,
  ux: <path d="M12 19l7-7a2.8 2.8 0 0 0-4-4l-7 7-1 5 5-1zM11 8l5 5" />,
  game: <><rect x="2" y="7" width="20" height="10" rx="4" /><path d="M7 11v2m-1-1h2m8-1h.01M18 13h.01" /></>,
  data: <><path d="M10 2v6l-5 8a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-8V2" /><path d="M8 2h8M7 15h10" /></>,
}

const SKILLSET = [
  { label: 'Artificial Intelligence', k: 'ai', desc: 'ML models, neural networks, NLP' },
  { label: 'Web Development', k: 'web', desc: 'React, Vite, REST APIs' },
  { label: 'Machine Learning', k: 'ml', desc: 'scikit-learn, pandas, pipelines' },
  { label: 'UI / UX Design', k: 'ux', desc: 'Figma, user flows, prototyping' },
  { label: 'Game Development', k: 'game', desc: 'Unity, C#, 2D/3D mechanics' },
  { label: 'Data Science', k: 'data', desc: 'Statistical analysis, visualization' },
]

function SoftPill({ label, delay }) {
  return (
    <div className="skill-pill fade-in-up" style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
      <span style={{ color: 'var(--text-2)', fontSize: '14px', fontWeight: 500 }}>{label}</span>
    </div>
  )
}

function HardPill({ label, icon, delay }) {
  return (
    <div className="skill-pill fade-in-up" style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}>
      <img src={icon} alt="" width="19" height="19" style={{ objectFit: 'contain', flexShrink: 0 }} onError={e => { e.target.style.display = 'none' }} />
      <span style={{ color: 'var(--text-2)', fontSize: '14px', fontWeight: 500 }}>{label}</span>
    </div>
  )
}

function SkillsetCard({ label, k, desc, delay }) {
  return (
    <div
      className="fade-in-up"
      style={{
        animationDelay: `${delay}ms`, animationFillMode: 'both',
        padding: '18px 20px', borderRadius: '12px',
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        display: 'flex', alignItems: 'flex-start', gap: '14px',
        transition: 'border-color 0.2s, background 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-border-strong)'; e.currentTarget.style.background = 'var(--accent-tint-soft)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface-2)' }}
    >
      <span style={{
        width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
        background: 'var(--accent-tint)', border: '1px solid var(--accent-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-contrast)',
      }}>
        <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          {ICON[k]}
        </svg>
      </span>
      <div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '15px', color: 'var(--text)', marginBottom: '3px' }}>
          {label}
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--text-faint)' }}>
          {desc}
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section className="page">
      <Background variant="skills" />

      <div className="container page-content">
        <div className="section-head">
          <h1>Skills</h1>
          <p>Languages, tools, and the areas I like to build in.</p>
        </div>

        <div className="grid-2col" style={{ marginBottom: 'clamp(18px, 2.5vw, 24px)' }}>
          <div className="card">
            <span className="eyebrow">01 / People &amp; Process</span>
            <h2 className="section-title">Soft Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px' }}>
              {SOFT_SKILLS.map((s, i) => <SoftPill key={s} label={s} delay={i * 45} />)}
            </div>
          </div>

          <div className="card">
            <span className="eyebrow">02 / Tech &amp; Tools</span>
            <h2 className="section-title">Hard Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px' }}>
              {HARD_SKILLS.map((s, i) => <HardPill key={s.label} {...s} delay={i * 45 + 120} />)}
            </div>
          </div>
        </div>

        <div className="card">
          <span className="eyebrow">03 / Focus Areas</span>
          <h2 className="section-title">What I Build</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
            {SKILLSET.map((s, i) => <SkillsetCard key={s.label} {...s} delay={i * 55 + 240} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

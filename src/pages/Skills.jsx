import BokehBackground from '../components/BokehBackground'

const SOFT_SKILLS = [
  { label: 'Leadership', icon: '🎯' },
  { label: 'Communication', icon: '💬' },
  { label: 'Teamwork', icon: '🤝' },
  { label: 'Problem Solving', icon: '🧩' },
  { label: 'Adaptability', icon: '🔄' },
  { label: 'Time Management', icon: '⏱️' },
  { label: 'Critical Thinking', icon: '🔍' },
  { label: 'Creativity', icon: '✨' },
]

const HARD_SKILLS = [
  { label: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { label: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { label: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { label: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { label: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { label: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { label: 'HTML / CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { label: 'Data Structures', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
]

const SKILLSET = [
  { label: 'Artificial Intelligence', icon: '🤖', desc: 'ML models, neural networks, NLP' },
  { label: 'Web Development', icon: '🌐', desc: 'React, Vite, HTML/CSS, REST APIs' },
  { label: 'Machine Learning', icon: '📊', desc: 'scikit-learn, pandas, data pipelines' },
  { label: 'UI / UX Design', icon: '🎨', desc: 'Figma, user flows, prototyping' },
  { label: 'Game Development', icon: '🎮', desc: 'Unity, C#, 2D/3D mechanics' },
  { label: 'Data Science', icon: '🔬', desc: 'Statistical analysis, visualization' },
]

function SoftCard({ label, icon, delay }) {
  return (
    <div
      className="skill-pill fade-in-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both', cursor: 'default' }}
    >
      <span style={{ fontSize: '18px' }}>{icon}</span>
      <span style={{ color: '#c8ccdc', fontSize: '14px', fontWeight: 500 }}>{label}</span>
    </div>
  )
}

function HardCard({ label, icon, delay }) {
  return (
    <div
      className="skill-pill fade-in-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both', cursor: 'default' }}
    >
      <img
        src={icon} alt={label} width="19" height="19"
        style={{ objectFit: 'contain', flexShrink: 0 }}
        onError={e => { e.target.style.display = 'none' }}
      />
      <span style={{ color: '#c8ccdc', fontSize: '14px', fontWeight: 500 }}>{label}</span>
    </div>
  )
}

function SkillsetCard({ label, icon, desc, delay }) {
  return (
    <div
      className="fade-in-up"
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'both',
        padding: '18px 20px',
        borderRadius: '12px',
        background: 'rgba(20,6,4,0.6)',
        border: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
        width: '260px',
        flexShrink: 0,
        transition: 'border-color 0.2s, background 0.2s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255,59,48,0.3)'
        e.currentTarget.style.background = 'rgba(255,59,48,0.04)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
        e.currentTarget.style.background = 'rgba(13,13,31,0.6)'
      }}
    >
      <span style={{ fontSize: '22px', flexShrink: 0, marginTop: '1px' }}>{icon}</span>
      <div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '15px', color: '#e8eaf2', marginBottom: '4px' }}>
          {label}
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#3d4663' }}>
          {desc}
        </div>
      </div>
    </div>
  )
}

const CARD = {
  borderRadius: '20px',
  padding: '32px',
  background: 'rgba(20,6,4,0.75)',
  border: '1px solid rgba(255,255,255,0.07)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
}

const SECTION_LABEL = { fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }
const SECTION_TITLE = { fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 700, color: '#e8eaf2', marginBottom: '24px' }

export default function Skills() {
  return (
    <section style={{ position: 'relative', minHeight: 'calc(100vh - 80px)', padding: '40px 28px 72px', overflow: 'hidden' }}>
      <BokehBackground />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1140px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(32px, 4vw, 54px)',
            fontWeight: 700,
            letterSpacing: '-1.5px',
            color: '#e8eaf2',
          }}>
            My Skills
          </h1>
        </div>

        {/* Top row: two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '24px' }}>
          {/* People & Process */}
          <div style={CARD}>
            <span style={{ ...SECTION_LABEL, color: '#ff3b30' }}>01 / People &amp; Process</span>
            <h2 style={SECTION_TITLE}>Soft Skills</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              {SOFT_SKILLS.map((s, i) => <SoftCard key={s.label} {...s} delay={i * 55} />)}
            </div>
          </div>

          {/* Tech & Tools */}
          <div style={CARD}>
            <span style={{ ...SECTION_LABEL, color: '#ff3b30' }}>02 / Tech &amp; Tools</span>
            <h2 style={SECTION_TITLE}>Hard Skills</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              {HARD_SKILLS.map((s, i) => <HardCard key={s.label} {...s} delay={i * 55 + 150} />)}
            </div>
          </div>
        </div>

        {/* Bottom row: full-width Skillset */}
        <div style={CARD}>
          <span style={{ ...SECTION_LABEL, color: '#ff3b30' }}>03 / Skillset</span>
          <h2 style={SECTION_TITLE}>What I Build</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {SKILLSET.map((s, i) => <SkillsetCard key={s.label} {...s} delay={i * 60 + 300} />)}
          </div>
        </div>

        {/* UMass note */}
        <div style={{
          marginTop: '28px',
          padding: '20px 28px',
          borderRadius: '14px',
          background: 'rgba(255,59,48,0.04)',
          border: '1px solid rgba(255,59,48,0.12)',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '16px',
            fontWeight: 600,
            letterSpacing: '0.2px',
            color: '#e8eaf2',
          }}>
            <span style={{ color: '#ff3b30' }}>CS Major &amp; Business Minor</span>
            <span style={{ color: '#4a2820', margin: '0 10px' }}>·</span>
            <span style={{ color: '#ff3b30' }}>UMass Amherst</span>
            <span style={{ color: '#4a2820', margin: '0 10px' }}>·</span>
            <span style={{ color: '#ff3b30' }}>Class of &#39;28</span>
          </p>
        </div>
      </div>
    </section>
  )
}

import CircuitBackground from '../components/CircuitBackground'

const CLUBS = [
  {
    role: 'Vice President',
    org: 'UMass Design Club',
    period: 'Jan 2025 – May 2026',
    icon: '🎨',
    tags: ['UI/UX Design', 'Event Planning', 'Leadership', 'Operations'],
    desc: 'Progressed from Event Coordinator to Vice President on the Executive Board. Lead cross-functional initiatives, oversee event logistics and space reservations, and manage budget coordination — fostering a human-centered design community on campus.',
  },
  {
    role: 'Marketing Coordinator',
    org: 'UMass Public Interest Technology (PIT)',
    period: 'Sep 2025 – May 2026',
    icon: '💡',
    tags: ['Marketing', 'Brand Development', 'Community', 'Social Media'],
    desc: 'On the Executive Board of UMass PIT. Lead campus marketing and digital presence — designing flyers, running campaigns, and managing external partner communications to grow the club\'s brand and event reach.',
  },
]

const CAREER = [
  {
    role: 'Software Engineer Intern',
    org: 'EyeZense Inc.',
    period: 'May 2026 – Present',
    icon: '⚡',
    tags: ['Edge Computing', 'AI Alerting', 'Distributed Systems', 'Cloud'],
    desc: 'Building the Edge Device Management (EDM) platform at a hybrid internship in Sunnyvale, CA. Working on device health monitoring, AI-driven anomaly detection, and intelligent alert filtering for distributed edge systems integrated with cloud backends.',
  },
  {
    role: 'IT Consultant I → II',
    org: 'UMass Amherst Information Technology',
    period: 'Apr 2025 – May 2026',
    icon: '🖥️',
    tags: ['Technical Support', 'IT Service Management', 'Mentoring'],
    desc: 'Promoted from Consultant I to II at the UMass IT Service Desk. Provide advanced hardware, software, and network support across campus; mentor junior consultants; and manage account provisioning and MFA resets for students, faculty, and staff.',
  },
  {
    role: 'Tools Development Intern',
    org: 'WILLSMEET',
    period: 'Jun – Jul 2023',
    icon: '📊',
    tags: ['Python', 'Data Analysis', 'Procurement Modeling', 'B2B'],
    desc: 'Developed a Python-based procurement modeling tool enabling customers to predict real-time needs and place orders on a B2B platform. Analyzed and processed multi-format data to generate insights supporting operational decision-making.',
  },
  {
    role: 'Design Intern',
    org: 'Incubex',
    period: 'Jun – Jul 2022',
    icon: '✏️',
    tags: ['AutoCAD', 'SketchUp', '3D Modeling', 'Space Design'],
    desc: 'Designed floor plans and layouts using AutoCAD, Floor Plan Creator, and SketchUp to optimize co-working spaces at a Bengaluru-based firm. Collaborated with senior designers on 2D and 3D projects spanning space management and interior design.',
  },
]

function ExperienceCard({ role, org, period, icon, tags, desc, delay }) {
  return (
    <div
      className="fade-in-up"
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'both',
        display: 'flex',
        gap: '18px',
        padding: '22px 24px',
        borderRadius: '14px',
        background: 'rgba(20,6,4,0.7)',
        border: '1px solid rgba(255,255,255,0.06)',
        marginBottom: '14px',
        transition: 'border-color 0.2s, background 0.2s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255,59,48,0.3)'
        e.currentTarget.style.background = 'rgba(255,59,48,0.04)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
        e.currentTarget.style.background = 'rgba(20,6,4,0.7)'
      }}
    >
      <div style={{
        width: '42px',
        height: '42px',
        borderRadius: '10px',
        background: 'rgba(255,59,48,0.1)',
        border: '1px solid rgba(255,59,48,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '4px' }}>
          <div>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '16px', color: '#e8eaf2', marginBottom: '2px' }}>
              {role}
            </h3>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', color: '#ff3b30', fontWeight: 500 }}>
              {org}
            </p>
          </div>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: '#4a2820',
            flexShrink: 0,
            paddingTop: '2px',
          }}>
            {period}
          </span>
        </div>
        <p style={{ fontSize: '13px', color: '#6b4035', lineHeight: 1.7, margin: '8px 0 10px' }}>
          {desc}
        </p>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {tags.map(t => (
            <span key={t} className="topic-tag">{t}</span>
          ))}
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

const SECTION_LABEL = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '10px',
  letterSpacing: '2.5px',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '8px',
  color: '#ff3b30',
}

const SECTION_TITLE = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '20px',
  fontWeight: 700,
  color: '#e8eaf2',
  marginBottom: '24px',
}

export default function Experience() {
  return (
    <section style={{ position: 'relative', minHeight: 'calc(100vh - 80px)', padding: '40px 28px 72px', overflow: 'hidden' }}>
      <CircuitBackground />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1140px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(32px, 4vw, 54px)',
            fontWeight: 700,
            letterSpacing: '-1.5px',
            color: '#e8eaf2',
          }}>
            My Experience
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {/* Clubs */}
          <div style={CARD}>
            <span style={SECTION_LABEL}>01 / Campus Life</span>
            <h2 style={SECTION_TITLE}>Clubs &amp; Organizations</h2>
            {CLUBS.map((c, i) => (
              <ExperienceCard key={c.org} {...c} delay={i * 70} />
            ))}
          </div>

          {/* Career */}
          <div style={CARD}>
            <span style={SECTION_LABEL}>02 / Professional</span>
            <h2 style={SECTION_TITLE}>Internships &amp; Work</h2>
            {CAREER.map((c, i) => (
              <ExperienceCard key={c.org} {...c} delay={i * 70 + 150} />
            ))}
          </div>
        </div>

        {/* Footer note */}
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

import CircuitBackground from '../components/CircuitBackground'

// Edit these arrays with your actual experience
const CLUBS = [
  {
    role: 'Participant',
    org: 'HackUMass',
    period: '2024 – Present',
    icon: '⚡',
    tags: ['Hackathon', 'Full-Stack', 'Team Building'],
    desc: 'Compete in UMass Amherst\'s flagship hackathon — building full-stack projects in 36 hours alongside hundreds of student developers from across the region.',
  },
  {
    role: 'Member',
    org: 'Women in Computer Science (WiCS)',
    period: '2024 – Present',
    icon: '🌟',
    tags: ['Community', 'Networking', 'Mentorship'],
    desc: 'Engage with a community of women and allies in tech through industry speaker panels, technical workshops, and peer mentorship programs.',
  },
  {
    role: 'Member',
    org: 'UMass AI Club',
    period: '2024 – Present',
    icon: '🤖',
    tags: ['Machine Learning', 'AI Research', 'Projects'],
    desc: 'Explore cutting-edge AI/ML topics through project-based learning, paper readings, and collaboration with fellow ML enthusiasts.',
  },
  {
    role: 'Member',
    org: 'UMass Entrepreneurship Club',
    period: '2024 – Present',
    icon: '🚀',
    tags: ['Startups', 'Business', 'Pitch Competitions'],
    desc: 'Bridge tech and business through founder talks, pitch competitions, and workshops on venture creation and product-market fit.',
  },
]

const CAREER = [
  {
    role: 'Course Assistant',
    org: 'UMass Amherst — CS Department',
    period: 'Spring 2025 – Present',
    icon: '🎓',
    tags: ['Teaching', 'CS Education', 'Python'],
    desc: 'Support students in introductory CS coursework — holding office hours, explaining data structures and algorithms, and providing code review feedback.',
  },
  {
    role: 'Tech Volunteer',
    org: 'Community Digital Literacy Program',
    period: 'Summer 2024',
    icon: '🤝',
    tags: ['Tech for Good', 'Teaching', 'Accessibility'],
    desc: 'Volunteered to teach digital literacy and foundational programming concepts to community members, bridging the technology access gap.',
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
            <span style={SECTION_LABEL}>02 / Tech Experience</span>
            <h2 style={SECTION_TITLE}>Internships &amp; Volunteer Work</h2>
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

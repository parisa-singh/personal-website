import Background from '../components/Background'

const CLUBS = [
  {
    role: 'Vice President',
    org: 'UMass Design Club',
    period: 'Jan 2025 – May 2026',
    tags: ['UI/UX Design', 'Event Planning', 'Leadership', 'Operations'],
    desc: 'Progressed from Event Coordinator to Vice President on the Executive Board. Lead cross-functional initiatives, oversee event logistics and space reservations, and manage budget coordination — fostering a human-centered design community on campus.',
  },
  {
    role: 'Marketing Coordinator',
    org: 'UMass Public Interest Technology (PIT)',
    period: 'Sep 2025 – May 2026',
    tags: ['Marketing', 'Brand Development', 'Community', 'Social Media'],
    desc: 'On the Executive Board of UMass PIT. Lead campus marketing and digital presence — designing flyers, running campaigns, and managing external partner communications to grow the club\'s brand and event reach.',
  },
]

const CAREER = [
  {
    role: 'Software Engineer Intern',
    org: 'EyeZense Inc.',
    period: 'May 2026 – Present',
    tags: ['Edge Computing', 'AI Alerting', 'Distributed Systems', 'Cloud'],
    desc: 'Building the Edge Device Management (EDM) platform at a hybrid internship in Sunnyvale, CA. Working on device health monitoring, AI-driven anomaly detection, and intelligent alert filtering for distributed edge systems integrated with cloud backends.',
  },
  {
    role: 'IT Consultant I → II',
    org: 'UMass Amherst Information Technology',
    period: 'Apr 2025 – May 2026',
    tags: ['Technical Support', 'IT Service Management', 'Mentoring'],
    desc: 'Promoted from Consultant I to II at the UMass IT Service Desk. Provide advanced hardware, software, and network support across campus; mentor junior consultants; and manage account provisioning and MFA resets for students, faculty, and staff.',
  },
  {
    role: 'Tools Development Intern',
    org: 'WILLSMEET',
    period: 'Jun – Jul 2023',
    tags: ['Python', 'Data Analysis', 'Procurement Modeling', 'B2B'],
    desc: 'Developed a Python-based procurement modeling tool enabling customers to predict real-time needs and place orders on a B2B platform. Analyzed and processed multi-format data to generate insights supporting operational decision-making.',
  },
  {
    role: 'Design Intern',
    org: 'Incubex',
    period: 'Jun – Jul 2022',
    tags: ['AutoCAD', 'SketchUp', '3D Modeling', 'Space Design'],
    desc: 'Designed floor plans and layouts using AutoCAD, Floor Plan Creator, and SketchUp to optimize co-working spaces at a Bengaluru-based firm. Collaborated with senior designers on 2D and 3D projects spanning space management and interior design.',
  },
]

function ExperienceCard({ role, org, period, tags, desc, delay }) {
  return (
    <div
      className="fade-in-up"
      style={{
        animationDelay: `${delay}ms`, animationFillMode: 'both',
        display: 'flex', gap: '16px', padding: '20px 22px', borderRadius: '14px',
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        marginBottom: '14px', transition: 'border-color 0.2s, background 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-border-strong)'; e.currentTarget.style.background = 'var(--accent-tint-soft)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface-2)' }}
    >
      <div style={{
        width: '44px', height: '44px', borderRadius: '11px',
        background: 'var(--accent-tint)', border: '1px solid var(--accent-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '18px',
        color: 'var(--accent-contrast)', flexShrink: 0,
      }}>
        {org.replace(/^UMass\s+/, '')[0]}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '2px' }}>
          <div>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '16px', color: 'var(--text)', marginBottom: '2px' }}>
              {role}
            </h3>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', color: 'var(--accent-contrast)', fontWeight: 500 }}>
              {org}
            </p>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--text-faint)', flexShrink: 0, paddingTop: '3px' }}>
            {period}
          </span>
        </div>
        <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: 1.7, margin: '8px 0 12px' }}>
          {desc}
        </p>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {tags.map(t => <span key={t} className="topic-tag">{t}</span>)}
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section className="page">
      <Background variant="experience" />

      <div className="container page-content">
        <div className="section-head">
          <h1>Experience</h1>
          <p>Where I've worked, led, and built.</p>
        </div>

        <div className="grid-2col">
          <div className="card">
            <span className="eyebrow">01 / Professional</span>
            <h2 className="section-title">Internships &amp; Work</h2>
            {CAREER.map((c, i) => <ExperienceCard key={c.org} {...c} delay={i * 70} />)}
          </div>

          <div className="card">
            <span className="eyebrow">02 / Campus Leadership</span>
            <h2 className="section-title">Clubs &amp; Organizations</h2>
            {CLUBS.map((c, i) => <ExperienceCard key={c.org} {...c} delay={i * 70 + 150} />)}
          </div>
        </div>

        <div style={{
          marginTop: '24px', padding: '20px 28px', borderRadius: '14px',
          background: 'var(--accent-tint-soft)', border: '1px solid var(--accent-border)', textAlign: 'center',
        }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>
            <span style={{ color: 'var(--accent-contrast)' }}>CS Major &amp; Business Minor</span>
            <span style={{ color: 'var(--text-ghost)', margin: '0 10px' }}>·</span>
            <span style={{ color: 'var(--accent-contrast)' }}>UMass Amherst</span>
            <span style={{ color: 'var(--text-ghost)', margin: '0 10px' }}>·</span>
            <span style={{ color: 'var(--accent-contrast)' }}>Class of 2028</span>
          </p>
        </div>
      </div>
    </section>
  )
}

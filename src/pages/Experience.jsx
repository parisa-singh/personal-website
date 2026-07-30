import { EXPERIENCE, LINKEDIN } from '../data/experience'
import { useReveal } from '../hooks/useReveal'
import { useHighlight } from '../hooks/useHighlight'

function Row({ role, org, period, current, desc, delay }) {
  return (
    <a
      className={`exp-row reveal${current ? ' current' : ''}`}
      data-hl={role}
      href={LINKEDIN}
      target="_blank"
      rel="noopener noreferrer"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div>
        <div className="exp-role">{role}</div>
        <div className="exp-org">
          {org}
          {current && <span className="current-tag"> · Current</span>}
        </div>
        <div className="exp-desc">{desc}</div>
        <div className="exp-li">View on LinkedIn ↗</div>
      </div>
      <div className="exp-when">{period}</div>
    </a>
  )
}

function Column({ num, title, items }) {
  return (
    <div>
      <div className="slabel">
        <span className="n">{num}</span>
        <h2>{title}</h2>
      </div>
      <div className="timeline">
        {items.map((e, i) => <Row key={e.role + e.org} {...e} delay={i * 55} />)}
      </div>
    </div>
  )
}

// Most recent first: ongoing ("Present") roles rank above ended ones,
// then by start date descending.
const byRecent = (a, b) => {
  if (a.current !== b.current) return a.current ? -1 : 1
  return b.start.localeCompare(a.start)
}

export default function Experience() {
  useReveal()
  useHighlight()
  const work = EXPERIENCE.filter((e) => e.type === 'work').sort(byRecent)
  const clubs = EXPERIENCE.filter((e) => e.type === 'club').sort(byRecent)

  return (
    <section className="page">
      <div className="container">
        <div className="page-head" style={{ marginBottom: 'clamp(32px, 5vw, 52px)' }}>
          <p className="kicker">Experience</p>
          <p className="lede" style={{ maxWidth: '560px' }}>
            Internships, work, and the clubs I help lead. Every role links to my LinkedIn.
          </p>
        </div>

        <div className="exp-cols">
          <Column num="01" title="Internships & Work" items={work} />
          <Column num="02" title="Clubs & Organizations" items={clubs} />
        </div>
      </div>

      <style>{`
        .exp-cols { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(28px, 4.5vw, 52px); align-items: start; }
        .exp-cols .slabel h2 { font-size: clamp(21px, 2.6vw, 27px); }
        @media (max-width: 820px) { .exp-cols { grid-template-columns: 1fr; gap: 44px; } }
      `}</style>
    </section>
  )
}

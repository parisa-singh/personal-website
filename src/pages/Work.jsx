import PageHead from '../components/PageHead'
import { EXPERIENCE, LINKEDIN } from '../data/experience'

const sort = (arr) => [...arr].sort(
  (a, b) => (a.current === b.current ? 0 : a.current ? -1 : 1) || b.start.localeCompare(a.start)
)
const WORK = sort(EXPERIENCE.filter((e) => e.type === 'work'))
const CLUBS = sort(EXPERIENCE.filter((e) => e.type === 'club'))

function Column({ tag, title, items }) {
  return (
    <div className="exp-col">
      <div className="exp-col-head">
        <span className="exp-col-tag mono">{tag}</span>
        <h2 className="exp-col-title">{title}</h2>
      </div>
      <div className="exp-timeline">
        {items.map((e) => (
          <a key={e.role + e.org} className={`exp-row${e.current ? ' current' : ''}`}
            href={LINKEDIN} target="_blank" rel="noopener noreferrer">
            <span className="exp-dot" />
            <div className="exp-when mono">{e.period}{e.current && <span className="exp-live"> · current</span>}</div>
            <h3 className="exp-role">{e.role}</h3>
            <div className="exp-org">{e.org}</div>
            <p className="exp-desc">{e.desc}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

export default function Work() {
  return (
    <div className="page">
      <PageHead tag="EX.01 · EXPERIENCE" title="The path so far"
        note="Internships and work on the left, the clubs and organizations I help lead on the right — most recent first." />
      <div className="exp-cols">
        <Column tag="01" title="Internships & Work" items={WORK} />
        <Column tag="02" title="Clubs & Organizations" items={CLUBS} />
      </div>
    </div>
  )
}

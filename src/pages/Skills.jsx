import PageHead from '../components/PageHead'
import Panel from '../components/Panel'
import { TOOLS, FOCUS, STRENGTHS } from '../data/skills'

function Dots({ level = 3 }) {
  return <span className="dots" aria-label={`${level} of 5`}>{[1, 2, 3, 4, 5].map((n) => <i key={n} className={n <= level ? 'on' : ''} />)}</span>
}

function DotRows({ tag, group }) {
  return (
    <Panel tag={tag} label={group.cap.toUpperCase()} className="sk-panel">
      <div className="drows">
        {group.items.map((it) => (
          <div className="drow" key={it.label}>
            <span className="drow-name">{it.label}</span>
            <Dots level={it.level} />
          </div>
        ))}
      </div>
    </Panel>
  )
}

export default function Skills() {
  return (
    <div className="page">
      <PageHead tag="SK.00 · STACK" title="What I build with"
        note="Languages and tools I reach for, the areas I focus in, and how I work." />

      <Panel tag="SK.01" label={TOOLS.cap.toUpperCase()} className="sk-tools">
        <div className="logo-grid">
          {TOOLS.items.map((it) => (
            <div className="logo-tile" key={it.label}>
              <img src={it.icon} alt="" onError={(e) => { e.currentTarget.style.visibility = 'hidden' }} />
              <span className="logo-name">{it.label}</span>
              <span className="logo-dots">{[1, 2, 3, 4, 5].map((n) => <i key={n} className={n <= it.level ? 'on' : ''} />)}</span>
            </div>
          ))}
        </div>
      </Panel>

      <div className="sk-two">
        <DotRows tag="SK.02" group={FOCUS} />
        <DotRows tag="SK.03" group={STRENGTHS} />
      </div>
    </div>
  )
}

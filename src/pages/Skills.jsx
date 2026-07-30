import { TOOLS, FOCUS, STRENGTHS } from '../data/skills'
import { useReveal } from '../hooks/useReveal'
import { useHighlight } from '../hooks/useHighlight'

function Dots({ level }) {
  return (
    <span className="dots" aria-label={`${level} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => <i key={i} className={i <= level ? 'on' : ''} />)}
    </span>
  )
}

function DotRows({ group }) {
  return (
    <div className="reveal">
      <span className="gcap">{group.cap}</span>
      {group.items.map((it) => (
        <div className="drow" data-hl={it.label} key={it.label}>
          <span className="dn">{it.label}</span>
          <Dots level={it.level} />
        </div>
      ))}
    </div>
  )
}

export default function Skills() {
  useReveal()
  useHighlight()
  return (
    <section className="page">
      <div className="container">
        <div className="page-head" style={{ marginBottom: 'clamp(30px, 4vw, 48px)' }}>
          <p className="kicker">Skills</p>
          <p className="lede" style={{ maxWidth: '560px' }}>The languages, tools, and areas I like to build in.</p>
        </div>

        {/* Languages & Tools — logo grid + proficiency dots */}
        <div className="reveal" style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <span className="gcap">{TOOLS.cap}</span>
          <div className="logo-grid">
            {TOOLS.items.map((it) => (
              <div className="logo-tile" data-hl={it.label} key={it.label}>
                <img src={it.icon} alt="" onError={(e) => { e.target.style.visibility = 'hidden' }} />
                <div className="ln">{it.label}</div>
                <Dots level={it.level} />
              </div>
            ))}
          </div>
        </div>

        {/* Focus Areas + Strengths — dot rows */}
        <div className="skill-cols">
          <DotRows group={FOCUS} />
          <DotRows group={STRENGTHS} />
        </div>
      </div>
    </section>
  )
}

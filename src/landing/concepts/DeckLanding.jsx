import { useEffect, useState } from 'react'

/* LANDING 03 — Command Deck (HUD dashboard).
   Mission-control: a grid of mono panels — identity, status, stack,
   projects, signal — bordered modules with corner ticks and readouts. */

const STACK = [
  ['Python', 5], ['JavaScript / React', 4], ['SQL', 4], ['C', 3], ['AI / ML', 4], ['Figma', 4],
]
const PROJECTS = [
  ['project-alpha', 'live'], ['project-beta', 'live'], ['project-gamma', 'wip'],
]
const SIGNAL = [['GH', 'github.com/parisa-singh'], ['IN', 'linkedin.com/in/parisa-singh'], ['SS', 'creativecompiler77'], ['EM', 'open to roles']]

function Panel({ tag, label, className = '', children }) {
  return (
    <section className={`deck-panel ${className}`}>
      <span className="deck-tick tl" /><span className="deck-tick br" />
      <header className="deck-head mono"><span className="deck-tag">{tag}</span><span className="deck-label">{label}</span></header>
      {children}
    </section>
  )
}

export default function DeckLanding() {
  const [clock, setClock] = useState('')
  useEffect(() => {
    const f = () => setClock(new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'America/New_York' }))
    f(); const id = setInterval(f, 1000); return () => clearInterval(id)
  }, [])

  return (
    <div className="deck">
      <div className="deck-topbar mono">
        <span>◦ PARISA.SINGH // COMMAND DECK</span>
        <span className="deck-topbar-r">SYS <b>ONLINE</b> · {clock} ET</span>
      </div>
      <div className="deck-grid">
        <Panel tag="ID.01" label="IDENTITY" className="deck-id">
          <h1 className="deck-name">Parisa Singh<span>_</span></h1>
          <p className="deck-sub mono">Computer Science × Business · UMass Amherst ’28</p>
          <p className="deck-line">Software engineer building across engineering, AI &amp; product — now @ EyeZense.</p>
          <div className="deck-cta"><button className="deck-btn mono">ENTER_SITE ▸</button><button className="deck-btn ghost mono">RÉSUMÉ ↗</button></div>
        </Panel>

        <Panel tag="ST.02" label="STATUS">
          <div className="deck-rows mono">
            <div><span className="k">NOW</span><span className="v live">@ EyeZense</span></div>
            <div><span className="k">BASED</span><span className="v">Amherst, MA</span></div>
            <div><span className="k">ROLE</span><span className="v">SWE / PM / FDE</span></div>
            <div><span className="k">AVAIL</span><span className="v">open to roles</span></div>
          </div>
        </Panel>

        <Panel tag="SK.03" label="STACK">
          <div className="deck-stack">
            {STACK.map(([n, lvl]) => (
              <div className="deck-skill mono" key={n}>
                <span className="deck-skill-n">{n}</span>
                <span className="deck-meter">{[1, 2, 3, 4, 5].map((s) => <i key={s} className={s <= lvl ? 'on' : ''} />)}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel tag="PJ.04" label="PROJECTS">
          <div className="deck-projects mono">
            {PROJECTS.map(([n, st]) => (
              <div className="deck-proj" key={n}><span className={`deck-st ${st}`} />{n}<span className="deck-proj-arr">↗</span></div>
            ))}
          </div>
        </Panel>

        <Panel tag="SG.05" label="SIGNAL" className="deck-signal">
          <div className="deck-sigrows mono">
            {SIGNAL.map(([k, v]) => <div key={k}><span className="k">{k}</span><span className="v">{v}</span></div>)}
          </div>
        </Panel>
      </div>
    </div>
  )
}

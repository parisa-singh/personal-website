import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import EditorLanding from './concepts/EditorLanding'
import TerminalLanding from './concepts/TerminalLanding'
import DeckLanding from './concepts/DeckLanding'

const C = [
  { id: 'editor', n: '01', name: 'Code Editor', blurb: 'The site as an IDE — tabs, line numbers, your profile as syntax-highlighted code.', Comp: EditorLanding },
  { id: 'terminal', n: '02', name: 'Live Terminal', blurb: 'A shell that runs commands to reveal you — whoami · cat about · ls projects.', Comp: TerminalLanding },
  { id: 'deck', n: '03', name: 'Command Deck', blurb: 'A mission-control dashboard of panels — identity, status, stack, projects, signal.', Comp: DeckLanding },
]

export default function LandingLab() {
  const [i, setI] = useState(0)
  const c = C[i]
  const Comp = c.Comp
  const go = (d) => setI((p) => (p + d + C.length) % C.length)

  useEffect(() => {
    const k = (e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [])

  return (
    <div className="land-lab">
      <div className="land-view">
        <AnimatePresence mode="wait">
          <motion.div key={c.id} className="land-frame"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <Comp />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="land-caption mono">
        <AnimatePresence mode="wait">
          <motion.span key={c.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <b>{c.n} · {c.name}</b> — {c.blurb}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="land-switch">
        <button className="lab-arrow mono" onClick={() => go(-1)} aria-label="Previous">←</button>
        {C.map((x, idx) => (
          <button key={x.id} className={`lab-pill mono${idx === i ? ' on' : ''}`} style={{ '--acc': '#00e05a' }} onClick={() => setI(idx)}>
            <span className="lab-pill-n">{x.n}</span><span className="lab-pill-name">{x.name}</span>
          </button>
        ))}
        <button className="lab-arrow mono" onClick={() => go(1)} aria-label="Next">→</button>
      </div>
    </div>
  )
}

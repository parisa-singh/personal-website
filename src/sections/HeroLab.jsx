import { Component, Suspense, lazy, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const ConceptCanvas = lazy(() => import('../three/ConceptCanvas'))

const CONCEPTS = [
  { id: 'globe', n: '01', name: 'Holographic Globe', tag: 'orbiting debris · telemetry', blurb: 'A wireframe planet with satellites tracing tilted orbits. Precise, scientific, space-grade.', accent: '#38e8ff' },
  { id: 'flow', n: '02', name: 'Particle System', tag: 'cs + business · morphing', blurb: 'Particles form the things you do — code, growth, networks, your initials — and reshape between them. Move your cursor to stir and steer it.', accent: '#9dff4d' },
  { id: 'crystal', n: '03', name: 'Refractive Crystal', tag: 'glass · chromatic edges', blurb: 'A faceted glass shard refracting the nebula behind it, an ember burning at its core.', accent: '#ff5a3c' },
]

const SHAPES = [
  { id: 'code', label: '</> Code' },
  { id: 'chart', label: 'Growth' },
  { id: 'network', label: 'Network' },
  { id: 'initials', label: 'PS' },
]

const REACTS = [
  { id: 'swirl', label: 'Swirl' },
  { id: 'repel', label: 'Repel' },
  { id: 'gather', label: 'Gather' },
  { id: 'ripple', label: 'Ripple' },
  { id: 'spotlight', label: 'Spotlight' },
]

function OrbFallback() { return <div className="hero-orb-fallback" aria-hidden /> }
class Boundary extends Component {
  constructor(p) { super(p); this.state = { dead: false } }
  static getDerivedStateFromError() { return { dead: true } }
  render() { return this.state.dead ? <OrbFallback /> : this.props.children }
}

export default function HeroLab() {
  const [i, setI] = useState(1)
  const [shape, setShape] = useState('code')
  const [react, setReact] = useState('swirl')
  const c = CONCEPTS[i]
  const go = (d) => setI((p) => (p + d + CONCEPTS.length) % CONCEPTS.length)

  useEffect(() => {
    const k = (e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [])

  return (
    <section className="lab" id="top" style={{ '--acc': c.accent }}>
      <div className="lab-stage">
        <Boundary>
          <Suspense fallback={<OrbFallback />}>
            {/* key on concept only — changing shape morphs in place */}
            <ConceptCanvas key={c.id} concept={c.id} shape={shape} react={react} />
          </Suspense>
        </Boundary>
      </div>

      {/* minimal overlay */}
      <div className="lab-top">
        <span className="lab-brand">PS<span className="lab-brand-dot" /></span>
        <span className="lab-hint mono">concept lab · ← → to switch</span>
      </div>

      <div className="lab-caption">
        <AnimatePresence mode="wait">
          <motion.div key={c.id}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.3, 1] }}>
            <div className="lab-tag mono"><span className="lab-dot" /> {c.tag}</div>
            <h1 className="lab-name">{c.name}</h1>
            <p className="lab-blurb">{c.blurb}</p>
          </motion.div>
        </AnimatePresence>

        {c.id === 'flow' && (
          <>
            <div className="lab-shapes">
              <span className="lab-shapes-cap mono">shape</span>
              {SHAPES.map((sh) => (
                <button key={sh.id} className={`lab-shape mono${shape === sh.id ? ' on' : ''}`} onClick={() => setShape(sh.id)}>
                  {sh.label}
                </button>
              ))}
            </div>
            <div className="lab-shapes">
              <span className="lab-shapes-cap mono">cursor</span>
              {REACTS.map((r) => (
                <button key={r.id} className={`lab-shape mono${react === r.id ? ' on' : ''}`} onClick={() => setReact(r.id)}>
                  {r.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="lab-switch">
        <button className="lab-arrow mono" onClick={() => go(-1)} aria-label="Previous">←</button>
        {CONCEPTS.map((x, idx) => (
          <button key={x.id} className={`lab-pill mono${idx === i ? ' on' : ''}`} onClick={() => setI(idx)}
            style={{ '--acc': x.accent }}>
            <span className="lab-pill-n">{x.n}</span>
            <span className="lab-pill-name">{x.name}</span>
          </button>
        ))}
        <button className="lab-arrow mono" onClick={() => go(1)} aria-label="Next">→</button>
      </div>
    </section>
  )
}

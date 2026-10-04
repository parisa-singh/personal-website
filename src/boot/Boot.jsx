import { Component, Suspense, lazy, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MatrixRain from './MatrixRain'
import Typewriter from './Typewriter'

const ParticleCanvas = lazy(() => import('../three/ParticleCanvas'))

const GREEN_A = '#b7ff8a'
const GREEN_B = '#00e05a'

const LINES = [
  '> booting parisa.singh …',
  '> decrypting profile ▓▓▓▓▓▓▓▓ ok',
  '',
  ':: Hi — my name is Parisa Singh.',
  '> Computer Science × Business @ UMass Amherst.',
  ':: This is all I’m about!',
]

/* keep a WebGL hiccup from ever blocking the proceed flow */
class Safe extends Component {
  constructor(p) { super(p); this.state = { dead: false } }
  static getDerivedStateFromError() { return { dead: true } }
  render() { return this.state.dead ? <div className="boot-orb" aria-hidden /> : this.props.children }
}

export default function Boot({ onDone }) {
  const [stage, setStage] = useState('type')   // type → load → ready
  const [typed, setTyped] = useState(false)
  const [progress, setProgress] = useState(0)
  const [dots, setDots] = useState(1)

  // calm idle heartbeat once the terminal has finished (no busy loop)
  useEffect(() => {
    if (!typed) return
    const id = setInterval(() => setDots((d) => (d >= 3 ? 1 : d + 1)), 25000)
    return () => clearInterval(id)
  }, [typed])

  // keyboard: ENTER advances type→load and fires Proceed on ready
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Enter') return
      if (stage === 'type') setStage('load')
      else if (stage === 'ready') onDone?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [stage, onDone])

  // loading bar fills, then flips to the ready (button) state
  useEffect(() => {
    if (stage !== 'load') return
    let raf = 0, start = 0
    const dur = 2600
    const tick = (t) => {
      if (!start) start = t
      const p = Math.min(1, (t - start) / dur)
      setProgress(p)
      if (p < 1) raf = requestAnimationFrame(tick)
      else setStage('ready')
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [stage])

  const onCanvas = stage !== 'type'

  return (
    <motion.div className="boot" exit={{ opacity: 0, filter: 'blur(6px)' }} transition={{ duration: 0.5 }}>
      <MatrixRain />
      <div className="boot-scan" aria-hidden />
      <button className="boot-skip mono" onClick={() => onDone?.()}>skip ↵</button>

      {/* ---------- terminal stage ---------- */}
      <AnimatePresence>
        {stage === 'type' && (
          <motion.div className="boot-term" exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
            <div className="term-chrome">
              <span className="term-dot" /><span className="term-dot" /><span className="term-dot" />
              <span className="term-name mono">parisa@portfolio — zsh</span>
            </div>
            <Typewriter lines={LINES} onDone={() => setTyped(true)} />
            {typed && (
              <>
                <div className="term-line term-idle">{`> awaiting input${'.'.repeat(dots)}`}<span className="term-caret" /></div>
                <motion.button className="boot-enter mono"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
                  onClick={() => setStage('load')}>
                  <span className="boot-enter-key">▶ To proceed, hit ENTER</span>
                  <span className="boot-enter-hint">(or tap)</span>
                </motion.button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- particle stage ---------- */}
      {onCanvas && (
        <motion.div
          className="boot-canvas-wrap"
          initial={{ opacity: 0, scale: 1, y: 40 }}
          animate={stage === 'ready'
            ? { opacity: 1, scale: 0.55, y: '-16%' }
            : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Safe>
            <Suspense fallback={<div className="boot-orb" aria-hidden />}>
              <ParticleCanvas shape="code" react="swirl" colorA={GREEN_A} colorB={GREEN_B} />
            </Suspense>
          </Safe>
        </motion.div>
      )}

      {/* ---------- CTA: loading bar morphs into the Proceed button ---------- */}
      <AnimatePresence mode="popLayout">
        {stage === 'load' && (
          <motion.div className="boot-bar" layoutId="boot-cta" key="bar"
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="boot-bar-track"><div className="boot-bar-fill" style={{ width: `${progress * 100}%` }} /></div>
            <div className="boot-bar-meta mono">
              <span>compiling experience…</span>
              <span>{Math.round(progress * 100)}%</span>
            </div>
          </motion.div>
        )}
        {stage === 'ready' && (
          <motion.button className="boot-proceed mono" layoutId="boot-cta" key="btn"
            initial={{ opacity: 0.6 }} animate={{ opacity: 1 }}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => onDone?.()}>
            Proceed <span className="boot-proceed-ar">▶</span>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

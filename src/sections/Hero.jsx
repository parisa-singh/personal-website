import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Magnetic from '../fx/Magnetic'

const RESUME = 'https://drive.google.com/file/d/1lIrF5fA7tJJ1c-Dzn06On99H8tWSh_ta/view?usp=sharing'
const AVATAR = `${import.meta.env.BASE_URL}avatar.JPEG`
const FALLBACK = 'https://avatars.githubusercontent.com/parisa-singh'

// a display word revealed from behind a mask
function Word({ children, delay = 0, ready, className }) {
  return (
    <span className="mask">
      <motion.span
        className={className}
        initial={{ y: '115%' }}
        animate={ready ? { y: '0%' } : {}}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.3, 1], delay }}
        style={{ display: 'inline-block' }}
      >
        {children}
      </motion.span>
    </span>
  )
}

function LocalTime() {
  const [t, setT] = useState('')
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/New_York' }))
    f(); const id = setInterval(f, 1000 * 20); return () => clearInterval(id)
  }, [])
  return <span className="v">{t} ET</span>
}

export default function Hero({ ready }) {
  const ref = useRef(null)

  // cursor-follow spotlight (cheap: just CSS vars, no re-render)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    el.addEventListener('pointermove', onMove)
    return () => el.removeEventListener('pointermove', onMove)
  }, [])

  const jump = (id) => {
    const el = document.getElementById(id)
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -40 })
    else el?.scrollIntoView({ behavior: 'smooth' })
  }

  const fade = (delay) => ({
    initial: { opacity: 0, y: 16 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { delay, duration: 0.8, ease: [0.22, 1, 0.3, 1] },
  })

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-spot" aria-hidden />
      <span className="hero-rule v l" aria-hidden />
      <span className="hero-rule v r" aria-hidden />

      <div className="hero-inner">
        <div className="hero-main">
          <motion.p className="hero-eyebrow" {...fade(0.15)}>
            <span className="kdot" /> CS + Business · UMass Amherst ’28
          </motion.p>

          <h1 className="hero-title">
            <span className="hero-line"><Word ready={ready} delay={0.2}>Parisa</Word></span>
            <span className="hero-line">
              <Word ready={ready} delay={0.34} className="stroke">Singh</Word>
              <Word ready={ready} delay={0.46} className="dot">.</Word>
            </span>
          </h1>

          <motion.p className="hero-lede" {...fade(0.62)}>
            I build software that moves the business — across <em>engineering, AI, and product</em>,
            turning hard problems into things people actually want to use.
          </motion.p>

          <motion.div className="hero-cta" {...fade(0.74)}>
            <Magnetic>
              <button className="btn btn-solid" onClick={() => jump('work')}>
                See the work <span className="ar">→</span>
              </button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a className="btn btn-ghost" href={RESUME} target="_blank" rel="noopener noreferrer">Résumé ↗</a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.aside className="hero-side" {...fade(0.85)}>
          <div className="status-card">
            <div className="status-top">
              <img src={AVATAR} alt="Parisa Singh" onError={(e) => { e.currentTarget.src = FALLBACK }} />
              <div>
                <b>Parisa Singh</b>
                <span>Software · Product · AI</span>
              </div>
            </div>
            <div className="status-rows">
              <div className="status-row"><span className="k">Now</span><span className="v live">@ EyeZense</span></div>
              <div className="status-row"><span className="k">Based</span><span className="v">Amherst, MA</span></div>
              <div className="status-row"><span className="k">Local</span><LocalTime /></div>
              <div className="status-row"><span className="k">Status</span><span className="v">Open to roles</span></div>
            </div>
          </div>
        </motion.aside>
      </div>

      <button className="hero-scroll" onClick={() => jump('work')}>
        <span className="hero-scroll-line" /> scroll
      </button>
    </section>
  )
}

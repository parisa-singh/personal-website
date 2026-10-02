import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Magnetic from '../fx/Magnetic'
import Marquee from '../fx/Marquee'

const RESUME = 'https://drive.google.com/file/d/1lIrF5fA7tJJ1c-Dzn06On99H8tWSh_ta/view?usp=sharing'
const AVATAR = `${import.meta.env.BASE_URL}avatar.JPEG`
const FALLBACK = 'https://avatars.githubusercontent.com/parisa-singh'

const TICKER = ['Software Engineering', 'Product', 'AI / ML', 'UI / UX Design', 'Forward-Deployed', 'Leadership']

// one word, revealed by sliding up from behind a mask
function Word({ children, delay = 0, ready, className }) {
  return (
    <span className="mask">
      <motion.span
        className={className}
        initial={{ y: '110%' }}
        animate={ready ? { y: '0%' } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.3, 1], delay }}
        style={{ display: 'inline-block' }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function Hero({ ready }) {
  // subtle portrait parallax toward the cursor
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 120, damping: 20 })
  const sy = useSpring(py, { stiffness: 120, damping: 20 })
  useEffect(() => {
    const onMove = (e) => {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2
      px.set(((e.clientX - cx) / cx) * 14)
      py.set(((e.clientY - cy) / cy) * 14)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [px, py])

  const jump = (id) => {
    const el = document.getElementById(id)
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20 })
    else el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-left">
          <motion.p className="hero-kicker"
            initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 0.2, duration: 0.8 }}>
            <span className="kdash" /> Design-led engineer — UMass Amherst, ’28
          </motion.p>

          <h1 className="hero-title">
            <span className="hero-line"><Word ready={ready} delay={0.15}>Parisa</Word></span>
            <span className="hero-line">
              <Word ready={ready} delay={0.28} className="it">Singh</Word>
              <Word ready={ready} delay={0.42} className="ast">✦</Word>
            </span>
          </h1>

          <motion.p className="hero-lede"
            initial={{ opacity: 0, y: 14 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6, duration: 0.8 }}>
            I design &amp; build things that feel <em>intentional</em> — working across
            engineering, AI, and product to turn hard problems into experiences people love.
          </motion.p>

          <motion.div className="hero-cta"
            initial={{ opacity: 0, y: 14 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.72, duration: 0.8 }}>
            <Magnetic>
              <button className="btn btn-solid" data-cursor="view" onClick={() => jump('work')}>
                See the work <span className="ar">→</span>
              </button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a className="btn btn-ghost" data-cursor="open" href={RESUME} target="_blank" rel="noopener noreferrer">
                Résumé
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div className="hero-portrait"
          initial={{ opacity: 0, scale: 0.94 }} animate={ready ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.3, 1] }}>
          <motion.div className="portrait-frame" style={{ x: sx, y: sy }}>
            <div className="portrait-blob" aria-hidden />
            <img src={AVATAR} alt="Parisa Singh" onError={(e) => { e.currentTarget.src = FALLBACK }} />
            <span className="portrait-tag">currently @ EyeZense</span>
          </motion.div>
        </motion.div>
      </div>

      <Marquee items={TICKER} duration={32} className="hero-marquee" />
    </section>
  )
}

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Warm editorial curtain. A serif greeting reveals, a hairline draws, then
 * the panel lifts to show the hero. Shows once per tab (handled by App).
 */
export default function Intro({ onDone }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) { onDone?.(); return }
    const a = setTimeout(() => setLeaving(true), 1400)
    const b = setTimeout(() => onDone?.(), 1400 + 820)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [onDone])

  return (
    <motion.div
      className="intro"
      initial={{ y: 0 }}
      animate={leaving ? { y: '-100%' } : {}}
      transition={{ duration: 0.82, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="intro-inner">
        <span className="mask">
          <motion.span className="intro-word" initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.3, 1], delay: 0.1 }}>
            Hello —
          </motion.span>
        </span>
        <span className="mask">
          <motion.span className="intro-word it" initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.3, 1], delay: 0.26 }}>
            I’m Parisa.
          </motion.span>
        </span>
        <motion.span className="intro-rule" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.3, 1], delay: 0.5 }} />
      </div>
    </motion.div>
  )
}

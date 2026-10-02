/* eslint-disable react-hooks/set-state-in-effect */
// Effect subscribes to pointer events (an external system) and reflects them
// into state — the sanctioned use of setState inside an effect.
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Custom cursor: a precise dot + a lagging ring that springs behind it.
 * The ring swells and shows a label over elements marked [data-cursor].
 * Hidden on touch / coarse pointers (where it would be useless).
 */
export default function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 })

  const [active, setActive] = useState(false)
  const [label, setLabel] = useState('')
  const [down, setDown] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!window.matchMedia?.('(pointer: fine)').matches) return
    setEnabled(true)
    document.body.classList.add('has-cursor')

    const move = (e) => {
      x.set(e.clientX); y.set(e.clientY)
      const hit = e.target.closest?.('[data-cursor]')
      if (hit) { setActive(true); setLabel(hit.getAttribute('data-cursor') || '') }
      else { setActive(false); setLabel('') }
    }
    const dn = () => setDown(true)
    const up = () => setDown(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', dn)
    window.addEventListener('mouseup', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', dn)
      window.removeEventListener('mouseup', up)
      document.body.classList.remove('has-cursor')
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} animate={{ scale: down ? 0.6 : 1 }} transition={{ duration: 0.12 }} />
      <motion.div
        className={`cursor-ring${active ? ' is-active' : ''}`}
        style={{ x: ringX, y: ringY }}
        animate={{ scale: active ? 1.9 : down ? 0.8 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {label && <span className="cursor-label">{label}</span>}
      </motion.div>
    </>
  )
}

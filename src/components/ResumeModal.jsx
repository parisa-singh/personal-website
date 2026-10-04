import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { RESUMES } from '../data/links'

export default function ResumeModal({ onClose }) {
  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <motion.div className="rm-overlay" onClick={onClose}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
      <motion.div className="rm panel" role="dialog" aria-modal="true" aria-label="Choose a résumé" onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 18, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.3, 1] }}>
        <span className="panel-tick tl" aria-hidden /><span className="panel-tick br" aria-hidden />
        <button className="rm-close mono" onClick={onClose} aria-label="Close">✕</button>

        <div className="rm-head">
          <span className="rm-tag mono">CV.00 · RÉSUMÉ</span>
          <h2 className="rm-title">Pick the lens that fits</h2>
          <p className="rm-note">I tailor my résumé to the role — choose one to open it.</p>
        </div>

        <div className="rm-list">
          {RESUMES.map((r) => (
            <a key={r.key} className="rm-opt" href={r.href} target="_blank" rel="noopener noreferrer" onClick={onClose}>
              <span className="rm-opt-key mono">{r.key}</span>
              <span className="rm-opt-body">
                <span className="rm-opt-label">{r.label}</span>
                <span className="rm-opt-sub">{r.sub}</span>
              </span>
              <span className="rm-opt-arr">↗</span>
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const NAV = [
  { to: '/', label: 'Overview', end: true },
  { to: '/work', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/writing', label: 'Writing' },
]

export default function CommandBar({ onReplay, onResume }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 10)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])

  return (
    <header className={`cbar${scrolled ? ' is-scrolled' : ''}`}>
      <div className="cbar-left">
        <button className="cbar-power" onClick={onReplay} aria-label="Replay the intro" title="Replay the intro">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 3.5 L12 11.5" />
            <path d="M7 6.6 A7 7 0 1 0 17 6.6" />
          </svg>
        </button>
        <NavLink to="/" className="cbar-brand" onClick={() => setOpen(false)}>
          <span className="cbar-brand-mark" /> PARISA<span className="cbar-brand-sep">/</span>SINGH
        </NavLink>
      </div>

      <nav className={`cbar-nav${open ? ' open' : ''}`}>
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end} className="cbar-link mono" onClick={() => setOpen(false)}>
            {n.label}
          </NavLink>
        ))}
        <button className="cbar-link cbar-resume mono" onClick={() => { setOpen(false); onResume?.() }}>Résumé</button>
      </nav>

      <div className="cbar-right">
        <span className="cbar-status mono"><span className="cbar-status-dot" /> internships &amp; opportunities</span>
        <button className="cbar-burger" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}

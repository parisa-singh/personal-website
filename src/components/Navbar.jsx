import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTheme } from '../hooks/useTheme'

const NAV_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/articles', label: 'Writing' },
]

function ThemeToggle({ theme, toggle }) {
  const isDark = theme === 'dark'
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        width: '38px', height: '38px', borderRadius: '3px',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: 'transparent', border: '1px solid var(--line)', color: 'var(--ink)',
        cursor: 'pointer', flexShrink: 0, transition: 'border-color 0.2s, color 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--ink)' }}
    >
      {isDark ? (
        <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      )}
    </button>
  )
}

const linkStyle = ({ isActive }) => ({
  fontSize: '14.5px',
  fontWeight: 500,
  color: isActive ? 'var(--accent)' : 'var(--ink-2)',
  paddingBottom: '3px',
  borderBottom: `1.5px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
  transition: 'color 0.2s, border-color 0.2s',
})

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'color-mix(in srgb, var(--bg) 85%, transparent)',
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`,
      transition: 'border-color 0.3s',
    }}>
      <div style={{
        maxWidth: '940px', margin: '0 auto', padding: '0 clamp(22px, 6vw, 40px)',
        height: '66px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
      }}>
        <NavLink to="/about" style={{
          fontFamily: 'var(--display)', fontWeight: 500, fontSize: '20px',
          letterSpacing: '-0.5px', color: 'var(--ink)',
        }}>
          Parisa Singh
        </NavLink>

        {/* Desktop links */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '26px' }}>
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} style={linkStyle}>{label}</NavLink>
          ))}
          <ThemeToggle theme={theme} toggle={toggle} />
        </div>

        {/* Mobile controls */}
        <div className="mobile-controls" style={{ display: 'none', alignItems: 'center', gap: '10px' }}>
          <ThemeToggle theme={theme} toggle={toggle} />
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle navigation menu" aria-expanded={menuOpen}
            style={{
              width: '38px', height: '38px', borderRadius: '3px',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: 'transparent', border: '1px solid var(--line)', color: 'var(--ink)', cursor: 'pointer',
            }}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
              {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={{
          borderTop: '1px solid var(--line)', background: 'var(--bg)',
          padding: '6px clamp(22px, 6vw, 40px) 18px',
        }}>
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                display: 'block', padding: '13px 0', fontFamily: 'var(--display)', fontSize: '18px', fontWeight: 500,
                borderBottom: '1px solid var(--line-soft)',
                color: isActive ? 'var(--accent)' : 'var(--ink)',
              })}>
              {label}
            </NavLink>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 760px) {
          .desktop-nav { display: none !important; }
          .mobile-controls { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}

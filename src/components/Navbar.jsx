import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTheme } from '../hooks/useTheme'

const NAV_LINKS = [
  { to: '/about',      num: '01', label: 'About' },
  { to: '/experience', num: '02', label: 'Experience' },
  { to: '/projects',   num: '03', label: 'Projects' },
  { to: '/skills',     num: '04', label: 'Skills' },
  { to: '/articles',   num: '05', label: 'Articles' },
]

function ThemeToggle({ theme, toggle }) {
  const isDark = theme === 'dark'
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        width: '40px', height: '40px', borderRadius: '10px',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--accent-tint-soft)',
        border: '1px solid var(--border)',
        color: 'var(--accent-contrast)',
        cursor: 'pointer', flexShrink: 0,
        transition: 'background 0.2s, border-color 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-tint)'; e.currentTarget.style.borderColor = 'var(--accent-border)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent-tint-soft)'; e.currentTarget.style.borderColor = 'var(--border)' }}
    >
      {isDark ? (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      )}
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: scrolled ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
      transition: 'background 0.3s',
    }}>
      <div style={{
        maxWidth: '1180px',
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 40px)',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
      }}>

        {/* Brand */}
        <NavLink to="/about" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '10px',
            border: '1.5px solid var(--accent-border-strong)',
            background: 'var(--accent-tint)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '14px',
            color: 'var(--accent-contrast)', letterSpacing: '0.5px', flexShrink: 0,
          }}>
            PS
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '17px',
              color: 'var(--text)', letterSpacing: '-0.4px', lineHeight: 1.1,
            }}>
              Parisa Singh
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '10.5px',
              color: 'var(--text-dim)', letterSpacing: '1.2px', marginTop: '2px', fontWeight: 500,
            }}>
              CS · UMass Amherst
            </div>
          </div>
        </NavLink>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }} className="desktop-nav">
          {NAV_LINKS.map(({ to, num, label }) => (
            <NavLink key={to} to={to} style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <div
                  style={{
                    padding: '9px 14px', display: 'flex', alignItems: 'center', gap: '7px',
                    borderRadius: '9px',
                    background: isActive ? 'var(--accent-tint)' : 'transparent',
                    transition: 'background 0.2s', position: 'relative', cursor: 'pointer',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--accent-tint-soft)' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                >
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '10.5px',
                    color: isActive ? 'var(--accent-contrast)' : 'var(--text-faint)',
                    fontWeight: 500, transition: 'color 0.2s',
                  }}>
                    {num}
                  </span>
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: '14.5px',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--text)' : 'var(--text-dim)',
                    transition: 'color 0.2s', letterSpacing: '-0.1px',
                  }}>
                    {label}
                  </span>
                </div>
              )}
            </NavLink>
          ))}
          <div style={{ width: '1px', height: '24px', background: 'var(--border)', margin: '0 8px' }} />
          <ThemeToggle theme={theme} toggle={toggle} />
        </div>

        {/* Mobile controls */}
        <div style={{ display: 'none', alignItems: 'center', gap: '8px' }} className="mobile-controls">
          <ThemeToggle theme={theme} toggle={toggle} />
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            style={{
              width: '40px', height: '40px', borderRadius: '10px',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--accent-tint-soft)', border: '1px solid var(--border)',
              color: 'var(--text-dim)', cursor: 'pointer',
            }}
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          borderTop: '1px solid var(--border)',
          background: 'var(--nav-bg-scrolled)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '8px clamp(20px, 5vw, 40px) 20px',
        }}>
          {NAV_LINKS.map(({ to, num, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 0',
                textDecoration: 'none',
                borderBottom: '1px solid var(--border)',
                color: isActive ? 'var(--accent-contrast)' : 'var(--text-dim)',
              })}
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}>{num}</span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '17px', fontWeight: 500 }}>{label}</span>
            </NavLink>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-controls { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}

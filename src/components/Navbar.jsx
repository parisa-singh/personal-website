import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { to: '/about',      num: '01', label: 'About' },
  { to: '/experience', num: '02', label: 'Experience' },
  { to: '/projects',   num: '03', label: 'Projects' },
  { to: '/skills',     num: '04', label: 'Skills' },
  { to: '/articles',   num: '05', label: 'Articles' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
      background: scrolled ? 'rgba(7,8,15,0.95)' : 'rgba(7,8,15,0.8)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      transition: 'background 0.3s',
    }}>
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0 32px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* Brand */}
        <NavLink to="/about" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '1.5px solid rgba(129,140,248,0.5)',
            background: 'rgba(129,140,248,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: '14px',
            color: '#818cf8',
            letterSpacing: '0.5px',
            flexShrink: 0,
            transition: 'background 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(129,140,248,0.15)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(129,140,248,0.25)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(129,140,248,0.08)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            PS
          </div>
          <div>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '18px',
              color: '#e8eaf2',
              letterSpacing: '-0.4px',
              lineHeight: 1.1,
            }}>
              Parisa Singh
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: '#5b6899',
              letterSpacing: '1.5px',
              marginTop: '2px',
              fontWeight: 500,
            }}>
              Class of &#39;28
            </div>
          </div>
        </NavLink>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-nav">
          {NAV_LINKS.map(({ to, num, label }) => (
            <NavLink key={to} to={to} style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <div
                  style={{
                    padding: '10px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '7px',
                    borderRadius: '10px',
                    background: isActive ? 'rgba(129,140,248,0.08)' : 'transparent',
                    transition: 'background 0.2s',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                >
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    color: isActive ? '#818cf8' : '#3d4663',
                    fontWeight: 500,
                    transition: 'color 0.2s',
                  }}>
                    {num}
                  </span>
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '15px',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#e8eaf2' : '#6b7595',
                    transition: 'color 0.2s',
                    letterSpacing: '-0.1px',
                  }}>
                    {label}
                  </span>
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      bottom: '5px',
                      left: '18px',
                      right: '18px',
                      height: '2px',
                      borderRadius: '1px',
                      background: 'linear-gradient(90deg, #6366f1, #818cf8)',
                    }} />
                  )}
                </div>
              )}
            </NavLink>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="mobile-menu-btn"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#6b7595',
            cursor: 'pointer',
            padding: '4px',
          }}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            {menuOpen
              ? <path d="M18 6L6 18M6 6l12 12" />
              : <path d="M3 12h18M3 6h18M3 18h18" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(7,8,15,0.98)',
          padding: '12px 32px 24px',
        }}>
          {NAV_LINKS.map(({ to, num, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 0',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                color: isActive ? '#818cf8' : '#6b7595',
              })}
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}>{num}</span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '17px' }}>{label}</span>
            </NavLink>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  )
}

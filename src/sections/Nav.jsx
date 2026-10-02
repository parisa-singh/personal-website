import { useEffect, useState } from 'react'
import ThemeToggle from '../components/ThemeToggle'

const LINKS = [
  { id: 'work', label: 'work' },
  { id: 'path', label: 'path' },
  { id: 'toolkit', label: 'toolkit' },
  { id: 'words', label: 'words' },
  { id: 'contact', label: 'contact' },
]

export default function Nav({ theme, toggle }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const jump = (id) => {
    const el = document.getElementById(id)
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -40 })
    else el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <button className="nav-brand" onClick={() => jump('top')} data-cursor="top">
        PS<span className="nav-brand-dot" />
      </button>
      <div className="nav-links">
        {LINKS.map((l) => (
          <button key={l.id} className="nav-link" onClick={() => jump(l.id)}>
            <span>{l.label}</span>
          </button>
        ))}
        <ThemeToggle theme={theme} toggle={toggle} />
      </div>
    </nav>
  )
}

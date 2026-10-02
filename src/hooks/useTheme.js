import { useState, useEffect, useCallback } from 'react'

const THEME_COLOR = { light: '#f4ecdd', dark: '#1a140d' }

function getInitialTheme() {
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.getAttribute('data-theme')
    if (attr === 'light' || attr === 'dark') return attr
  }
  return 'light'
}

/**
 * Single source of truth for the color theme.
 * Reads the pre-paint value the inline <head> script set (no flash),
 * persists changes, and keeps the mobile browser-chrome color in sync.
 */
export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('theme', theme) } catch { /* private mode */ }
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', THEME_COLOR[theme])
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}

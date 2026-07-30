import { useState, useEffect, useCallback } from 'react'

const THEME_EVENT = 'themechange'

function getInitialTheme() {
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.getAttribute('data-theme')
    if (attr === 'light' || attr === 'dark') return attr
  }
  return 'dark'
}

/**
 * Single source of truth for the color theme.
 * - Reads the pre-paint value the inline <head> script set (no flash).
 * - Persists the choice and fires a `themechange` event so the canvas
 *   background can re-read its colors.
 */
export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('theme', theme) } catch { /* private mode */ }
    // keep the mobile browser chrome color in sync
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f5f6fb' : '#07080f')
    window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: theme }))
  }, [theme])

  const toggle = useCallback(() => {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}

/** Read the live particle colors (as `r,g,b` strings) from CSS variables. */
export function readParticleColors() {
  const s = getComputedStyle(document.documentElement)
  const get = (name, fallback) => (s.getPropertyValue(name).trim() || fallback)
  return {
    a: get('--particle-a', '129,140,248'),
    b: get('--particle-b', '99,102,241'),
    c: get('--particle-c', '167,139,250'),
    line: get('--particle-line', '129,140,248'),
  }
}

export { THEME_EVENT }

import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Buttery smooth scrolling (Lenis). Disabled for reduced-motion users so the
 * page scrolls natively. Exposes the instance on window.__lenis for anchor jumps.
 */
export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, lerp: 0.1 })
    window.__lenis = lenis
    let raf = 0
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)

    return () => { cancelAnimationFrame(raf); lenis.destroy(); delete window.__lenis }
  }, [enabled])
}

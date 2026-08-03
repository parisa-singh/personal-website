import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

/**
 * When the URL carries `?highlight=<value>`, find the element marked
 * `data-hl="<value>"`, scroll it into view, and pulse a sonar-style
 * echoing halo around it for a few seconds. Used for cross-page "click
 * here → land there highlighted" navigation (e.g. a skill chip on About →
 * that skill on Skills).
 *
 * The echoing rings are drawn by a `.halo-fx` overlay injected into the
 * target (rather than a CSS pseudo-element) so the effect is identical on
 * every target regardless of the pseudo-elements it already uses.
 *
 * @param ready pass a value that becomes true once the target content has
 * rendered (e.g. after live data loads), so the query can resolve it.
 */
export function useHighlight(ready = true) {
  const [params] = useSearchParams()
  useEffect(() => {
    const hl = params.get('highlight')
    if (!hl || !ready) return
    let target = null
    let fx = null
    let fade, remove
    const cleanupFx = () => {
      if (fx) { fx.remove(); fx = null }
      if (target) target.classList.remove('halo', 'halo-out')
    }
    const t = setTimeout(() => {
      // Compare data-hl directly — robust for labels with spaces/slashes/arrows.
      let el = null
      document.querySelectorAll('[data-hl]').forEach((node) => {
        if (node.getAttribute('data-hl') === hl) el = node
      })
      if (!el) return
      target = el
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.add('halo')
      // Inject the echoing-rings overlay (three staggered rings). It is
      // absolutely positioned (out of flow) so it never disturbs the
      // target's grid/flex layout.
      fx = document.createElement('div')
      fx.className = 'halo-fx'
      fx.setAttribute('aria-hidden', 'true')
      fx.innerHTML = '<span></span><span></span><span></span>'
      el.appendChild(fx)
      // Hold the echo, then add `halo-out` to trigger the CSS opacity
      // fade, then strip the overlay + classes once the fade (0.9s) ends.
      fade = setTimeout(() => {
        el.classList.add('halo-out')
        remove = setTimeout(cleanupFx, 950)
      }, 2800)
    }, 320)
    return () => {
      clearTimeout(t)
      clearTimeout(fade)
      clearTimeout(remove)
      cleanupFx()
    }
  }, [params, ready])
}

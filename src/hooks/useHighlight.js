import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

/**
 * When the URL carries `?highlight=<value>`, find the element marked
 * `data-hl="<value>"`, scroll it into view, and pulse a halo around it for
 * a few seconds. Used for cross-page "click here → land there highlighted"
 * navigation (e.g. a skill chip on About → that skill on Skills).
 *
 * @param ready pass a value that becomes true once the target content has
 * rendered (e.g. after live data loads), so the query can resolve it.
 */
export function useHighlight(ready = true) {
  const [params] = useSearchParams()
  useEffect(() => {
    const hl = params.get('highlight')
    if (!hl || !ready) return
    const t = setTimeout(() => {
      // Compare data-hl directly — robust for labels with spaces/slashes/arrows.
      let el = null
      document.querySelectorAll('[data-hl]').forEach((node) => {
        if (node.getAttribute('data-hl') === hl) el = node
      })
      if (!el) return
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.add('halo')
      setTimeout(() => el.classList.remove('halo'), 3200)
    }, 320)
    return () => clearTimeout(t)
  }, [params, ready])
}

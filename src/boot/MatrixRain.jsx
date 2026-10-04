import { useRef, useEffect } from 'react'

/* Classic Matrix digital rain on a throttled 2D canvas (cheap). */
const GLYPHS = 'アイウエオカキクケコサシスセソタチツテトﾊﾋﾌﾍﾎ0123456789<>/{}[]=;:$#+*'

export default function MatrixRain({ opacity = 0.22 }) {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf = 0, cols = 0, drops = [], w = 0, h = 0
    const font = 15
    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
      cols = Math.ceil(w / font)
      drops = Array.from({ length: cols }, () => (Math.random() * -h) / font)
    }
    resize()
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    let last = 0
    const draw = (t) => {
      raf = requestAnimationFrame(draw)
      if (t - last < 45) return
      last = t
      ctx.fillStyle = 'rgba(0,7,2,0.16)'
      ctx.fillRect(0, 0, w, h)
      ctx.font = `${font}px "JetBrains Mono", monospace`
      for (let i = 0; i < cols; i++) {
        const ch = GLYPHS[(Math.random() * GLYPHS.length) | 0]
        const y = drops[i] * font
        ctx.fillStyle = Math.random() > 0.97 ? '#d6ffde' : '#00ff6a'
        ctx.fillText(ch, i * font, y)
        if (y > h && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
    }
    if (!reduced) raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="matrix-rain" style={{ opacity }} aria-hidden />
}

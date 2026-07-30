import { useEffect, useRef } from 'react'
import { readParticleColors, THEME_EVENT } from '../hooks/useTheme'

/**
 * One calm, shared background for every page. Slow-drifting particles with
 * soft connecting lines and a gentle response to the cursor.
 *
 * - Theme-aware: reads its colors from CSS variables and re-reads on toggle.
 * - Respects `prefers-reduced-motion`: paints a single static frame, no loop.
 * - Density scales down on small screens for performance.
 *
 * The optional `variant` prop nudges density/behaviour so each page still
 * feels a little distinct without a bespoke canvas per page.
 */
const VARIANTS = {
  about:      { density: 0.9, connect: 130, speed: 0.18, glow: 0.28 },
  experience: { density: 1.0, connect: 120, speed: 0.14, glow: 0.22 },
  projects:   { density: 1.1, connect: 140, speed: 0.16, glow: 0.30 },
  skills:     { density: 0.85, connect: 115, speed: 0.15, glow: 0.26 },
  articles:   { density: 0.8, connect: 125, speed: 0.13, glow: 0.24 },
}

export default function Background({ variant = 'about' }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const cfg = VARIANTS[variant] || VARIANTS.about
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let colors = readParticleColors()
    let particles = []
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const particleCount = () => {
      const area = canvas.clientWidth * canvas.clientHeight
      const base = Math.round(area / 22000) * cfg.density
      const cap = window.innerWidth < 700 ? 34 : 70
      return Math.max(14, Math.min(cap, base))
    }

    const palette = () => {
      const r = Math.random()
      if (r > 0.6) return colors.a
      if (r > 0.3) return colors.b
      return colors.c
    }

    const mkParticle = () => ({
      x: Math.random() * canvas.clientWidth,
      y: Math.random() * canvas.clientHeight,
      vx: (Math.random() - 0.5) * cfg.speed,
      vy: (Math.random() - 0.5) * cfg.speed,
      r: Math.random() < 0.75 ? Math.random() * 1.3 + 0.8 : Math.random() * 2 + 1.8,
      alpha: Math.random() * 0.35 + 0.25,
      rgb: palette(),
      glow: Math.random() > 0.72,
    })

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = Array.from({ length: particleCount() }, mkParticle)
    }

    const render = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const p of particles) {
        if (!reduce) {
          // gentle drift + soft pull toward the cursor
          const dx = mx - p.x
          const dy = my - p.y
          const d = Math.hypot(dx, dy)
          if (d < 200 && d > 0) {
            const f = ((200 - d) / 200) * 0.015
            p.vx += (dx / d) * f
            p.vy += (dy / d) * f
          }
          p.vx = Math.max(-0.6, Math.min(0.6, p.vx))
          p.vy = Math.max(-0.6, Math.min(0.6, p.vy))
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0) p.x = w
          if (p.x > w) p.x = 0
          if (p.y < 0) p.y = h
          if (p.y > h) p.y = 0
        }

        if (p.glow) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6)
          g.addColorStop(0, `rgba(${p.rgb}, ${cfg.glow})`)
          g.addColorStop(1, `rgba(${p.rgb}, 0)`)
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.rgb}, ${p.alpha})`
        ctx.fill()
      }

      // connecting lines (cheap: particle count is capped low)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < cfg.connect) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${colors.line}, ${(1 - d / cfg.connect) * 0.16})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      if (!reduce) rafRef.current = requestAnimationFrame(render)
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onThemeChange = () => {
      colors = readParticleColors()
      particles = particles.map(p => ({ ...p, rgb: palette() }))
      if (reduce) render() // static mode has no loop, so repaint once
    }

    resize()
    render()
    document.addEventListener('mousemove', onMove)
    window.addEventListener('resize', resize)
    window.addEventListener(THEME_EVENT, onThemeChange)

    return () => {
      cancelAnimationFrame(rafRef.current)
      document.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      window.removeEventListener(THEME_EVENT, onThemeChange)
    }
  }, [variant])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  )
}

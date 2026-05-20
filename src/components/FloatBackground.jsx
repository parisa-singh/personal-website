import { useEffect, useRef } from 'react'

const COUNT = 80
const REPEL_RADIUS = 180

export default function FloatBackground() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let particles = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const mkParticle = () => ({
      x: Math.random() * (canvas.width || 800),
      y: Math.random() * (canvas.height || 600),
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      r: Math.random() * 3 + 2,
      color: Math.random() > 0.45 ? '#818cf8' : '#6366f1',
      alpha: Math.random() * 0.5 + 0.35,
      trail: [],
    })

    const init = () => {
      resize()
      particles = Array.from({ length: COUNT }, mkParticle)
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(7, 8, 15, 0.2)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const p of particles) {
        const dx = p.x - mx
        const dy = p.y - my
        const d = Math.hypot(dx, dy)

        if (d < REPEL_RADIUS && d > 0) {
          const force = ((REPEL_RADIUS - d) / REPEL_RADIUS) * 1.6
          p.vx += (dx / d) * force * 0.13
          p.vy += (dy / d) * force * 0.13
        }

        p.vx *= 0.97
        p.vy *= 0.97
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        p.trail.push({ x: p.x, y: p.y })
        if (p.trail.length > 20) p.trail.shift()

        for (let i = 1; i < p.trail.length; i++) {
          ctx.beginPath()
          ctx.moveTo(p.trail[i - 1].x, p.trail[i - 1].y)
          ctx.lineTo(p.trail[i].x, p.trail[i].y)
          ctx.strokeStyle = p.color
          ctx.globalAlpha = (i / p.trail.length) * p.alpha * 0.6
          ctx.lineWidth = p.r * (i / p.trail.length)
          ctx.lineCap = 'round'
          ctx.stroke()
          ctx.globalAlpha = 1
        }

        // Glow
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3)
        g.addColorStop(0, p.color)
        g.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.globalAlpha = p.alpha * 0.3
        ctx.fill()
        ctx.globalAlpha = 1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
        ctx.globalAlpha = 1
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    document.addEventListener('mousemove', onMove)
    window.addEventListener('resize', resize)
    init()
    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      document.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
    />
  )
}

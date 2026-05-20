import { useEffect, useRef } from 'react'

const STAR_COUNT = 260
const ATTRACT_RADIUS = 220
const CONNECT_DIST = 130

export default function StarsBackground() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let stars = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const mkStar = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() < 0.55 ? 1.2 : Math.random() < 0.82 ? 2.2 : 3.8,
      alpha: Math.random() * 0.4 + 0.55,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.008 + Math.random() * 0.02,
      glow: Math.random() > 0.7,
      color: (() => {
        const r = Math.random()
        if (r > 0.6) return '#ffffff'
        if (r > 0.3) return '#818cf8'
        return '#6366f1'
      })(),
    })

    const init = () => {
      resize()
      stars = Array.from({ length: STAR_COUNT }, mkStar)
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const s of stars) {
        const dx = mx - s.x
        const dy = my - s.y
        const d = Math.hypot(dx, dy)

        if (d < ATTRACT_RADIUS && d > 0) {
          const force = ((ATTRACT_RADIUS - d) / ATTRACT_RADIUS) * 0.45
          s.x += (dx / d) * force
          s.y += (dy / d) * force
        } else {
          s.x += s.vx
          s.y += s.vy
        }

        if (s.x < 0) s.x = canvas.width
        if (s.x > canvas.width) s.x = 0
        if (s.y < 0) s.y = canvas.height
        if (s.y > canvas.height) s.y = 0

        s.twinkle += s.twinkleSpeed
        const a = s.alpha * (0.6 + 0.4 * Math.sin(s.twinkle))

        if (s.glow) {
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 7)
          g.addColorStop(0, s.color)
          g.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r * 7, 0, Math.PI * 2)
          ctx.fillStyle = g
          ctx.globalAlpha = a * 0.45
          ctx.fill()
          ctx.globalAlpha = 1
        }

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = s.color
        ctx.globalAlpha = a
        ctx.fill()
        ctx.globalAlpha = 1
      }

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x
          const dy = stars[i].y - stars[j].y
          const d = Math.hypot(dx, dy)
          if (d < CONNECT_DIST) {
            ctx.beginPath()
            ctx.moveTo(stars[i].x, stars[i].y)
            ctx.lineTo(stars[j].x, stars[j].y)
            ctx.strokeStyle = '#818cf8'
            ctx.globalAlpha = (1 - d / CONNECT_DIST) * 0.55
            ctx.lineWidth = 0.7
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
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

import { useEffect, useRef } from 'react'

const COUNT = 30

export default function BokehBackground() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let bubbles = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const mkBubble = () => ({
      x: Math.random() * (canvas.width || 800),
      y: Math.random() * (canvas.height || 600) + (canvas.height || 600),
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.35 + 0.1),
      r: Math.random() * 70 + 30,
      alpha: Math.random() * 0.15 + 0.08,
      color: (() => {
        const p = Math.random()
        if (p > 0.55) return '#ff3b30'
        if (p > 0.25) return '#ff6b30'
        return '#ff8b50'
      })(),
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.006 + Math.random() * 0.01,
    })

    const init = () => {
      resize()
      bubbles = Array.from({ length: COUNT }, () => {
        const b = mkBubble()
        b.y = Math.random() * canvas.height
        return b
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const b of bubbles) {
        const dx = b.x - mx
        const dy = b.y - my
        const d = Math.hypot(dx, dy)
        if (d < 240 && d > 0) {
          const force = ((240 - d) / 240) * 0.7
          b.vx += (dx / d) * force * 0.09
          b.vy += (dy / d) * force * 0.09
        }

        b.vx *= 0.98
        b.vy *= 0.99
        b.x += b.vx
        b.y += b.vy

        if (b.y + b.r < 0) {
          Object.assign(b, mkBubble())
        }
        if (b.x < -b.r * 2) b.x = canvas.width + b.r
        if (b.x > canvas.width + b.r * 2) b.x = -b.r

        b.pulse += b.pulseSpeed
        const scaleR = b.r * (1 + 0.1 * Math.sin(b.pulse))

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, scaleR)
        grad.addColorStop(0, b.color)
        grad.addColorStop(0.4, b.color)
        grad.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.arc(b.x, b.y, scaleR, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.globalAlpha = b.alpha
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

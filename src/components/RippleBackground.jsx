import { useEffect, useRef } from 'react'

const SPACING = 30

export default function RippleBackground() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef(null)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let dots = []

    const buildGrid = () => {
      dots = []
      const cols = Math.ceil(canvas.width / SPACING) + 2
      const rows = Math.ceil(canvas.height / SPACING) + 2
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({ bx: c * SPACING, by: r * SPACING })
        }
      }
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      buildGrid()
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      timeRef.current += 0.03
      const t = timeRef.current
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const dot of dots) {
        const dx = dot.bx - mx
        const dy = dot.by - my
        const d = Math.hypot(dx, dy)
        const proximity = Math.max(0, 1 - d / 260)
        const wave = Math.sin(d * 0.042 - t * 3.2) * proximity

        const r = Math.max(0.8, 1.8 + wave * 7 + proximity * 6)
        const alpha = 0.1 + proximity * 0.7 + Math.abs(wave) * 0.35

        ctx.beginPath()
        ctx.arc(dot.bx, dot.by, r, 0, Math.PI * 2)

        if (proximity > 0.15) {
          const g = ctx.createRadialGradient(dot.bx, dot.by, 0, dot.bx, dot.by, r * 2)
          g.addColorStop(0, '#ff3b30')
          g.addColorStop(1, 'rgba(255,59,48,0)')
          ctx.fillStyle = g
        } else {
          ctx.fillStyle = '#2a0e08'
        }

        ctx.globalAlpha = Math.min(0.95, alpha)
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
    resize()
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

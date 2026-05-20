import { useEffect, useRef } from 'react'

const COLS = 14
const ROWS = 9

export default function CircuitBackground() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let nodes = []
    let edges = []
    let packets = []

    const buildGrid = () => {
      nodes = []
      edges = []
      packets = []

      const gx = canvas.width / COLS
      const gy = canvas.height / ROWS
      const W = COLS + 1

      for (let r = 0; r <= ROWS; r++) {
        for (let c = 0; c <= COLS; c++) {
          nodes.push({
            x: c * gx + (Math.random() - 0.5) * 6,
            y: r * gy + (Math.random() - 0.5) * 6,
            glow: 0,
            hub: Math.random() > 0.82,
          })
        }
      }

      for (let r = 0; r <= ROWS; r++) {
        for (let c = 0; c <= COLS; c++) {
          const idx = r * W + c
          if (c < COLS && Math.random() > 0.28) edges.push({ a: idx, b: idx + 1 })
          if (r < ROWS && Math.random() > 0.28) edges.push({ a: idx, b: idx + W })
        }
      }

      for (let i = 0; i < 16; i++) spawnPacket()
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      buildGrid()
    }

    const spawnPacket = () => {
      if (!edges.length) return
      const edge = edges[Math.floor(Math.random() * edges.length)]
      packets.push({
        edge,
        progress: Math.random(),
        speed: 0.0025 + Math.random() * 0.004,
        forward: Math.random() > 0.5,
        color: Math.random() > 0.38 ? '#ff3b30' : '#ff7040',
        size: Math.random() * 1.4 + 1.4,
        alpha: 0.65 + Math.random() * 0.35,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const n of nodes) {
        n.glow = Math.max(0, n.glow - 0.018)
        const d = Math.hypot(n.x - mx, n.y - my)
        if (d < 130) n.glow = Math.min(1, n.glow + (1 - d / 130) * 0.18)
      }

      // Edges
      for (const e of edges) {
        const a = nodes[e.a], b = nodes[e.b]
        const boost = (a.glow + b.glow) / 2
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = `rgba(90,22,12,${0.3 + boost * 0.45})`
        ctx.lineWidth = 0.7 + boost * 0.8
        ctx.stroke()
      }

      // Packets
      const next = []
      for (const p of packets) {
        p.progress += p.speed * (p.forward ? 1 : -1)

        if (p.progress >= 1) {
          nodes[p.edge.b].glow = Math.min(1, nodes[p.edge.b].glow + 0.85)
          if (Math.random() > 0.45) { p.forward = false } else { spawnPacket(); continue }
        } else if (p.progress <= 0) {
          nodes[p.edge.a].glow = Math.min(1, nodes[p.edge.a].glow + 0.85)
          if (Math.random() > 0.45) { p.forward = true } else { spawnPacket(); continue }
        }

        next.push(p)
        const t = Math.max(0, Math.min(1, p.progress))
        const a = nodes[p.edge.a], b = nodes[p.edge.b]
        const px = a.x + (b.x - a.x) * t
        const py = a.y + (b.y - a.y) * t

        // Trail
        for (let i = 1; i <= 10; i++) {
          const tt = Math.max(0, Math.min(1, t - (p.forward ? 1 : -1) * i * 0.014))
          const tx = a.x + (b.x - a.x) * tt
          const ty = a.y + (b.y - a.y) * tt
          ctx.beginPath()
          ctx.arc(tx, ty, p.size * (1 - i / 10) * 0.65, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.globalAlpha = p.alpha * (1 - i / 10) * 0.45
          ctx.fill()
          ctx.globalAlpha = 1
        }

        // Glow halo
        const g = ctx.createRadialGradient(px, py, 0, px, py, p.size * 5)
        g.addColorStop(0, p.color)
        g.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(px, py, p.size * 5, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.globalAlpha = p.alpha * 0.35
        ctx.fill()
        ctx.globalAlpha = 1

        // Core dot
        ctx.beginPath()
        ctx.arc(px, py, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
        ctx.globalAlpha = 1
      }
      packets = next

      if (packets.length < 20 && Math.random() > 0.96) spawnPacket()

      // Nodes
      for (const n of nodes) {
        const r = n.hub ? 3.5 : 2
        if (n.glow > 0.08) {
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r + n.glow * 12)
          g.addColorStop(0, `rgba(255,59,48,${n.glow * 0.55})`)
          g.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(n.x, n.y, r + n.glow * 12, 0, Math.PI * 2)
          ctx.fillStyle = g
          ctx.fill()
        }
        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle = n.glow > 0.25 ? '#ff3b30' : `rgba(130,40,20,${0.45 + n.glow * 0.55})`
        ctx.globalAlpha = 0.65 + n.glow * 0.35
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

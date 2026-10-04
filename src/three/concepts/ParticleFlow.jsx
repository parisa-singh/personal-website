import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* CONCEPT 02 — Particle organism, themed to the profile: CS + Business.
   Particles morph between meaningful forms — code </>, a growth chart,
   a network graph, and the initials "PS". The cursor steers the whole
   body to face it and stirs the particles with a soft, wide swirl.
   Acid-green → magenta, additive glow. */

const COUNT_DESK = 7000
const COUNT_MOB = 3000
const SPAN = 3.4          // world size the forms fill
const DEPTH = 0.32        // z-thickness given to flat (sampled) forms

/* sample white pixels of a 2D drawing into `count` target points */
function sampleDraw(draw, count, size = 240) {
  const cv = document.createElement('canvas')
  cv.width = cv.height = size
  const ctx = cv.getContext('2d')
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, size, size)
  ctx.fillStyle = '#fff'; ctx.strokeStyle = '#fff'; ctx.lineJoin = 'round'; ctx.lineCap = 'round'
  draw(ctx, size)
  const data = ctx.getImageData(0, 0, size, size).data
  const hits = []
  for (let y = 0; y < size; y += 2)
    for (let x = 0; x < size; x += 2)
      if (data[(y * size + x) * 4] > 128) hits.push(x, y)
  const n = hits.length / 2 || 1
  const out = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const h = ((Math.random() * n) | 0) * 2
    out[i * 3] = ((hits[h] / size) - 0.5) * SPAN
    out[i * 3 + 1] = -((hits[h + 1] / size) - 0.5) * SPAN
    out[i * 3 + 2] = (Math.random() - 0.5) * DEPTH
  }
  return out
}

const DRAW = {
  code: (ctx, s) => {
    ctx.font = `bold ${s * 0.4}px "JetBrains Mono", ui-monospace, monospace`
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText('</>', s / 2, s * 0.52)
  },
  chart: (ctx, s) => {
    // ascending bars
    const n = 5, bw = s * 0.09, gap = s * 0.055
    const totalW = n * bw + (n - 1) * gap
    let x = (s - totalW) / 2
    const baseY = s * 0.82
    for (let i = 0; i < n; i++) {
      const h = s * (0.12 + i * 0.13)
      ctx.fillRect(x, baseY - h, bw, h)
      x += bw + gap
    }
    // upward trend arrow
    ctx.lineWidth = s * 0.03
    ctx.beginPath()
    ctx.moveTo(s * 0.16, s * 0.52)
    ctx.lineTo(s * 0.4, s * 0.4)
    ctx.lineTo(s * 0.58, s * 0.48)
    ctx.lineTo(s * 0.85, s * 0.2)
    ctx.stroke()
    // arrowhead
    ctx.beginPath()
    ctx.moveTo(s * 0.85, s * 0.2); ctx.lineTo(s * 0.72, s * 0.2)
    ctx.moveTo(s * 0.85, s * 0.2); ctx.lineTo(s * 0.85, s * 0.33)
    ctx.stroke()
  },
  network: (ctx, s) => {
    const nodes = [
      [0.5, 0.18], [0.2, 0.42], [0.8, 0.4], [0.32, 0.74],
      [0.68, 0.76], [0.5, 0.52], [0.12, 0.72], [0.88, 0.68],
    ].map(([a, b]) => [a * s, b * s])
    const edges = [[0, 1], [0, 2], [0, 5], [1, 5], [2, 5], [5, 3], [5, 4], [1, 6], [2, 7], [3, 4]]
    ctx.lineWidth = s * 0.012
    edges.forEach(([a, b]) => { ctx.beginPath(); ctx.moveTo(...nodes[a]); ctx.lineTo(...nodes[b]); ctx.stroke() })
    nodes.forEach(([x, y], i) => { ctx.beginPath(); ctx.arc(x, y, s * (i === 0 || i === 5 ? 0.05 : 0.035), 0, 7); ctx.fill() })
  },
  initials: (ctx, s) => {
    ctx.font = `700 ${s * 0.52}px "Fraunces", Georgia, serif`
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText('PS', s / 2, s * 0.54)
  },
}

export default function ParticleFlow({ reduced, mobile, pointer, shape = 'code', react = 'swirl', colorA = '#9dff4d', colorB = '#ff3d9b' }) {
  const ref = useRef(null)
  const count = mobile ? COUNT_MOB : COUNT_DESK

  const { positions, colors, baseColors, targets } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const targets = {}
    for (const name of Object.keys(DRAW)) targets[name] = sampleDraw(DRAW[name], count)
    const cA = new THREE.Color(colorA), cB = new THREE.Color(colorB), tmp = new THREE.Color()
    const start = targets.code
    for (let i = 0; i < count; i++) {
      positions[i * 3] = start[i * 3]; positions[i * 3 + 1] = start[i * 3 + 1]; positions[i * 3 + 2] = start[i * 3 + 2]
      tmp.copy(cA).lerp(cB, i / count)
      colors[i * 3] = tmp.r; colors[i * 3 + 1] = tmp.g; colors[i * 3 + 2] = tmp.b
    }
    const baseColors = colors.slice()
    return { positions, colors, baseColors, targets }
  }, [count, colorA, colorB])

  const target = useRef(targets[shape] || targets.code)
  useEffect(() => { target.current = targets[shape] || targets.code }, [shape, targets])

  const baseRef = useRef(baseColors)
  useEffect(() => { baseRef.current = baseColors }, [baseColors])
  const colorDirty = useRef(false)

  useFrame((state) => {
    const pts = ref.current
    if (!pts) return
    const t = state.clock.elapsedTime * (reduced ? 0.2 : 1)
    const arr = pts.geometry.attributes.position.array
    const tgt = target.current
    const ease = reduced ? 0.06 : 0.09
    const mode = react

    // cursor in the form's plane (world units) → reactivity lands under the pointer
    const cx = pointer.current.x * state.viewport.width / 2
    const cy = pointer.current.y * state.viewport.height / 2
    const K = 1.1, on = !reduced

    for (let i = 0; i < count; i++) {
      const ix = i * 3, iy = ix + 1, iz = ix + 2
      let tx = tgt[ix], ty = tgt[iy]
      const tz = tgt[iz]
      if (on && mode !== 'spotlight') {
        const dx = tx - cx, dy = ty - cy
        const d2 = dx * dx + dy * dy
        if (mode === 'swirl') {
          const f = Math.exp(-d2 * K)
          tx += (dx * 0.4 - dy * 0.8) * f; ty += (dy * 0.4 + dx * 0.8) * f
        } else if (mode === 'repel') {
          const f = Math.exp(-d2 * K)
          tx += dx * 0.9 * f; ty += dy * 0.9 * f
        } else if (mode === 'gather') {
          const f = Math.exp(-d2 * K)
          tx -= dx * 0.55 * f; ty -= dy * 0.55 * f
        } else if (mode === 'ripple') {
          const dist = Math.sqrt(d2) + 1e-3
          const w = Math.sin(dist * 5 - t * 5) * Math.exp(-d2 * 0.4) * 0.4
          tx += (dx / dist) * w; ty += (dy / dist) * w
        }
      }
      arr[ix] += (tx - arr[ix]) * ease
      arr[iy] += (ty - arr[iy]) * ease
      arr[iz] += (tz - arr[iz]) * ease
    }
    pts.geometry.attributes.position.needsUpdate = true

    // spotlight: flare particles near the cursor (no shape distortion)
    const cAttr = pts.geometry.attributes.color
    const cArr = cAttr.array
    const base = baseRef.current
    if (on && mode === 'spotlight') {
      for (let i = 0; i < count; i++) {
        const ix = i * 3
        const dx = arr[ix] - cx, dy = arr[ix + 1] - cy
        const f = 1 + Math.exp(-(dx * dx + dy * dy) * 1.3) * 2.2
        cArr[ix] = Math.min(1, base[ix] * f)
        cArr[ix + 1] = Math.min(1, base[ix + 1] * f)
        cArr[ix + 2] = Math.min(1, base[ix + 2] * f)
      }
      cAttr.needsUpdate = true
      colorDirty.current = true
    } else if (colorDirty.current) {
      cArr.set(base); cAttr.needsUpdate = true; colorDirty.current = false
    }

    // the whole body steers to face the cursor (gentle), with a hint of drift
    pts.rotation.y += ((pointer.current.x * 0.6) - pts.rotation.y) * 0.06 + (reduced ? 0 : 0.0006)
    pts.rotation.x += ((-pointer.current.y * 0.4) - pts.rotation.x) * 0.06
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={mobile ? 0.032 : 0.026}
        vertexColors transparent opacity={0.96} depthWrite={false}
        blending={THREE.AdditiveBlending} sizeAttenuation
      />
    </points>
  )
}

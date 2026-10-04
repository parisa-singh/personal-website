import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Torus, Icosahedron, Float } from '@react-three/drei'
import * as THREE from 'three'

/* CONCEPT 01 — Holographic globe + orbiting debris.
   Pure "space": wireframe planet, fresnel rim, tilted orbit rings,
   satellites/debris tracing them. Electric cyan, precise, techy. */

const ACC = '#38e8ff'

function Debris({ radius, speed, tilt, size, offset }) {
  const g = useRef(null)
  useFrame((s) => {
    if (g.current) g.current.rotation.y = s.clock.elapsedTime * speed + offset
  })
  return (
    <group ref={g} rotation={[tilt, 0, 0]}>
      <group position={[radius, 0, 0]}>
        <Icosahedron args={[size, 0]}>
          <meshStandardMaterial color={ACC} emissive={ACC} emissiveIntensity={2} roughness={0.3} />
        </Icosahedron>
      </group>
    </group>
  )
}

export default function Globe({ reduced, pointer }) {
  const root = useRef(null)
  const dots = useMemo(() => {
    // surface points for a "data" shimmer across the globe
    const arr = []
    for (let i = 0; i < 260; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / 260)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      arr.push([
        1.42 * Math.sin(phi) * Math.cos(theta),
        1.42 * Math.cos(phi),
        1.42 * Math.sin(phi) * Math.sin(theta),
      ])
    }
    return arr
  }, [])

  useFrame((s, delta) => {
    const r = root.current
    if (!r) return
    r.rotation.y += delta * (reduced ? 0.04 : 0.12)
    r.rotation.x += (pointer.current.y * 0.3 - r.rotation.x) * 0.05
    r.rotation.z = pointer.current.x * 0.08
  })

  return (
    <group ref={root}>
      {/* wireframe planet */}
      <Sphere args={[1.4, 40, 40]}>
        <meshBasicMaterial color={ACC} wireframe transparent opacity={0.18} />
      </Sphere>
      {/* solid dark core so the far side doesn't show through */}
      <Sphere args={[1.33, 48, 48]}>
        <meshStandardMaterial color="#04141c" roughness={0.6} metalness={0.4} />
      </Sphere>
      {/* fresnel rim glow */}
      <Sphere args={[1.5, 48, 48]}>
        <meshBasicMaterial color={ACC} transparent opacity={0.08} side={THREE.BackSide} />
      </Sphere>
      {/* surface data points */}
      <group>
        {dots.map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[0.012, 6, 6]} />
            <meshBasicMaterial color={i % 7 === 0 ? '#ffffff' : ACC} />
          </mesh>
        ))}
      </group>
      {/* orbit rings */}
      {[[1.95, 0.35], [2.25, -0.5], [2.6, 0.15]].map(([rad, tilt], i) => (
        <Torus key={i} args={[rad, 0.004, 8, 120]} rotation={[Math.PI / 2 + tilt, 0, tilt]}>
          <meshBasicMaterial color={ACC} transparent opacity={0.3} />
        </Torus>
      ))}
      {/* debris tracing orbits */}
      <Float speed={reduced ? 0 : 1} floatIntensity={0.4}>
        <Debris radius={1.95} speed={0.6} tilt={0.35} size={0.06} offset={0} />
        <Debris radius={2.25} speed={-0.42} tilt={-0.5} size={0.08} offset={2} />
        <Debris radius={2.6} speed={0.3} tilt={0.15} size={0.05} offset={4} />
        <Debris radius={1.95} speed={0.6} tilt={0.35} size={0.045} offset={3.3} />
      </Float>
    </group>
  )
}

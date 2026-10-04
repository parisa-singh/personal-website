import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Icosahedron, MeshDistortMaterial, Sparkles,
  Environment, Lightformer, Float,
} from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

/* ------------------------------------------------------------------
   The centerpiece: a liquid-metal organic blob (biotech) wrapped in a
   techy wireframe shell, lit by coloured area-lights so its chrome
   surface reflects aqua + violet — reads as iridescent. Reacts to the
   cursor (parallax tilt) and to page scroll (slow drift + squash).
------------------------------------------------------------------- */

function useScrollNorm() {
  const s = useRef(0)
  useEffect(() => {
    const f = () => { s.current = (window.scrollY || 0) / (window.innerHeight || 1) }
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  return s
}

function Blob({ reduced }) {
  const group = useRef(null)
  const scroll = useScrollNorm()

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    // cursor parallax tilt (state.pointer is normalised -1..1)
    const targetX = -state.pointer.y * 0.35 + Math.sin(t * 0.3) * 0.05
    const targetY = state.pointer.x * 0.5
    g.rotation.x += (targetX - g.rotation.x) * (reduced ? 0.02 : 0.06)
    g.rotation.y += (targetY + t * 0.08 - g.rotation.y % (Math.PI * 2)) * 0.02 + delta * 0.08
    // scroll drift + gentle squash as you leave the hero
    const sc = Math.max(0, 1 - scroll.current * 0.25)
    g.scale.setScalar(sc)
    g.position.y = -scroll.current * 0.6
  })

  return (
    <group ref={group}>
      {/* organic liquid-metal core */}
      <Icosahedron args={[1.35, 64]}>
        <MeshDistortMaterial
          color="#0b2a33"
          roughness={0.08}
          metalness={0.92}
          distort={reduced ? 0.12 : 0.42}
          speed={reduced ? 0.6 : 1.9}
          envMapIntensity={1.6}
        />
      </Icosahedron>
      {/* techy wireframe shell */}
      <Icosahedron args={[1.95, 3]}>
        <meshBasicMaterial color="#4df0d0" wireframe transparent opacity={0.14} />
      </Icosahedron>
      {/* inner violet ghost shell */}
      <Icosahedron args={[1.66, 2]}>
        <meshBasicMaterial color="#8b7bff" wireframe transparent opacity={0.08} />
      </Icosahedron>
    </group>
  )
}

function Scene({ reduced, mobile }) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <Float speed={reduced ? 0 : 1.1} rotationIntensity={reduced ? 0 : 0.35} floatIntensity={reduced ? 0 : 0.6}>
        <Blob reduced={reduced} />
      </Float>

      {!reduced && (
        <Sparkles count={mobile ? 40 : 90} scale={[8, 8, 4]} size={2.2} speed={0.3} color="#8fe9ff" opacity={0.7} />
      )}

      {/* coloured area-lights = the iridescent reflections on the chrome blob */}
      <Environment resolution={256}>
        <Lightformer form="circle" intensity={3.5} color="#4df0d0" position={[3, 2, 4]} scale={6} />
        <Lightformer form="circle" intensity={3} color="#8b7bff" position={[-4, -1, 3]} scale={6} />
        <Lightformer form="rect" intensity={1.2} color="#ffffff" position={[0, 4, -3]} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={1.5} color="#ff6b4a" position={[-2, -4, 2]} scale={4} />
      </Environment>

      {!reduced && !mobile && (
        <EffectComposer>
          <Bloom intensity={0.7} luminanceThreshold={0.25} luminanceSmoothing={0.3} mipmapBlur />
        </EffectComposer>
      )}
    </>
  )
}

export default function HeroCanvas() {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 760)
  const reduced = typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const f = () => setMobile(window.innerWidth < 760)
    window.addEventListener('resize', f)
    return () => window.removeEventListener('resize', f)
  }, [])

  return (
    <Canvas
      className="hero-canvas"
      dpr={[1, mobile ? 1.4 : 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 5], fov: 42 }}
      frameloop={reduced ? 'demand' : 'always'}
    >
      <Scene reduced={reduced} mobile={mobile} />
    </Canvas>
  )
}

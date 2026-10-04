import { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import ParticleFlow from './concepts/ParticleFlow'

/* Lean, particle-only canvas (no image-based lighting / env map — far
   lighter than the concept lab). Used by the Matrix boot sequence. */
export default function ParticleCanvas({ shape = 'code', react = 'swirl', colorA, colorB, bloom = true }) {
  const pointer = useRef({ x: 0, y: 0 })
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 760)
  const reduced = typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    const onResize = () => setMobile(window.innerWidth < 760)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', onResize)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <Canvas
      className="particle-canvas"
      dpr={[1, mobile ? 1.4 : 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 5], fov: 42 }}
      frameloop="always"
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      style={{ background: 'transparent' }}
    >
      <ParticleFlow reduced={reduced} mobile={mobile} pointer={pointer}
        shape={shape} react={react} colorA={colorA} colorB={colorB} />
      {bloom && !mobile && !reduced && (
        <EffectComposer>
          <Bloom intensity={0.85} luminanceThreshold={0.08} luminanceSmoothing={0.3} mipmapBlur />
        </EffectComposer>
      )}
    </Canvas>
  )
}

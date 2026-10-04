import { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

import Globe from './concepts/Globe'
import ParticleFlow from './concepts/ParticleFlow'
import Crystal from './concepts/Crystal'

/* Hosts whichever centerpiece concept is selected. Shared cursor
   tracking (window-level, so it works over the overlaid text too),
   with lighting + post-processing tuned per concept. */

export default function ConceptCanvas({ concept, shape, react }) {
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

  const isCrystal = concept === 'crystal'

  return (
    <Canvas
      className="concept-canvas"
      dpr={[1, mobile ? 1.4 : 1.9]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, isCrystal ? 4.4 : 5], fov: 42 }}
      frameloop={reduced && concept !== 'flow' ? 'demand' : 'always'}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 5, 5]} intensity={40} />
      <pointLight position={[-5, -3, 2]} intensity={25} color="#7cc7ff" />

      {concept === 'globe' && <Globe reduced={reduced} pointer={pointer} />}
      {concept === 'flow' && <ParticleFlow reduced={reduced} mobile={mobile} pointer={pointer} shape={shape} react={react} />}
      {isCrystal && <Crystal reduced={reduced} pointer={pointer} />}

      {/* refraction/reflection environment (matters most for the crystal) */}
      <Environment resolution={isCrystal ? 256 : 128}>
        <Lightformer form="circle" intensity={isCrystal ? 4 : 2.2} color="#38e8ff" position={[3, 2, 4]} scale={6} />
        <Lightformer form="circle" intensity={2.6} color="#9dff4d" position={[-4, -1, 3]} scale={5} />
        <Lightformer form="rect" intensity={2} color="#ff3d9b" position={[-2, -4, 2]} scale={5} />
        <Lightformer form="rect" intensity={1.4} color="#ffffff" position={[0, 4, -3]} scale={[8, 2, 1]} />
      </Environment>

      {!reduced && !mobile && (
        <EffectComposer>
          <Bloom
            intensity={concept === 'flow' ? 1.1 : 0.8}
            luminanceThreshold={concept === 'flow' ? 0.1 : 0.3}
            luminanceSmoothing={0.3}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </Canvas>
  )
}

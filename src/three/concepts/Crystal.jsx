import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, Float, Icosahedron } from '@react-three/drei'

/* CONCEPT 03 — Refractive glass crystal.
   Glossy & edgy: a faceted glass shard that refracts the nebula behind
   it, with chromatic-aberration edges and an emissive core ember.
   Premium, sharp, dramatic. */

export default function Crystal({ reduced, pointer }) {
  const root = useRef(null)
  const core = useRef(null)

  useFrame((s, delta) => {
    const r = root.current
    if (!r) return
    r.rotation.y += delta * (reduced ? 0.06 : 0.18)
    r.rotation.x += (pointer.current.y * 0.4 - r.rotation.x) * 0.05
    r.rotation.z = pointer.current.x * 0.12
    if (core.current) {
      const p = 1 + Math.sin(s.clock.elapsedTime * 2) * 0.06
      core.current.scale.setScalar(p)
    }
  })

  return (
    <Float speed={reduced ? 0 : 1.2} rotationIntensity={reduced ? 0 : 0.4} floatIntensity={reduced ? 0 : 0.7}>
      <group ref={root}>
        {/* faceted glass shard */}
        <Icosahedron args={[1.5, 0]}>
          <MeshTransmissionMaterial
            samples={reduced ? 4 : 8}
            thickness={1.1}
            roughness={0.04}
            ior={1.5}
            chromaticAberration={0.6}
            anisotropy={0.3}
            distortion={0.3}
            distortionScale={0.4}
            temporalDistortion={0.2}
            color="#dff3ff"
            attenuationColor="#7cc7ff"
            attenuationDistance={2.4}
          />
        </Icosahedron>
        {/* emissive ember core seen through the glass */}
        <Icosahedron ref={core} args={[0.55, 0]}>
          <meshStandardMaterial color="#ff5a3c" emissive="#ff5a3c" emissiveIntensity={3} toneMapped={false} />
        </Icosahedron>
        {/* sharp edge wireframe for the chromatic rim */}
        <Icosahedron args={[1.505, 0]}>
          <meshBasicMaterial color="#9ad8ff" wireframe transparent opacity={0.25} />
        </Icosahedron>
      </group>
    </Float>
  )
}

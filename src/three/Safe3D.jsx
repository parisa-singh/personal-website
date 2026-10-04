import { Component, Suspense, lazy } from 'react'

const HeroCanvas = lazy(() => import('./HeroCanvas'))

/* Fallback orb for no-WebGL / errors / while the scene loads. */
function OrbFallback() {
  return <div className="hero-orb-fallback" aria-hidden />
}

class Boundary extends Component {
  constructor(props) { super(props); this.state = { dead: false } }
  static getDerivedStateFromError() { return { dead: true } }
  componentDidCatch(err) { if (import.meta.env.DEV) console.warn('3D scene disabled:', err) }
  render() { return this.state.dead ? <OrbFallback /> : this.props.children }
}

/* Mounts the WebGL hero, but never lets it break the page. */
export default function Safe3D() {
  return (
    <Boundary>
      <Suspense fallback={<OrbFallback />}>
        <HeroCanvas />
      </Suspense>
    </Boundary>
  )
}

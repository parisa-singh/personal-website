import { useMemo, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { curateRepos } from '../data/projects'
import { prettyName } from '../data/links'
import Reveal from '../fx/Reveal'
import SectionLabel from '../components/SectionLabel'

function TiltCard({ repo, index }) {
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 220, damping: 18 })
  const ry = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 220, damping: 18 })
  const gx = useTransform(mx, [0, 1], ['0%', '100%'])
  const gy = useTransform(my, [0, 1], ['0%', '100%'])

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const reset = () => { mx.set(0.5); my.set(0.5) }

  const title = repo.title || prettyName(repo.name)
  const desc = repo.descOverride || repo.description || 'A project with a live, deployed site.'

  return (
    <Reveal i={index % 3} className="work-cell">
      <motion.article
        ref={ref}
        className="tcard"
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
        data-cursor="explore"
      >
        <motion.div
          className="tcard-glow"
          style={{ background: useTransform([gx, gy], ([x, y]) => `radial-gradient(240px circle at ${x} ${y}, color-mix(in srgb, var(--accent) 26%, transparent), transparent 60%)`) }}
        />
        <div className="tcard-head">
          <span className="tcard-idx mono">{String(index + 1).padStart(2, '0')}</span>
          {repo.language && <span className="tcard-lang mono">{repo.language}</span>}
        </div>
        <h3 className="tcard-title">{title}</h3>
        <p className="tcard-desc">{desc}</p>
        <div className="tcard-actions">
          {repo.html_url && <a className="tlink" href={repo.html_url} target="_blank" rel="noopener noreferrer" data-cursor="code">Code</a>}
          {repo.homepage && <a className="tlink tlink-accent" href={repo.homepage} target="_blank" rel="noopener noreferrer" data-cursor="open">Live ↗</a>}
        </div>
      </motion.article>
    </Reveal>
  )
}

export default function Work({ repos, loading }) {
  const projects = useMemo(() => curateRepos(repos), [repos])

  return (
    <section className="block" id="work">
      <SectionLabel n="01" title="Selected work" note="Pulled live from GitHub — every one has a site you can open." />
      {loading && !projects.length ? (
        <div className="work-grid">
          {[0, 1, 2].map((i) => <div className="tcard sk-card" key={i}><div className="sk" style={{ height: 120 }} /></div>)}
        </div>
      ) : (
        <div className="work-grid">
          {projects.map((repo, i) => <TiltCard key={repo.id} repo={repo} index={i} />)}
        </div>
      )}
    </section>
  )
}

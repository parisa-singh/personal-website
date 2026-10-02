import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { EXPERIENCE, LINKEDIN } from '../data/experience'
import Reveal from '../fx/Reveal'
import SectionLabel from '../components/SectionLabel'

const ordered = [...EXPERIENCE].sort(
  (a, b) => (a.current === b.current ? 0 : a.current ? -1 : 1) || b.start.localeCompare(a.start)
)

export default function Path() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const h = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="block" id="path">
      <SectionLabel n="02" title="The path so far" note="Internships, work, and the teams I help lead." />
      <div className="path" ref={ref}>
        <div className="path-rail"><motion.div className="path-rail-fill" style={{ height: h }} /></div>
        {ordered.map((e, i) => (
          <Reveal className="path-row" key={e.role + e.org} i={i % 3}>
            <span className={`path-dot${e.current ? ' current' : ''}`} />
            <div className="path-when mono">{e.period}</div>
            <div className="path-main">
              <div className="path-role">
                {e.role}
                {e.current && <span className="path-live mono">● live</span>}
              </div>
              <div className="path-org">{e.org}</div>
              <p className="path-desc">{e.desc}</p>
              <a className="tlink tlink-accent" href={LINKEDIN} target="_blank" rel="noopener noreferrer" data-cursor="open">
                LinkedIn ↗
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

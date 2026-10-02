import { motion } from 'framer-motion'
import { TOOLS, FOCUS, STRENGTHS } from '../data/skills'
import Reveal from '../fx/Reveal'
import SectionLabel from '../components/SectionLabel'

function Meter({ level }) {
  return (
    <span className="meter" aria-label={`${level} of 5`}>
      <motion.span
        className="meter-fill"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: level / 5 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.3, 1] }}
      />
    </span>
  )
}

function Group({ group, i }) {
  return (
    <Reveal className="tk-group" i={i}>
      <span className="tk-cap mono">{group.cap}</span>
      {group.items.map((it) => (
        <div className="tk-row" key={it.label}>
          <span className="tk-name">{it.label}</span>
          <Meter level={it.level} />
        </div>
      ))}
    </Reveal>
  )
}

export default function Toolkit() {
  return (
    <section className="block" id="toolkit">
      <SectionLabel n="03" title="Toolkit" note="Languages, tools, and the areas I build in." />
      <div className="tool-logos">
        {TOOLS.items.map((it, i) => (
          <Reveal className="tool-chip" key={it.label} i={i % 4} data-cursor="">
            <img src={it.icon} alt="" onError={(e) => { e.currentTarget.style.visibility = 'hidden' }} />
            <span>{it.label}</span>
          </Reveal>
        ))}
      </div>
      <div className="tk-cols">
        <Group group={FOCUS} i={0} />
        <Group group={STRENGTHS} i={1} />
      </div>
    </section>
  )
}

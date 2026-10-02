import Reveal from '../fx/Reveal'

/** Editorial section header: index, title, optional note. */
export default function SectionLabel({ n, title, note }) {
  return (
    <div className="slabel">
      <Reveal className="slabel-n" as="div" i={0}>({n})</Reveal>
      <Reveal as="h2" className="slabel-title" i={1}>{title}</Reveal>
      {note && <Reveal as="p" className="slabel-note" i={2}>{note}</Reveal>}
    </div>
  )
}

import Reveal from '../fx/Reveal'
import SectionLabel from '../components/SectionLabel'

const SUBSTACK = 'https://creativecompiler77.substack.com'
const fmt = (s) => { const d = new Date(s); return isNaN(d) ? '' : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) }

export default function Words({ articles, loading }) {
  const items = articles.slice(0, 5)
  return (
    <section className="block" id="words">
      <SectionLabel n="04" title="Words" note="Essays on tech, student life & literature — on Substack." />
      {loading && !items.length ? (
        <div className="words-list">
          {[0, 1, 2].map((i) => <div className="word-row" key={i}><div className="sk" style={{ height: 24, width: '60%' }} /></div>)}
        </div>
      ) : items.length ? (
        <div className="words-list">
          {items.map((a, i) => (
            <Reveal as="a" className="word-row" key={a.guid || i} i={i % 3}
              href={a.link} target="_blank" rel="noopener noreferrer" data-cursor="read">
              <span className="word-date mono">{fmt(a.pubDate)}</span>
              <span className="word-title">{a.title}</span>
              <span className="word-arrow">↗</span>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal><a className="btn btn-ghost" href={SUBSTACK} target="_blank" rel="noopener noreferrer" data-cursor="open">Read on Substack ↗</a></Reveal>
      )}
    </section>
  )
}

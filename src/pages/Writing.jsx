import PageHead from '../components/PageHead'
import Panel from '../components/Panel'
import { LINKS } from '../data/links'

const fmt = (s) => { const d = new Date(s); return isNaN(d) ? '' : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }

export default function Writing({ articles = [], loading }) {
  return (
    <div className="page">
      <PageHead tag="WR.01 · WRITING" title="Words"
        note="Essays on tech, student life & literature — published on Substack." />

      {loading && !articles.length ? (
        <div className="article-grid">
          {[0, 1, 2].map((i) => <div className="panel article-card" key={i}><div className="sk" style={{ height: 70 }} /></div>)}
        </div>
      ) : articles.length ? (
        <>
          <div className="article-grid">
            {articles.map((a, i) => (
              <a key={a.guid || i} className="article-card-link" href={a.link} target="_blank" rel="noopener noreferrer">
                <Panel as="article" tag={String(i + 1).padStart(2, '0')} label="ESSAY" className="article-card">
                  <span className="article-date mono">{fmt(a.pubDate)}</span>
                  <h2 className="article-title">{a.title}</h2>
                  <span className="article-read mono">Read on Substack ↗</span>
                </Panel>
              </a>
            ))}
          </div>
          <a className="deck-btn ghost mono article-all" href={LINKS.substack} target="_blank" rel="noopener noreferrer">All posts on Substack ↗</a>
        </>
      ) : (
        <a className="deck-btn mono" href={LINKS.substack} target="_blank" rel="noopener noreferrer">Read on Substack ↗</a>
      )}
    </div>
  )
}

import { useSubstackFeed } from '../hooks/useSubstackFeed'
import { useReveal } from '../hooks/useReveal'

const SUBSTACK_URL = 'https://creativecompiler77.substack.com'

function formatDate(dateStr) {
  const d = new Date(dateStr)
  if (isNaN(d)) return ''
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function SubstackMark() {
  return (
    <svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  )
}

function ArticleCard({ article, delay }) {
  const desc = article.description ? article.description.replace(/<[^>]+>/g, '').trim() : ''
  const thumb = article.thumbnail
  return (
    <a className="article-card reveal" href={article.link} target="_blank" rel="noopener noreferrer" style={{ transitionDelay: `${delay}ms` }}>
      {thumb ? (
        <div className="thumb">
          <img src={thumb} alt="" loading="lazy" onError={(e) => { e.target.parentElement.style.display = 'none' }} />
        </div>
      ) : (
        <div className="noimg"><SubstackMark /></div>
      )}
      <div className="body">
        <div className="a-date">{formatDate(article.pubDate)}</div>
        <div className="a-title">{article.title}</div>
        {desc && <div className="a-desc line-clamp-3">{desc}</div>}
        <div className="a-read">Read on Substack ↗</div>
      </div>
    </a>
  )
}

export default function Articles() {
  const { articles, loading, error } = useSubstackFeed()
  useReveal([loading, articles.length])

  return (
    <section className="page">
      <div className="container">
        <div className="page-head" style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}>
          <p className="kicker">Writing</p>
          <p className="lede" style={{ maxWidth: '560px' }}>
            Essays on tech, student life &amp; literature — on{' '}
            <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>Substack</a>.
          </p>
        </div>

        {loading && (
          <div className="article-grid">
            {[0, 1, 2, 3].map((i) => (
              <div className="article-card" key={i}>
                <div className="sk" style={{ height: '168px', borderRadius: 0 }} />
                <div className="body">
                  <div className="sk" style={{ height: '11px', width: '40%' }} />
                  <div className="sk" style={{ height: '18px', width: '80%' }} />
                  <div className="sk" style={{ height: '12px', width: '95%' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && articles.length > 0 && (
          <div className="article-grid">
            {articles.map((a, i) => <ArticleCard key={a.guid || i} article={a} delay={i * 45} />)}
          </div>
        )}

        {!loading && articles.length === 0 && (
          <div style={{ padding: '40px 0' }}>
            <p style={{ color: 'var(--mut)', fontSize: '15px', marginBottom: '20px' }}>
              {error ? "Couldn't reach the live feed right now — everything's on Substack." : 'New essays coming soon.'}
            </p>
            <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="btn btn-solid">Read on Substack</a>
          </div>
        )}
      </div>
    </section>
  )
}

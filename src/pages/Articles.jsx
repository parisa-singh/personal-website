import { useSubstackFeed } from '../hooks/useSubstackFeed'
import Background from '../components/Background'

const SUBSTACK_URL = 'https://creativecompiler77.substack.com'

function formatDate(dateStr) {
  const d = new Date(dateStr)
  if (isNaN(d)) return ''
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function SkeletonCard() {
  return (
    <div style={{
      borderRadius: '16px', overflow: 'hidden',
      background: 'var(--surface-2)', border: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ height: '160px', background: 'var(--border-strong)' }} />
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {[60, 85, 45].map((w, i) => (
          <div key={i} style={{ height: '12px', width: `${w}%`, borderRadius: '4px', background: 'var(--border-strong)' }} />
        ))}
      </div>
    </div>
  )
}

function ArticleCard({ article }) {
  const thumb = article.thumbnail
  return (
    <a href={article.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <div
        style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '16px', overflow: 'hidden',
          display: 'flex', flexDirection: 'column', height: '100%',
          transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'var(--accent-border-strong)'
          e.currentTarget.style.boxShadow = '0 16px 40px var(--accent-glow)'
          e.currentTarget.style.transform = 'translateY(-4px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        {thumb ? (
          <div style={{ height: '160px', overflow: 'hidden', flexShrink: 0 }}>
            <img src={thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={e => { e.target.parentElement.style.display = 'none' }} />
          </div>
        ) : (
          <div style={{
            height: '80px', flexShrink: 0,
            background: 'var(--accent-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="26" height="26" fill="var(--accent-contrast)" viewBox="0 0 24 24">
              <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
            </svg>
          </div>
        )}

        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '9px', flex: 1 }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--text-faint)', letterSpacing: '0.5px' }}>
            {formatDate(article.pubDate)}
          </p>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '17px', fontWeight: 600, color: 'var(--text)', lineHeight: 1.35 }}>
            {article.title}
          </h3>
          {article.description && (
            <p className="line-clamp-3" style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              {article.description.replace(/<[^>]+>/g, '').trim()}
            </p>
          )}
          <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
            <span style={{ fontSize: '13px', color: 'var(--accent-contrast)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '5px' }}>
              Read on Substack
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </a>
  )
}

export default function Articles() {
  const { articles, loading, error } = useSubstackFeed()

  return (
    <section className="page">
      <Background variant="articles" />

      <div className="container page-content">
        <div className="section-head">
          <h1>Writing</h1>
          <p>
            Tech, student life &amp; literature — published on{' '}
            <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-contrast)', fontWeight: 500 }}>
              Substack
            </a>
          </p>
        </div>

        {loading && (
          <div className="grid-cards">
            {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '56px 24px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '20px' }}>
              Couldn't load the live feed right now — you can still read everything on Substack.
            </p>
            <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex' }}>
              Visit Substack
            </a>
          </div>
        )}

        {!loading && !error && articles.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 24px' }}>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', color: 'var(--text)', marginBottom: '10px' }}>
              Articles coming soon
            </h3>
            <p style={{ color: 'var(--text-faint)', fontSize: '14px', marginBottom: '24px' }}>
              Follow on Substack to be the first to read new posts.
            </p>
            <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex' }}>
              Follow on Substack
            </a>
          </div>
        )}

        {!loading && !error && articles.length > 0 && (
          <div className="grid-cards">
            {articles.map((article, i) => <ArticleCard key={article.guid || i} article={article} />)}
          </div>
        )}
      </div>
    </section>
  )
}

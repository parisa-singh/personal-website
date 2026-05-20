import { useSubstackFeed } from '../hooks/useSubstackFeed'
import RippleBackground from '../components/RippleBackground'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

function SkeletonCard() {
  return (
    <div style={{
      borderRadius: '16px', overflow: 'hidden',
      background: 'rgba(12,14,28,0.7)',
      border: '1px solid rgba(255,255,255,0.05)',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ height: '170px', background: 'rgba(255,255,255,0.03)' }} />
      <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {[60, 85, 45].map((w, i) => (
          <div key={i} style={{ height: '12px', width: `${w}%`, borderRadius: '4px', background: 'rgba(255,255,255,0.04)' }} />
        ))}
      </div>
    </div>
  )
}

function ArticleCard({ article }) {
  const thumb = article.thumbnail || article.enclosure?.link

  return (
    <a href={article.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <div
        style={{
          background: 'rgba(12,14,28,0.8)',
          border: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(129,140,248,0.3)'
          e.currentTarget.style.boxShadow = '0 0 40px rgba(129,140,248,0.07)'
          e.currentTarget.style.transform = 'translateY(-4px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        {thumb ? (
          <div style={{ height: '170px', overflow: 'hidden', flexShrink: 0 }}>
            <img
              src={thumb} alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s' }}
              onError={e => { e.target.parentElement.style.display = 'none' }}
            />
          </div>
        ) : (
          <div style={{
            height: '90px', flexShrink: 0,
            background: 'linear-gradient(135deg, rgba(129,140,248,0.06), rgba(99,102,241,0.06))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="28" height="28" fill="currentColor" style={{ color: '#2a2f4a' }} viewBox="0 0 24 24">
              <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
            </svg>
          </div>
        )}

        <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#3d4663', letterSpacing: '0.5px' }}>
            {formatDate(article.pubDate)}
          </p>

          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '17px',
            fontWeight: 600,
            color: '#e8eaf2',
            lineHeight: 1.35,
          }}>
            {article.title}
          </h3>

          {article.description && (
            <p
              className="line-clamp-3"
              style={{ fontSize: '13px', color: '#3d4663', lineHeight: 1.7 }}
              dangerouslySetInnerHTML={{ __html: article.description.replace(/<[^>]+>/g, '') }}
            />
          )}

          <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
            <span style={{
              fontSize: '13px', color: '#818cf8', fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
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
    <section style={{ position: 'relative', minHeight: 'calc(100vh - 80px)', padding: '40px 28px 72px', overflow: 'hidden' }}>
      <RippleBackground />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(32px, 4vw, 54px)',
            fontWeight: 700,
            letterSpacing: '-1.5px',
            color: '#e8eaf2',
            marginBottom: '12px',
          }}>
            My Articles
          </h1>
          <p style={{ color: '#5a6078', fontSize: '15px' }}>
            Tech, Student Life &amp; Literature — all on{' '}
            <a href="https://substack.com/@creativecompiler77" target="_blank" rel="noopener noreferrer" style={{ color: '#818cf8', textDecoration: 'none' }}>
              Substack
            </a>
          </p>
        </div>

        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '22px' }}>
            {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', color: '#ef4444', fontFamily: "'JetBrains Mono', monospace", fontSize: '14px', padding: '48px' }}>
            Could not load articles. Try again later.
          </div>
        )}

        {!loading && !error && articles.length === 0 && (
          <div style={{ textAlign: 'center', padding: '72px 24px' }}>
            <div style={{ fontSize: '48px', marginBottom: '18px' }}>✍️</div>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '22px', color: '#e8eaf2', marginBottom: '10px' }}>
              Articles coming soon
            </h3>
            <p style={{ color: '#3d4663', fontSize: '14px', marginBottom: '28px' }}>
              Follow on Substack to be the first to read new posts.
            </p>
            <a href="https://substack.com/@creativecompiler77" target="_blank" rel="noopener noreferrer" className="btn-cyan">
              Follow on Substack
            </a>
          </div>
        )}

        {!loading && !error && articles.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '22px' }}>
            {articles.map((article, i) => (
              <ArticleCard key={article.guid || i} article={article} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

import { NavLink } from 'react-router-dom'
import { useMemo } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useGitHubRepos } from '../hooks/useGitHubRepos'
import { useSubstackFeed } from '../hooks/useSubstackFeed'
import { curateRepos, ABOUT_PROJECTS } from '../data/projects'
import { EXPERIENCE } from '../data/experience'

const PROFILE_IMG = `${import.meta.env.BASE_URL}avatar.JPEG`
const FALLBACK_IMG = 'https://avatars.githubusercontent.com/parisa-singh'
const RESUME_URL = 'https://drive.google.com/file/d/1lIrF5fA7tJJ1c-Dzn06On99H8tWSh_ta/view?usp=sharing'
const LINKEDIN = 'https://www.linkedin.com/in/parisa-singh/'
const GITHUB = 'https://github.com/parisa-singh'

const FOCUS = ['Frontend Engineering', 'AI Integration', 'UI / UX', 'Cloud Computing', 'Product Development']
// labels must match the Skills page exactly so the halo can find them
const CORE_SKILLS = ['Python', 'JavaScript', 'React', 'Figma', 'Machine Learning', 'Web Development', 'UI / UX Design', 'Data Science']

const fmt = (name) => name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
const fmtDate = (s) => { const d = new Date(s); return isNaN(d) ? '' : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }
const enc = encodeURIComponent

function Stat({ label, children }) {
  return (
    <div style={{ flexShrink: 0 }}>
      <div className="mono" style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--mut)', marginBottom: '6px' }}>{label}</div>
      <div style={{ fontFamily: 'var(--display)', fontSize: '16px', whiteSpace: 'nowrap' }}>{children}</div>
    </div>
  )
}

function Panel({ title, to, children }) {
  return (
    <div className="ov-panel reveal">
      <div className="ov-head">
        <h3>{title}</h3>
        <NavLink to={to} className="ov-all">All <span className="ar">↗</span></NavLink>
      </div>
      {children}
    </div>
  )
}

export default function AboutMe() {
  const { repos } = useGitHubRepos()
  const { articles } = useSubstackFeed()

  const recentExp = useMemo(() => [...EXPERIENCE].sort((a, b) => b.start.localeCompare(a.start)).slice(0, 3), [])
  const recentProjects = useMemo(() => {
    const curated = curateRepos(repos)
    if (ABOUT_PROJECTS.length) {
      const byName = Object.fromEntries(curated.map((r) => [r.name, r]))
      return ABOUT_PROJECTS.map((n) => byName[n]).filter(Boolean)
    }
    return curated.slice(0, 3)
  }, [repos])
  const recentArticles = articles.slice(0, 3)

  useReveal([repos.length, articles.length])

  return (
    <section className="page">
      <div className="container">
        {/* ---------- hero ---------- */}
        <p className="kicker reveal in">
          UMass Amherst&nbsp; · &nbsp;Honors&nbsp; · &nbsp;Class of &rsquo;28
        </p>

        <div className="about-grid">
          <div className="about-text">
            <h1 className="reveal in" style={{
              fontFamily: 'var(--display)', fontWeight: 500,
              fontSize: 'clamp(38px, 6.2vw, 68px)', lineHeight: 1.04, letterSpacing: '-1.5px', maxWidth: '13ch',
            }}>
              Designing &amp; building things that feel <span className="italic-em">intentional</span>.
            </h1>
            <p className="lede reveal in" style={{ marginTop: '26px', maxWidth: '520px', transitionDelay: '80ms' }}>
              Hello, I'm Parisa Singh, an Honors Computer Science major and Business minor at UMass Amherst.
              I build software at the intersection of engineering, AI, design, and product, spanning frontend
              and cloud to AI integration, turning technical decisions into intuitive experiences that solve real problems.
            </p>
          </div>

          <div className="about-photo reveal in">
            <img src={PROFILE_IMG} alt="Portrait of Parisa Singh" onError={(e) => { e.target.src = FALLBACK_IMG }} />
          </div>
        </div>

        {/* centered: links, focus topics, stats */}
        <div className="hero-links reveal in">
          <NavLink to="/projects" className="tlink">See my work <span className="ar">↗</span></NavLink>
          <a className="tlink" href={RESUME_URL} target="_blank" rel="noopener noreferrer">Résumé <span className="ar">↗</span></a>
          <a className="tlink" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn <span className="ar">↗</span></a>
          <a className="tlink" href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub <span className="ar">↗</span></a>
        </div>

        <div className="focus-line reveal in">
          {FOCUS.map((t, i) => (
            <span className="fi" key={t}>{i > 0 && <span className="b">•</span>}{t}</span>
          ))}
        </div>

        <div className="stats-row reveal">
          <Stat label="Currently">SWE Intern · <span style={{ color: 'var(--accent)' }}>EyeZense</span></Stat>
          <Stat label="Leading">Vice President · <span style={{ color: 'var(--accent)' }}>UMass Design</span></Stat>
          <Stat label="Studying">CS Major · <span style={{ color: 'var(--accent)' }}>Business Minor</span></Stat>
        </div>

        {/* ---------- overview ---------- */}
        <div className="ov-title reveal"><span className="mono">// overview</span></div>

        <div className="ov-grid">
          <Panel title="Recent Experience" to="/experience">
            {recentExp.map((e) => (
              <NavLink className="ov-item ov-link" to={`/experience?highlight=${enc(e.role)}`} key={e.role + e.org}>
                <div className="ov-line1">{e.role}</div>
                <div className="ov-line2"><span>{e.org}</span><span className="mono">{e.period}</span></div>
                <div className="ov-sub">{e.desc}</div>
              </NavLink>
            ))}
          </Panel>

          <Panel title="Recent Projects" to="/projects">
            {recentProjects.length === 0 && <div className="ov-empty">Loading from GitHub…</div>}
            {recentProjects.map((p) => (
              <NavLink className="ov-item ov-link" to={`/projects?highlight=${enc(p.name)}`} key={p.id}>
                <div className="ov-line1">{p.title || fmt(p.name)}</div>
                <div className="ov-line2">
                  <span>{p.descOverride || p.description || '—'}</span>
                  {p.language && <span className="mono" style={{ color: 'var(--accent)', flexShrink: 0 }}>{p.language}</span>}
                </div>
              </NavLink>
            ))}
          </Panel>

          <Panel title="Core Skills" to="/skills">
            <div className="ov-chips">
              {CORE_SKILLS.map((s) => (
                <NavLink className="ov-chip" to={`/skills?highlight=${enc(s)}`} key={s}>{s}</NavLink>
              ))}
            </div>
          </Panel>

          <Panel title="Latest Writing" to="/articles">
            {recentArticles.length === 0 && <div className="ov-empty">Fresh essays on Substack.</div>}
            {recentArticles.map((a, i) => (
              <a className="ov-item ov-link" key={a.guid || i} href={a.link} target="_blank" rel="noopener noreferrer">
                <div className="mono" style={{ fontSize: '11px', color: 'var(--mut)', marginBottom: '3px' }}>{fmtDate(a.pubDate)}</div>
                <div className="ov-line1 ov-clip">{a.title}</div>
              </a>
            ))}
          </Panel>
        </div>
      </div>

      <style>{`
        .about-grid { display: grid; grid-template-columns: 1fr clamp(190px, 26%, 250px); gap: clamp(28px, 5vw, 56px); align-items: center; }
        .about-photo { display: flex; justify-content: center; }
        .about-photo img { width: 100%; max-width: 250px; aspect-ratio: 1 / 1; object-fit: cover; border-radius: 50%; border: 1px solid var(--line); display: block; }

        .hero-links { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 24px; margin-top: clamp(30px, 5vw, 46px); }
        .focus-line { margin-top: clamp(24px, 4vw, 38px); display: flex; flex-wrap: nowrap; overflow-x: auto; align-items: center; justify-content: center; gap: 12px;
          font-family: 'JetBrains Mono', monospace; font-size: 11.5px; letter-spacing: 0.8px; text-transform: uppercase; color: var(--mut); padding-bottom: 4px; scrollbar-width: none; }
        .focus-line::-webkit-scrollbar { display: none; }
        .focus-line .fi { display: inline-flex; align-items: center; gap: 12px; white-space: nowrap; flex-shrink: 0; }
        .focus-line .b { color: var(--accent); }
        .stats-row { margin-top: clamp(22px, 3.5vw, 34px); padding-top: 22px; border-top: 1px solid var(--line);
          display: flex; flex-wrap: nowrap; overflow-x: auto; justify-content: center; gap: clamp(24px, 5vw, 52px); scrollbar-width: none; }
        .stats-row::-webkit-scrollbar { display: none; }

        .ov-title { margin-top: clamp(48px, 8vw, 84px); margin-bottom: 18px; }
        .ov-title .mono { font-family: 'JetBrains Mono', monospace; font-size: 12px; letter-spacing: 1px; color: var(--faint); }
        .ov-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; align-items: stretch; }
        .ov-panel { border: 1px solid var(--line); border-radius: 4px; background: var(--panel); padding: 22px 24px; min-width: 0; display: flex; flex-direction: column; }
        .ov-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-bottom: 4px; padding-bottom: 12px; border-bottom: 1px solid var(--line); }
        .ov-head h3 { font-family: var(--display); font-weight: 500; font-size: 17px; }
        .ov-all { font-size: 12.5px; color: var(--mut); display: inline-flex; align-items: center; gap: 5px; transition: color 0.2s; flex-shrink: 0; }
        .ov-all:hover { color: var(--accent); }
        .ov-item { display: block; padding: 13px 0; border-bottom: 1px solid var(--line-soft); min-width: 0; }
        .ov-item:last-child { border-bottom: none; }
        .ov-link { transition: padding 0.2s; }
        .ov-link:hover { padding-left: 6px; }
        .ov-link:hover .ov-line1 { color: var(--accent); }
        .ov-line1 { font-family: var(--display); font-weight: 500; font-size: 15.5px; transition: color 0.2s; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ov-line2 { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; font-size: 12.5px; color: var(--mut); margin-top: 4px; min-width: 0; }
        .ov-line2 > span:first-child { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ov-line2 .mono { font-family: 'JetBrains Mono', monospace; font-size: 11.5px; flex-shrink: 0; }
        .ov-sub { font-size: 12px; color: var(--mut); margin-top: 6px; line-height: 1.5; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ov-clip { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ov-chips { display: flex; flex-wrap: wrap; gap: 8px; padding-top: 6px; }
        .ov-chip { font-size: 12.5px; padding: 6px 12px; border-radius: 100px; border: 1px solid var(--line); color: var(--ink-2); cursor: pointer; transition: border-color 0.2s, color 0.2s, background 0.2s; }
        .ov-chip:hover { border-color: var(--accent); color: var(--accent); background: color-mix(in srgb, var(--accent) 6%, transparent); }
        .ov-empty { color: var(--mut); font-size: 13px; padding: 8px 0; }

        @media (max-width: 720px) { .about-grid { grid-template-columns: 1fr; } .about-photo { max-width: 200px; margin: 0 auto; } }
        @media (max-width: 640px) { .ov-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}

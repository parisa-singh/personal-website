import { useEffect, useState } from 'react'

/* LANDING 01 — Code Editor (IDE).
   The site reads as an editor: tab bar, line-numbered buffer with your
   profile as a syntax-highlighted object, activity rail + status bar. */

const TABS = ['about.jsx', 'work.tsx', 'writing.md', 'contact.json']

const CODE = [
  ['kw', 'const', ' ', 'fn', 'parisa', ' ', 'op', '=', ' ', 'pu', '{'],
  ['in', '  name', 'op', ':', ' ', 'st', '"Parisa Singh"', 'pu', ','],
  ['in', '  role', 'op', ':', ' ', 'pu', '[', 'st', '"Software Engineer"', 'pu', ', ', 'st', '"Product"', 'pu', ', ', 'st', '"AI/ML"', 'pu', '],'],
  ['in', '  studying', 'op', ':', ' ', 'st', '"CS × Business"', 'pu', ','],
  ['in', '  school', 'op', ':', ' ', 'st', '"UMass Amherst \'28"', 'pu', ','],
  ['in', '  now', 'op', ':', ' ', 'st', '"building @ EyeZense"', 'pu', ','],
  ['in', '  openToWork', 'op', ':', ' ', 'bo', 'true', 'pu', ','],
  ['pu', '}'],
  [],
  ['co', '// turns hard problems into things people love to use'],
  ['kw', 'export', ' ', 'kw', 'default', ' ', 'fn', 'parisa'],
]

const CLASS = { kw: 'tk-kw', fn: 'tk-fn', op: 'tk-op', pu: 'tk-pu', in: 'tk-in', st: 'tk-st', bo: 'tk-bo', co: 'tk-co' }

function Line({ tokens }) {
  const out = []
  for (let i = 0; i < tokens.length; i += 2) out.push(<span key={i} className={CLASS[tokens[i]] || ''}>{tokens[i + 1]}</span>)
  return <div className="ed-line">{out.length ? out : ' '}</div>
}

export default function EditorLanding() {
  const [tab, setTab] = useState(0)
  const [clock, setClock] = useState('')
  useEffect(() => {
    const f = () => setClock(new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'America/New_York' }))
    f(); const id = setInterval(f, 1000); return () => clearInterval(id)
  }, [])

  return (
    <div className="ed">
      <div className="ed-rail">
        <span className="ed-rail-i on" /><span className="ed-rail-i" /><span className="ed-rail-i" /><span className="ed-rail-i" />
      </div>
      <div className="ed-main">
        <div className="ed-tabs">
          {TABS.map((t, i) => (
            <button key={t} className={`ed-tab mono${i === tab ? ' on' : ''}`} onClick={() => setTab(i)}>
              <span className="ed-tab-dot" /> {t}
            </button>
          ))}
          <span className="ed-tabs-fill" />
        </div>
        <div className="ed-buffer">
          <div className="ed-gutter mono">{CODE.map((_, i) => <div key={i}>{i + 1}</div>)}</div>
          <div className="ed-code mono">
            {CODE.map((t, i) => <Line key={i} tokens={t} />)}
            <div className="ed-line"><span className="ed-caret" /></div>
          </div>
        </div>
        <div className="ed-status mono">
          <span>⎇ main</span>
          <span className="ed-status-ok">● open to work</span>
          <span className="ed-sp" />
          <span>UTF-8</span><span>JSX</span><span>Ln 12, Col 1</span><span>{clock} ET</span>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHead from '../components/PageHead'
import Panel from '../components/Panel'
import { curateRepos } from '../data/projects'
import { prettyName } from '../data/links'

const LANG_COLORS = ['#34d399', '#60a5fa', '#f59e0b', '#f472b6', '#a78bfa', '#22d3ee']
const OTHER = '#94a3b8'

function languageBreakdown(repos) {
  const counts = {}
  repos.forEach((r) => { if (r.language) counts[r.language] = (counts[r.language] || 0) + 1 })
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
  const top = sorted.slice(0, 6)
  const otherCount = sorted.slice(6).reduce((s, [, c]) => s + c, 0)
  const total = sorted.reduce((s, [, c]) => s + c, 0) || 1
  const segs = top.map(([lang, c], i) => ({ lang, c, color: LANG_COLORS[i], pct: (c / total) * 100 }))
  if (otherCount) segs.push({ lang: 'Other', c: otherCount, color: OTHER, pct: (otherCount / total) * 100 })
  return segs
}

const read = (k, fb) => { try { return JSON.parse(localStorage.getItem(k)) ?? fb } catch { return fb } }
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* ignore */ } }

export default function Projects({ repos = [], loading }) {
  const [params, setParams] = useSearchParams()
  const [ownerStored, setOwnerStored] = useState(() => { try { return localStorage.getItem('ownerMode') === '1' } catch { return false } })
  const [pinned, setPinned] = useState(() => read('pinnedProjects', []))
  const [copied, setCopied] = useState(false)

  // ?edit unlocks owner (pin) mode; owner is derived so there's no setState-in-effect
  const editParam = params.get('edit') !== null
  const owner = ownerStored || editParam
  useEffect(() => { if (editParam) { try { localStorage.setItem('ownerMode', '1') } catch { /* ignore */ } } }, [editParam])

  const exitOwner = () => {
    setOwnerStored(false)
    try { localStorage.removeItem('ownerMode') } catch { /* ignore */ }
    const p = new URLSearchParams(params); p.delete('edit'); setParams(p, { replace: true })
  }

  const togglePin = (name) => setPinned((prev) => {
    const next = prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    write('pinnedProjects', next); return next
  })

  const copyPins = () => {
    navigator.clipboard?.writeText(JSON.stringify(pinned)).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1600) })
  }

  const curated = useMemo(() => curateRepos(repos), [repos])
  const isPinned = (r) => pinned.includes(r.name)
  const ordered = useMemo(
    () => [...curated.filter((r) => pinned.includes(r.name)), ...curated.filter((r) => !pinned.includes(r.name))],
    [curated, pinned]
  )
  const langs = useMemo(() => languageBreakdown(curated), [curated])

  return (
    <div className="page">
      <PageHead tag="PJ.01 · PROJECTS" title="Things I’ve shipped"
        note="Pulled live from GitHub — every one has a deployed site you can open." />

      {owner && (
        <div className="owner-bar mono">
          <span className="owner-dot" /> Owner mode — pins save to this device.
          <button className="owner-btn" onClick={copyPins}>{copied ? 'copied ✓' : 'copy pins'}</button>
          <button className="owner-btn ghost" onClick={exitOwner}>exit</button>
        </div>
      )}

      {langs.length > 0 && (
        <div className="langbar-wrap">
          <div className="langbar">
            {langs.map((s) => <span key={s.lang} className="langbar-seg" style={{ width: `${s.pct}%`, background: s.color }} title={`${s.lang} · ${s.c}`} />)}
          </div>
          <div className="langbar-legend mono">
            {langs.map((s) => <span key={s.lang} className="langbar-item"><i style={{ background: s.color }} />{s.lang}</span>)}
          </div>
        </div>
      )}

      {loading && !ordered.length ? (
        <div className="proj-grid">
          {[0, 1, 2, 3].map((i) => <div className="proj-card panel sk-card" key={i}><div className="sk" style={{ height: 96 }} /></div>)}
        </div>
      ) : (
        <div className="proj-grid">
          {ordered.map((r, i) => (
            <Panel key={r.id} as="article" tag={String(i + 1).padStart(2, '0')} label={r.language || 'REPO'}
              className={`proj-card${isPinned(r) ? ' is-pinned' : ''}`}>
              {isPinned(r) && <span className="proj-pinned mono">◆ pinned</span>}
              <h2 className="proj-name">{r.title || prettyName(r.name)}</h2>
              <p className="proj-desc">{r.descOverride || r.description || 'A project with a live, deployed site.'}</p>
              <div className="proj-actions">
                {r.html_url && <a className="deck-link mono" href={r.html_url} target="_blank" rel="noopener noreferrer">Code</a>}
                {r.homepage && <a className="deck-link accent mono" href={r.homepage} target="_blank" rel="noopener noreferrer">Live ↗</a>}
                {owner && (
                  <button className={`proj-pin mono${isPinned(r) ? ' on' : ''}`} onClick={() => togglePin(r.name)}>
                    {isPinned(r) ? '◆ unpin' : '◇ pin'}
                  </button>
                )}
              </div>
            </Panel>
          ))}
        </div>
      )}
    </div>
  )
}

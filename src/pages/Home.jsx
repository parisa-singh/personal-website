import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const AVATAR = `${import.meta.env.BASE_URL}avatar.JPEG`
const FALLBACK = 'https://avatars.githubusercontent.com/parisa-singh'

const DESTS = [
  { n: '01', to: '/projects', name: 'Projects', note: 'Things I’ve shipped — each with a live site.' },
  { n: '02', to: '/work', name: 'Experience', note: 'Internships, roles & the teams I help lead.' },
  { n: '03', to: '/skills', name: 'Skills', note: 'The stack and the areas I build in.' },
  { n: '04', to: '/writing', name: 'Writing', note: 'Essays on tech, student life & literature.' },
]

function Clock() {
  const [t, setT] = useState('')
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/New_York' }))
    f(); const id = setInterval(f, 15000); return () => clearInterval(id)
  }, [])
  return <>{t} ET</>
}

export default function Home({ onResume }) {
  return (
    <div className="deck-page home">
      <div className="deck-topbar mono">
        <span>◦ OVERVIEW</span>
        <span className="deck-topbar-r">SYS <b>ONLINE</b> · <Clock /></span>
      </div>

      {/* single clear focus */}
      <section className="hd">
        <div className="hd-main">
          <p className="hd-eyebrow mono"><span className="hd-dot" /> CS × Business · UMass Amherst ’28</p>
          <h1 className="hd-name">Parisa Singh<span className="hd-period">.</span></h1>
          <p className="hd-pitch">
            I build software that turns everyday problems into solutions —
            and keeps the business moving along.
          </p>
          <div className="hd-cta">
            <Link className="deck-btn mono" to="/projects">View the work <span>▸</span></Link>
            <button className="deck-btn ghost mono" onClick={onResume}>Résumé ↗</button>
          </div>
          <div className="hd-status mono">
            <span className="hd-live">● looking for internships and other opportunities</span>
            <span className="hd-sep">/</span> now @ EyeZense
            <span className="hd-sep">/</span> Amherst, MA
          </div>
        </div>

        <div className="hd-portrait">
          <span className="panel-tick tl" aria-hidden /><span className="panel-tick br" aria-hidden />
          <img src={AVATAR} alt="Parisa Singh" onError={(e) => { e.currentTarget.src = FALLBACK }} />
          <span className="hd-portrait-cap mono">parisa.singh</span>
        </div>
      </section>

      {/* calm doorways into the detail pages */}
      <nav className="hd-dests" aria-label="Sections">
        {DESTS.map((d) => (
          <Link key={d.to} to={d.to} className="hd-dest">
            <span className="hd-dest-n mono">{d.n}</span>
            <span className="hd-dest-body">
              <span className="hd-dest-name">{d.name}</span>
              <span className="hd-dest-note">{d.note}</span>
            </span>
            <span className="hd-dest-arr">→</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

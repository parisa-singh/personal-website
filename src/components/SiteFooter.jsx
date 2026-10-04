import { LINKS } from '../data/links'

const SIGNAL = [
  ['LinkedIn', LINKS.linkedin], ['GitHub', LINKS.github], ['Substack', LINKS.substack], ['Email', LINKS.email],
]

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="sf-inner">
        <div className="sf-lead">
          <span className="sf-tag mono">SG.00 · SIGNAL</span>
          <h2 className="sf-h">Let’s build something that matters.</h2>
          <p className="sf-sub">Looking for internships and other opportunities — and always up for a good conversation.</p>
        </div>
        <div className="sf-links">
          {SIGNAL.map(([label, href]) => (
            <a key={label} className="sf-link mono" href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer">
              <span>{label}</span><span className="sf-arr">↗</span>
            </a>
          ))}
        </div>
      </div>
      <div className="sf-base mono">
        <span>© {new Date().getFullYear()} Parisa Singh</span>
        <span>Built from scratch · React + Vite</span>
      </div>
    </footer>
  )
}

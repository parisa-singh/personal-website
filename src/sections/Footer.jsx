import Reveal from '../fx/Reveal'
import Magnetic from '../fx/Magnetic'
import { LINKS } from '../data/links'

const CONTACT = [
  { label: 'LinkedIn', href: LINKS.linkedin },
  { label: 'GitHub', href: LINKS.github },
  { label: 'Substack', href: LINKS.substack },
  { label: 'Email', href: LINKS.email },
]

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <Reveal className="footer-top">
        <p className="footer-kicker mono">// let’s build something</p>
        <h2 className="footer-h">Let’s make<br /><em>something</em>.</h2>
        <p className="footer-sub">Open to software, forward-deployed, and product roles.</p>
        <div className="footer-links">
          {CONTACT.map((c) => (
            <Magnetic key={c.label} strength={0.35}>
              <a className="footer-link" href={c.href}
                target={c.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
                data-cursor="open">
                {c.label}
              </a>
            </Magnetic>
          ))}
        </div>
      </Reveal>
      <div className="footer-base mono">
        <span>© {new Date().getFullYear()} Parisa Singh</span>
        <span>Designed &amp; built from scratch</span>
      </div>
    </footer>
  )
}

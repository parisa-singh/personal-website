const LINKS = [
  { label: 'Email', href: 'mailto:parisasingh@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/parisa-singh/' },
  { label: 'GitHub', href: 'https://github.com/parisa-singh' },
  { label: 'Substack', href: 'https://creativecompiler77.substack.com' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container in">
        <span style={{ fontFamily: 'var(--display)', fontSize: '15px' }}>
          © {new Date().getFullYear()} Parisa Singh
        </span>
        <div style={{ display: 'flex', gap: '22px', flexWrap: 'wrap' }}>
          {LINKS.map(({ label, href }) => (
            <a key={label} className="foot-link" href={href}
               target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer">
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

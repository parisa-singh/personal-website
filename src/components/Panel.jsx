/* A command-deck panel: bordered module with corner ticks + a mono header. */
export default function Panel({ tag, label, className = '', children, as: Tag = 'section' }) {
  return (
    <Tag className={`panel ${className}`}>
      <span className="panel-tick tl" aria-hidden />
      <span className="panel-tick br" aria-hidden />
      {(tag || label) && (
        <header className="panel-head mono">
          {tag && <span className="panel-tag">{tag}</span>}
          {label && <span className="panel-label">{label}</span>}
        </header>
      )}
      {children}
    </Tag>
  )
}

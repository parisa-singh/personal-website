/* Shared inner-page header in the deck language. */
export default function PageHead({ tag, title, note }) {
  return (
    <header className="page-head">
      <span className="page-tag mono">{tag}</span>
      <h1 className="page-title">{title}</h1>
      {note && <p className="page-note">{note}</p>}
    </header>
  )
}

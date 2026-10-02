/**
 * Infinite horizontal ticker. Pure CSS transform loop (smooth, cheap).
 * `items` repeat seamlessly; `reverse` flips direction.
 */
export default function Marquee({ items, reverse = false, duration = 28, className = '' }) {
  const row = (
    <div className="marquee-row" aria-hidden>
      {items.map((t, i) => (
        <span className="marquee-item" key={i}>
          {t}<span className="marquee-sep">✦</span>
        </span>
      ))}
    </div>
  )
  return (
    <div className={`marquee ${className}`}>
      <div
        className="marquee-track"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {row}{row}
      </div>
    </div>
  )
}

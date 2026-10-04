import { useState, useEffect } from 'react'

/* Types each line in sequence, with a blinking caret on the active line.
   Lines beginning with "::" render as the glitchy headline style. */
export default function Typewriter({ lines, speed = 34, startDelay = 300, onDone }) {
  const [done, setDone] = useState([])
  const [cur, setCur] = useState('')
  const [curGlitch, setCurGlitch] = useState(false)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    let li = 0, ci = 0, t
    const strip = (l) => (l.startsWith('::') ? l.slice(2) : l)
    const step = () => {
      if (li >= lines.length) { setFinished(true); onDone?.(); return }
      const raw = lines[li]
      const text = strip(raw)
      setCurGlitch(raw.startsWith('::'))
      if (ci <= text.length) { setCur(text.slice(0, ci)); ci++; t = setTimeout(step, raw.startsWith('::') ? speed + 18 : speed) }
      else { setDone((d) => [...d, raw]); setCur(''); li++; ci = 0; t = setTimeout(step, 340) }
    }
    t = setTimeout(step, startDelay)
    return () => clearTimeout(t)
  }, [lines, speed, startDelay, onDone])

  return (
    <div className="term-body">
      {done.map((l, i) => (
        <div className={`term-line${l.startsWith('::') ? ' term-glitch' : ''}${l === '' ? ' term-gap' : ''}`} key={i}>
          {l.startsWith('::') ? l.slice(2) : l}
        </div>
      ))}
      {!finished && (
        <div className={`term-line${curGlitch ? ' term-glitch' : ''}`}>
          {cur}<span className="term-caret" />
        </div>
      )}
    </div>
  )
}

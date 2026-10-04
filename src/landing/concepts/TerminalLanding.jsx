import { useEffect, useRef, useState } from 'react'

/* LANDING 02 — Live Terminal (CLI).
   A shell that runs a short session to reveal Parisa, then leaves a live
   prompt. Commands type themselves; outputs print after each. */

const SESSION = [
  { cmd: 'whoami', out: ['Parisa Singh — Computer Science × Business @ UMass Amherst \'28'] },
  { cmd: 'cat about.txt', out: ['I build software that moves the business — across', 'engineering, AI, and product. Currently building @ EyeZense.'] },
  { cmd: 'ls projects/', out: ['project-alpha/   project-beta/   project-gamma/   +more'] },
  { cmd: 'echo $CONTACT', out: ['github.com/parisa-singh · linkedin.com/in/parisa-singh'] },
]
const PROMPT = 'parisa@portfolio:~$'

export default function TerminalLanding() {
  const [done, setDone] = useState([])     // completed {cmd, out}
  const [typing, setTyping] = useState('') // current command being typed
  const [idx, setIdx] = useState(0)
  const live = idx >= SESSION.length       // derived: session finished
  const scroller = useRef(null)

  useEffect(() => {
    if (idx >= SESSION.length) return
    const cmd = SESSION[idx].cmd
    let ci = 0, t
    const type = () => {
      if (ci <= cmd.length) { setTyping(cmd.slice(0, ci)); ci++; t = setTimeout(type, 55) }
      else t = setTimeout(() => { setDone((d) => [...d, SESSION[idx]]); setTyping(''); setIdx((i) => i + 1) }, 480)
    }
    t = setTimeout(type, idx === 0 ? 600 : 420)
    return () => clearTimeout(t)
  }, [idx])

  useEffect(() => { if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight }, [done, typing])

  return (
    <div className="cli">
      <div className="cli-chrome">
        <span className="term-dot" /><span className="term-dot" /><span className="term-dot" />
        <span className="term-name mono">parisa — zsh — 80×24</span>
      </div>
      <div className="cli-body mono" ref={scroller}>
        {done.map((s, i) => (
          <div key={i}>
            <div className="cli-cmd"><span className="cli-prompt">{PROMPT}</span> {s.cmd}</div>
            {s.out.map((o, j) => <div className="cli-out" key={j}>{o}</div>)}
          </div>
        ))}
        {!live && (
          <div className="cli-cmd"><span className="cli-prompt">{PROMPT}</span> {typing}<span className="term-caret" /></div>
        )}
        {live && (
          <div className="cli-cmd"><span className="cli-prompt">{PROMPT}</span> <span className="term-caret" />
            <span className="cli-hint"> type <b>help</b> or scroll to explore —</span>
          </div>
        )}
      </div>
    </div>
  )
}

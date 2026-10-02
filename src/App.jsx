import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import { useTheme } from './hooks/useTheme'
import { useGitHubRepos } from './hooks/useGitHubRepos'
import { useSubstackFeed, prefetchSubstack } from './hooks/useSubstackFeed'
import { useSmoothScroll } from './hooks/useSmoothScroll'

import Cursor from './fx/Cursor'
import Intro from './fx/Intro'
import Nav from './sections/Nav'
import Hero from './sections/Hero'
import Work from './sections/Work'
import Path from './sections/Path'
import Toolkit from './sections/Toolkit'
import Words from './sections/Words'
import Footer from './sections/Footer'

const seenIntro = () => { try { return sessionStorage.getItem('introSeen') === '1' } catch { return false } }

export default function App() {
  const { theme, toggle } = useTheme()
  const { repos, loading } = useGitHubRepos()
  const { articles, loading: aLoading } = useSubstackFeed()

  const [booted, setBooted] = useState(seenIntro)
  useSmoothScroll(true)
  useEffect(() => { prefetchSubstack() }, [])

  const finishIntro = () => {
    setBooted(true)
    try { sessionStorage.setItem('introSeen', '1') } catch { /* ignore */ }
  }

  return (
    <>
      <Cursor />
      <AnimatePresence>
        {!booted && <Intro key="intro" onDone={finishIntro} />}
      </AnimatePresence>

      <Nav theme={theme} toggle={toggle} />
      <main>
        <Hero ready={booted} />
        <Work repos={repos} loading={loading} />
        <Path />
        <Toolkit />
        <Words articles={articles} loading={aLoading} />
      </main>
      <Footer />
    </>
  )
}

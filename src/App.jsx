import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import { useGitHubRepos } from './hooks/useGitHubRepos'
import { useSubstackFeed, prefetchSubstack } from './hooks/useSubstackFeed'

import Boot from './boot/Boot'
import CommandBar from './components/CommandBar'
import SiteFooter from './components/SiteFooter'
import ResumeModal from './components/ResumeModal'
import Home from './pages/Home'
import Work from './pages/Work'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Writing from './pages/Writing'

const seenIntro = () => { try { return sessionStorage.getItem('introSeen') === '1' } catch { return false } }

function Routed({ repos, loading, articles, aLoading, onResume }) {
  const location = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} className="route"
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.3, 1] }}>
        <Routes location={location}>
          <Route path="/" element={<Home onResume={onResume} />} />
          <Route path="/work" element={<Work />} />
          <Route path="/projects" element={<Projects repos={repos} loading={loading} />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/writing" element={<Writing articles={articles} loading={aLoading} />} />
          <Route path="*" element={<Home onResume={onResume} />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  const { repos, loading } = useGitHubRepos()
  const { articles, loading: aLoading } = useSubstackFeed()
  const [booted, setBooted] = useState(seenIntro)

  useEffect(() => { prefetchSubstack() }, [])

  const finishBoot = () => {
    setBooted(true)
    try { sessionStorage.setItem('introSeen', '1') } catch { /* ignore */ }
  }
  const replayBoot = () => setBooted(false)
  const [resumeOpen, setResumeOpen] = useState(false)

  return (
    <HashRouter>
      <AnimatePresence>
        {!booted && <Boot key="boot" onDone={finishBoot} />}
      </AnimatePresence>

      <div className="site">
        <CommandBar onReplay={replayBoot} onResume={() => setResumeOpen(true)} />
        <main className="site-main">
          <Routed repos={repos} loading={loading} articles={articles} aLoading={aLoading} onResume={() => setResumeOpen(true)} />
        </main>
        <SiteFooter />
        <AnimatePresence>
          {resumeOpen && <ResumeModal key="resume" onClose={() => setResumeOpen(false)} />}
        </AnimatePresence>
      </div>
    </HashRouter>
  )
}

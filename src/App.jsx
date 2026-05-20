import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AboutMe from './pages/AboutMe'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Articles from './pages/Articles'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <div key={location.pathname} className="page-reveal" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Routes>
        <Route path="/" element={<Navigate to="/about" replace />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}

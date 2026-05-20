import { useLocation } from 'react-router-dom'

function AnimatedRoutes({ children }) {
  const location = useLocation()
  return (
    <div key={location.pathname} className="page-reveal" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {children}
    </div>
  )
}

export default AnimatedRoutes

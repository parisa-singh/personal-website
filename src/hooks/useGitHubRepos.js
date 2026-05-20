import { useState, useEffect, useCallback } from 'react'

const USERNAME = 'parisa-singh'

export function useGitHubRepos() {
  const [repos, setRepos] = useState([])
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setError(null)
    try {
      const [reposRes, profileRes] = await Promise.all([
        fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=30`),
        fetch(`https://api.github.com/users/${USERNAME}`),
      ])
      if (!reposRes.ok || !profileRes.ok) throw new Error('GitHub API request failed')
      const [reposData, profileData] = await Promise.all([reposRes.json(), profileRes.json()])
      setRepos(reposData.filter(r => !r.fork && r.name !== `${USERNAME}.github.io`))
      setProfile(profileData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    window.addEventListener('focus', fetchData)
    return () => window.removeEventListener('focus', fetchData)
  }, [fetchData])

  return { repos, profile, loading, error, refetch: fetchData }
}

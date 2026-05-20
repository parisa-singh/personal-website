import { useState, useEffect, useCallback } from 'react'

const FEED_URL = 'https://creativecompiler77.substack.com/feed'
const RSS2JSON = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(FEED_URL)}`

export function useSubstackFeed() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchFeed = useCallback(async () => {
    setError(null)
    try {
      const res = await fetch(RSS2JSON)
      if (!res.ok) throw new Error('Feed request failed')
      const data = await res.json()
      if (data.status !== 'ok') throw new Error(data.message || 'Feed parse error')
      const sorted = [...data.items].sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
      setArticles(sorted)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchFeed()
    window.addEventListener('focus', fetchFeed)
    return () => window.removeEventListener('focus', fetchFeed)
  }, [fetchFeed])

  return { articles, loading, error, refetch: fetchFeed }
}

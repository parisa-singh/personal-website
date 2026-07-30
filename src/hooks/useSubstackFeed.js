import { useState, useEffect, useCallback } from 'react'

const FEED_URL = 'https://creativecompiler77.substack.com/feed'

// Ordered fallbacks. Each returns the raw RSS XML as text (except rss2json,
// which returns already-normalized JSON). We try them in turn so a single
// flaky/rate-limited service can't take the whole Articles page down.
const RAW_PROXIES = [
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
]
const RSS2JSON = (url) => `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`

function firstImage(html) {
  if (!html) return null
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i)
  return m ? m[1] : null
}

function parseRss(xmlText) {
  const doc = new DOMParser().parseFromString(xmlText, 'text/xml')
  if (doc.querySelector('parsererror')) throw new Error('Malformed RSS')

  const items = Array.from(doc.querySelectorAll('item'))
  if (items.length === 0) throw new Error('No items in feed')

  return items.map((item, i) => {
    const get = (tag) => item.querySelector(tag)?.textContent?.trim() || ''
    const content =
      item.getElementsByTagName('content:encoded')[0]?.textContent || ''
    const description = get('description')
    const enclosure = item.querySelector('enclosure')?.getAttribute('url') || null

    return {
      guid: get('guid') || get('link') || String(i),
      title: get('title'),
      link: get('link'),
      pubDate: get('pubDate'),
      description,
      thumbnail: enclosure || firstImage(content) || firstImage(description) || null,
    }
  })
}

async function fetchViaRaw() {
  for (const build of RAW_PROXIES) {
    try {
      const res = await fetch(build(FEED_URL))
      if (!res.ok) continue
      const text = await res.text()
      const items = parseRss(text)
      if (items.length) return items
    } catch {
      // try the next proxy
    }
  }
  throw new Error('All raw proxies failed')
}

async function fetchViaRss2Json() {
  const res = await fetch(RSS2JSON(FEED_URL))
  if (!res.ok) throw new Error('rss2json request failed')
  const data = await res.json()
  if (data.status !== 'ok') throw new Error(data.message || 'rss2json parse error')
  return data.items.map((it, i) => ({
    guid: it.guid || it.link || String(i),
    title: it.title,
    link: it.link,
    pubDate: it.pubDate,
    description: it.description || it.content || '',
    thumbnail: it.thumbnail || it.enclosure?.link || firstImage(it.content) || null,
  }))
}

export function useSubstackFeed() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchFeed = useCallback(async () => {
    try {
      let items
      try {
        items = await fetchViaRaw()
      } catch {
        items = await fetchViaRss2Json()
      }
      items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
      setArticles(items)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Fetch-on-mount + refetch on focus; all state updates happen after await.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFeed()
    window.addEventListener('focus', fetchFeed)
    return () => window.removeEventListener('focus', fetchFeed)
  }, [fetchFeed])

  return { articles, loading, error, refetch: fetchFeed }
}

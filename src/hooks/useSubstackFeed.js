import { useState, useEffect, useCallback } from 'react'

const FEED_URL = 'https://creativecompiler77.substack.com/feed'
const CACHE_KEY = 'substack-articles-v1'

// Ordered fallbacks. Raw proxies return RSS XML we parse ourselves; rss2json is
// the last resort (its anonymous tier is rate-limited, so never the sole source).
const RAW_PROXIES = [
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
]
const RSS2JSON = (url) => `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    const parsed = raw ? JSON.parse(raw) : null
    return Array.isArray(parsed) ? parsed : []
  } catch { return [] }
}
function writeCache(items) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(items)) } catch { /* ignore */ }
}

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
    const content = item.getElementsByTagName('content:encoded')[0]?.textContent || ''
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
  // Race all proxies in parallel — whichever returns a valid feed first wins,
  // so one slow/dead proxy no longer adds its latency to the total.
  const attempts = RAW_PROXIES.map((build) => (async () => {
    const res = await fetch(build(FEED_URL))
    if (!res.ok) throw new Error('bad status')
    const items = parseRss(await res.text())
    if (!items.length) throw new Error('empty feed')
    return items
  })())
  return Promise.any(attempts) // rejects only if every proxy fails
}

async function fetchFeedItems() {
  let items
  try { items = await fetchViaRaw() }
  catch { items = await fetchViaRss2Json() }
  items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
  return items
}

/**
 * Warm the cache as early as possible (called once on app load) so navigating
 * to Writing reads from cache instantly instead of waiting on the network.
 */
export async function prefetchSubstack() {
  try { writeCache(await fetchFeedItems()) } catch { /* ignore */ }
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
  // Paint instantly from cache; only show the loading state on a truly cold start.
  const [articles, setArticles] = useState(readCache)
  const [loading, setLoading] = useState(() => readCache().length === 0)
  const [error, setError] = useState(null)

  const fetchFeed = useCallback(async () => {
    try {
      const items = await fetchFeedItems()
      setArticles(items)
      writeCache(items)
      setError(null)
    } catch (err) {
      // keep whatever cache we already showed; only surface an error on cold start
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFeed()
    window.addEventListener('focus', fetchFeed)
    return () => window.removeEventListener('focus', fetchFeed)
  }, [fetchFeed])

  return { articles, loading, error, refetch: fetchFeed }
}

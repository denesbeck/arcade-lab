import type { BlogPostMeta } from './types'

interface SearchResult extends BlogPostMeta {
  score: number
}

/**
 * Tokenize a query string into lowercase words, stripping punctuation.
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 1)
}

/**
 * Search blog posts by matching query terms against titles, descriptions, and tags.
 * Returns results sorted by relevance score (descending).
 */
export function searchBlogPosts(
  entries: BlogPostMeta[],
  query: string,
  options?: { tag?: string; limit?: number }
): SearchResult[] {
  const queryTokens = tokenize(query)
  if (queryTokens.length === 0) return []

  let filtered = entries
  if (options?.tag) {
    const normalizedTag = options.tag.toLowerCase()
    filtered = filtered.filter((entry) =>
      entry.tags.some((t) => t.toLowerCase() === normalizedTag)
    )
  }

  const results: SearchResult[] = []

  for (const entry of filtered) {
    let score = 0
    const titleLower = entry.title.toLowerCase()
    const descLower = entry.description.toLowerCase()
    const tagsLower = entry.tags.map((t) => t.toLowerCase())

    for (const token of queryTokens) {
      // Title match (highest weight)
      if (titleLower.includes(token)) score += 3

      // Description match
      if (descLower.includes(token)) score += 2

      // Tag exact match
      if (tagsLower.includes(token)) score += 2

      // Tag partial match
      if (tagsLower.some((t) => t.includes(token) || token.includes(t)))
        score += 1
    }

    if (score > 0) {
      results.push({ ...entry, score })
    }
  }

  results.sort((a, b) => b.score - a.score)

  const limit = options?.limit ?? 5
  return results.slice(0, limit)
}

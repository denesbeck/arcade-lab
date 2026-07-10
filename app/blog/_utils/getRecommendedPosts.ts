import { BlogEntry } from '../_interfaces/blog'
import { isPublished } from './isPublished'

/**
 * Pick posts to recommend after reading `current`.
 *
 * Candidates are all published posts except `current`, scored by the number of
 * tags they share with `current`. Ties (including the zero-overlap case) fall
 * back to most recent first, so there are always up to `limit` suggestions.
 */
export function getRecommendedPosts(
  current: BlogEntry,
  all: BlogEntry[],
  limit = 3
): BlogEntry[] {
  const currentTags = new Set(current.tags)

  return all
    .filter((entry) => entry.id !== current.id && isPublished(entry))
    .map((entry) => ({
      entry,
      score: entry.tags.filter((tag) => currentTags.has(tag)).length,
    }))
    .sort(
      (a, b) => b.score - a.score || b.entry.date.localeCompare(a.entry.date)
    )
    .slice(0, limit)
    .map(({ entry }) => entry)
}

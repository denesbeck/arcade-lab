import { BlogEntry } from '../_interfaces/blog'

/**
 * A post is published if it is not explicitly hidden
 * and its date is today or in the past (YYYY-MM-DD comparison).
 */
export function isPublished(entry: BlogEntry): boolean {
  if (process.env.NEXT_PUBLIC_SHOW_ALL_BLOG_POSTS === '1') return true
  if (entry.hidden) return false
  const today = new Date().toISOString().split('T')[0]
  return entry.date <= today
}

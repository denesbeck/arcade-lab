const RATE_LIMIT_PER_IP = 20 // max requests per IP per window
const RATE_LIMIT_GLOBAL = 200 // max total requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour

const ipRequests = new Map<string, { count: number; resetAt: number }>()
let globalRequests = { count: 0, resetAt: Date.now() + RATE_LIMIT_WINDOW_MS }

export function checkRateLimit(ip: string): string | null {
  const now = Date.now()

  // Reset global counter if window expired
  if (now > globalRequests.resetAt) {
    globalRequests = { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS }
  }

  if (globalRequests.count >= RATE_LIMIT_GLOBAL) {
    return 'Service is temporarily at capacity. Please try again later.'
  }

  // Check per-IP limit
  const entry = ipRequests.get(ip)
  if (entry && now < entry.resetAt) {
    if (entry.count >= RATE_LIMIT_PER_IP) {
      return 'Too many requests. Please try again later.'
    }
    entry.count++
  } else {
    ipRequests.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
  }

  globalRequests.count++
  return null
}

/**
 * Reset all rate limit state. Only for testing.
 */
export function _resetRateLimits(): void {
  ipRequests.clear()
  globalRequests = { count: 0, resetAt: Date.now() + RATE_LIMIT_WINDOW_MS }
}

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { _resetRateLimits, checkRateLimit } from './rate-limit'

describe('checkRateLimit', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-06-15T12:00:00Z'))
    _resetRateLimits()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('allows the first request from an IP', () => {
    expect(checkRateLimit('1.2.3.4')).toBeNull()
  })

  it('allows multiple requests under the per-IP limit', () => {
    for (let i = 0; i < 19; i++) {
      expect(checkRateLimit('1.2.3.4')).toBeNull()
    }
  })

  it('blocks requests after per-IP limit is exceeded', () => {
    for (let i = 0; i < 20; i++) {
      checkRateLimit('1.2.3.4')
    }
    expect(checkRateLimit('1.2.3.4')).toBe(
      'Too many requests. Please try again later.'
    )
  })

  it('allows requests from different IPs independently', () => {
    for (let i = 0; i < 20; i++) {
      checkRateLimit('1.2.3.4')
    }
    // Different IP should still work
    expect(checkRateLimit('5.6.7.8')).toBeNull()
  })

  it('blocks all requests after global limit is exceeded', () => {
    // Use 200 different IPs to hit the global limit
    for (let i = 0; i < 200; i++) {
      checkRateLimit(`10.0.${Math.floor(i / 256)}.${i % 256}`)
    }
    // Any IP should now be blocked
    expect(checkRateLimit('99.99.99.99')).toBe(
      'Service is temporarily at capacity. Please try again later.'
    )
  })

  it('resets per-IP counter after time window expires', () => {
    for (let i = 0; i < 20; i++) {
      checkRateLimit('1.2.3.4')
    }
    expect(checkRateLimit('1.2.3.4')).toBe(
      'Too many requests. Please try again later.'
    )

    // Advance time past the 1-hour window
    vi.advanceTimersByTime(60 * 60 * 1000 + 1)

    expect(checkRateLimit('1.2.3.4')).toBeNull()
  })

  it('resets global counter after time window expires', () => {
    for (let i = 0; i < 200; i++) {
      checkRateLimit(`10.0.${Math.floor(i / 256)}.${i % 256}`)
    }
    expect(checkRateLimit('99.99.99.99')).toBe(
      'Service is temporarily at capacity. Please try again later.'
    )

    // Advance time past the 1-hour window
    vi.advanceTimersByTime(60 * 60 * 1000 + 1)

    expect(checkRateLimit('99.99.99.99')).toBeNull()
  })

  it('returns null (no error) for allowed requests', () => {
    const result = checkRateLimit('1.2.3.4')
    expect(result).toBeNull()
  })
})

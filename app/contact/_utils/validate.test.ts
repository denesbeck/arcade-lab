import { describe, expect, it } from 'vitest'
import validate from './validate'

describe('validate', () => {
  describe('valid input', () => {
    it('returns valid for complete valid input', () => {
      const result = validate('John Doe', 'john@example.com', 'Hello there')
      expect(result.valid).toBe(true)
      expect(result.messages).toEqual([])
      expect(result.invalidFields).toEqual([])
    })
  })

  describe('missing fields', () => {
    it('rejects empty name', () => {
      const result = validate('', 'john@example.com', 'Hello')
      expect(result.valid).toBe(false)
      expect(result.messages).toContain('Name is required.')
      expect(result.invalidFields).toContain('name')
    })

    it('rejects empty email', () => {
      const result = validate('John', '', 'Hello')
      expect(result.valid).toBe(false)
      expect(result.messages).toContain('Email is required.')
      expect(result.invalidFields).toContain('email')
    })

    it('rejects empty message', () => {
      const result = validate('John', 'john@example.com', '')
      expect(result.valid).toBe(false)
      expect(result.messages).toContain('Message is required.')
      expect(result.invalidFields).toContain('message')
    })

    it('rejects all empty fields', () => {
      const result = validate('', '', '')
      expect(result.valid).toBe(false)
      expect(result.invalidFields).toContain('name')
      expect(result.invalidFields).toContain('email')
      expect(result.invalidFields).toContain('message')
    })

    it('collects multiple error messages', () => {
      const result = validate('', '', '')
      expect(result.messages.length).toBeGreaterThanOrEqual(3)
    })
  })

  describe('email validation', () => {
    it('rejects invalid email format', () => {
      const result = validate('John', 'not-an-email', 'Hello')
      expect(result.valid).toBe(false)
      expect(result.messages).toContain('Invalid email format.')
    })

    it('rejects email without domain', () => {
      const result = validate('John', 'john@', 'Hello')
      expect(result.valid).toBe(false)
    })

    it('rejects email without @', () => {
      const result = validate('John', 'john.example.com', 'Hello')
      expect(result.valid).toBe(false)
    })

    it('accepts valid email with subdomain', () => {
      const result = validate('John', 'john@mail.example.com', 'Hello')
      expect(result.valid).toBe(true)
    })

    it('accepts valid email with plus addressing', () => {
      const result = validate('John', 'john+test@example.com', 'Hello')
      expect(result.valid).toBe(true)
    })
  })

  describe('return structure', () => {
    it('always returns valid, messages, and invalidFields', () => {
      const result = validate('', '', '')
      expect(result).toHaveProperty('valid')
      expect(result).toHaveProperty('messages')
      expect(result).toHaveProperty('invalidFields')
      expect(Array.isArray(result.messages)).toBe(true)
      expect(Array.isArray(result.invalidFields)).toBe(true)
    })
  })
})

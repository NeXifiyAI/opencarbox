import { describe, it, expect } from 'vitest'
import { cn, formatPrice, formatDate, slugify, truncate, generateId } from '@/lib/utils'

/**
 * ============================================================
 * Unit Tests: Utils
 * ============================================================
 */

describe('cn (classnames)', () => {
  it('sollte Klassen kombinieren', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('sollte conditional classes unterstützen', () => {
    expect(cn('a', false && 'b', 'c')).toBe('a c')
    expect(cn('a', true && 'b', 'c')).toBe('a b c')
  })

  it('sollte Tailwind-Konflikte auflösen', () => {
    expect(cn('px-4', 'px-8')).toBe('px-8')
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })
})

describe('formatPrice', () => {
  it('sollte Preis in EUR formatieren', () => {
    const result = formatPrice(19.99)
    expect(result).toContain('19,99')
    expect(result).toContain('€')
  })

  it('sollte andere Währungen unterstützen', () => {
    const result = formatPrice(19.99, { currency: 'USD', locale: 'en-US' })
    expect(result).toContain('$')
    expect(result).toContain('19.99')
  })

  it('sollte 0 korrekt formatieren', () => {
    const result = formatPrice(0)
    expect(result).toContain('0,00')
  })
})

describe('formatDate', () => {
  it('sollte Datum formatieren', () => {
    const date = new Date('2024-01-15')
    const result = formatDate(date)
    expect(result).toContain('15')
    expect(result).toContain('2024')
  })

  it('sollte String-Datum akzeptieren', () => {
    const result = formatDate('2024-01-15')
    expect(result).toContain('15')
  })

  it('sollte Zeit einschließen wenn angefordert', () => {
    const date = new Date('2024-01-15T14:30:00')
    const result = formatDate(date, { includeTime: true })
    // Sollte Zeit enthalten
    expect(result.length).toBeGreaterThan(10)
  })
})

describe('slugify', () => {
  it('sollte einfachen Text konvertieren', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('sollte Umlaute entfernen', () => {
    expect(slugify('Über uns')).toBe('uber-uns')
    expect(slugify('Größe')).toBe('grosse')
  })

  it('sollte Sonderzeichen entfernen', () => {
    expect(slugify('Test & Demo!')).toBe('test-demo')
  })

  it('sollte führende/trailing Bindestriche entfernen', () => {
    expect(slugify('--test--')).toBe('test')
  })
})

describe('truncate', () => {
  it('sollte kurzen Text unverändert lassen', () => {
    expect(truncate('Hello', 10)).toBe('Hello')
  })

  it('sollte langen Text kürzen', () => {
    expect(truncate('Hello World', 8)).toBe('Hello Wo...')
  })

  it('sollte exakte Länge beibehalten', () => {
    expect(truncate('Hello', 5)).toBe('Hello')
  })
})

describe('generateId', () => {
  it('sollte ID mit Standard-Länge generieren', () => {
    const id = generateId()
    expect(id).toHaveLength(12)
  })

  it('sollte ID mit angegebener Länge generieren', () => {
    const id = generateId(8)
    expect(id).toHaveLength(8)
  })

  it('sollte einzigartige IDs generieren', () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()))
    expect(ids.size).toBe(100)
  })

  it('sollte nur alphanumerische Zeichen enthalten', () => {
    const id = generateId()
    expect(id).toMatch(/^[a-zA-Z0-9]+$/)
  })
})

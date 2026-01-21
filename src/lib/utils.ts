import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility-Funktion für Tailwind Class-Merging
 * 
 * Kombiniert clsx() und tailwind-merge() für:
 * - Conditional Classes
 * - Override von Tailwind Classes
 * 
 * Beispiel:
 * ```tsx
 * cn('px-4 py-2', isActive && 'bg-primary', className)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formatiert einen Preis mit Währung
 */
export function formatPrice(
  price: number,
  options: {
    currency?: string
    locale?: string
  } = {}
) {
  const { currency = 'EUR', locale = 'de-DE' } = options
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(price)
}

/**
 * Formatiert ein Datum
 */
export function formatDate(
  date: Date | string,
  options: {
    locale?: string
    includeTime?: boolean
  } = {}
) {
  const { locale = 'de-DE', includeTime = false } = options
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    ...(includeTime && { timeStyle: 'short' }),
  }).format(dateObj)
}

/**
 * Generiert einen URL-freundlichen Slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Entfernt Akzente
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

/**
 * Truncated Text mit Ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

/**
 * Debounce-Funktion
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Sleep/Wait Utility
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Generiert eine zufällige ID
 */
export function generateId(length = 12): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Prüft ob wir auf dem Server sind
 */
export const isServer = typeof window === 'undefined'

/**
 * Prüft ob wir im Browser sind
 */
export const isBrowser = !isServer

/**
 * Gibt den Absolute URL zurück
 */
export function absoluteUrl(path: string): string {
  if (isServer) {
    return `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${path}`
  }
  return `${window.location.origin}${path}`
}

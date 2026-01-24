import { test, expect } from '@playwright/test'

/**
 * ============================================================
 * E2E Tests: Landing Page
 * ============================================================
 */

test.describe('Landing Page', () => {
  test('sollte laden und Titel anzeigen', async ({ page }) => {
    await page.goto('/')

    // Prüfe dass Seite geladen wurde
    await expect(page).toHaveTitle(/Starter/)

    // Prüfe dass Hero-Section sichtbar ist
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
  })

  test('sollte Navigation enthalten', async ({ page }) => {
    await page.goto('/')

    // Header vorhanden
    const header = page.locator('header')
    await expect(header).toBeVisible()

    // Logo/Name vorhanden
    const logo = header.getByRole('link').first()
    await expect(logo).toBeVisible()
  })

  test('sollte Footer enthalten', async ({ page }) => {
    await page.goto('/')

    // Footer vorhanden
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    // Copyright-Text
    const copyright = footer.getByText(/©/)
    await expect(copyright).toBeVisible()
  })

  test('sollte Feature-Cards anzeigen', async ({ page }) => {
    await page.goto('/')

    // Mindestens 3 Feature-Cards
    const features = page.locator('[class*="card"]')
    await expect(features).toHaveCount({ minimum: 3 })
  })

  test('sollte responsive sein', async ({ page }) => {
    // Mobile Viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Prüfe dass Content sichtbar ist
    const main = page.locator('main')
    await expect(main).toBeVisible()

    // Desktop Viewport
    await page.setViewportSize({ width: 1280, height: 720 })
    await expect(main).toBeVisible()
  })
})

test.describe('Navigation', () => {
  test('sollte Links haben', async ({ page }) => {
    await page.goto('/')

    // CTA Button
    const ctaButton = page.getByRole('link', { name: /starten/i })
    await expect(ctaButton).toBeVisible()
  })
})

test.describe('Accessibility', () => {
  test('sollte keine offensichtlichen a11y Probleme haben', async ({ page }) => {
    await page.goto('/')

    // Prüfe Landmark-Rollen
    await expect(page.getByRole('banner')).toBeVisible() // header
    await expect(page.getByRole('main')).toBeVisible()
    await expect(page.getByRole('contentinfo')).toBeVisible() // footer

    // Prüfe Skip-Link oder Heading-Struktur
    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toHaveCount(1)
  })
})

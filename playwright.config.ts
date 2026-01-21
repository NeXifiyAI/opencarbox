import { defineConfig, devices } from '@playwright/test'

/**
 * ============================================================
 * Playwright E2E Test Konfiguration
 * ============================================================
 * 
 * Dokumentation: https://playwright.dev/docs/test-configuration
 * 
 * Ausführen:
 *   pnpm test:e2e        # Alle Tests
 *   pnpm test:e2e:ui     # Mit UI
 * 
 * ============================================================
 */

export default defineConfig({
  testDir: './e2e',
  
  // Parallele Ausführung
  fullyParallel: true,
  
  // Keine Retries in CI
  retries: process.env.CI ? 2 : 0,
  
  // Worker-Anzahl
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],
  
  // Globale Einstellungen
  use: {
    // Base URL
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    
    // Traces bei Failure sammeln
    trace: 'on-first-retry',
    
    // Screenshots bei Failure
    screenshot: 'only-on-failure',
    
    // Video bei Failure
    video: 'retain-on-failure',
  },

  // Projekte (Browser)
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Weitere Browser bei Bedarf:
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    // Mobile:
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
  ],

  // Dev-Server starten (wenn nicht bereits läuft)
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
})

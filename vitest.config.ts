import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

/**
 * ============================================================
 * Vitest Konfiguration
 * ============================================================
 * 
 * Dokumentation: https://vitest.dev/config/
 * 
 * Ausführen:
 *   pnpm test           # Alle Tests
 *   pnpm test:ui        # Mit UI
 *   pnpm test:coverage  # Mit Coverage
 * 
 * ============================================================
 */

export default defineConfig({
  plugins: [react()],
  test: {
    // Test Environment
    environment: 'jsdom',
    
    // Globals (describe, it, expect)
    globals: true,
    
    // Setup-Datei
    setupFiles: ['./vitest.setup.ts'],
    
    // Test-Dateien
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: ['node_modules', '.next', 'e2e'],
    
    // Coverage
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        '.next/',
        'src/types/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/index.ts',
      ],
      thresholds: {
        statements: 60,
        branches: 60,
        functions: 60,
        lines: 60,
      },
    },
    
    // Reporter
    reporters: ['verbose'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

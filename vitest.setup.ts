import '@testing-library/jest-dom/vitest'

/**
 * ============================================================
 * Vitest Setup
 * ============================================================
 * 
 * Globale Setup-Datei für alle Unit-Tests.
 * 
 * ============================================================
 */

// Mock für next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock für next-themes
vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn(),
    resolvedTheme: 'light',
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}))

// Reset Mocks nach jedem Test
afterEach(() => {
  vi.clearAllMocks()
})

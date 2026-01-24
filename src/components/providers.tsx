'use client'

import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import { config } from '@/config'
import { BrandProvider } from '@/components/providers/brand-provider'

/**
 * ============================================================
 * Client-Side Providers
 * ============================================================
 * 
 * Zentrale Provider-Komponente für alle Client-Contexts:
 * - Brand (Multi-Site Theming)
 * - Theme (Dark/Light Mode)
 * - Toast Notifications
 * - Auth (optional via Supabase)
 * - State Management (optional)
 * 
 * ============================================================
 */

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <BrandProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme={config.theme.defaultMode}
        enableSystem={true}
        disableTransitionOnChange
      >
        {children}
        
        {/* Toast Notifications */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            className: 'font-sans',
          }}
          richColors
          closeButton
        />
      </ThemeProvider>
    </BrandProvider>
  )
}

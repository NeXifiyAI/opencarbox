import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { config } from '@/config'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/providers'
import '@/styles/globals.css'

/**
 * ============================================================
 * Root Layout
 * ============================================================
 * 
 * Zentrale Layout-Komponente für die gesamte App.
 * Konfiguration kommt aus project.config.ts
 * 
 * ============================================================
 */

// Google Font laden
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

// Metadata aus Config
export const metadata: Metadata = {
  title: {
    default: config.seo.defaultTitle,
    template: config.seo.titleTemplate,
  },
  description: config.seo.defaultDescription,
  keywords: config.seo.keywords,
  authors: [{ name: config.app.name }],
  creator: config.app.name,
  metadataBase: new URL(config.app.url),
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: config.app.defaultLocale,
    url: config.app.url,
    title: config.seo.defaultTitle,
    description: config.seo.defaultDescription,
    siteName: config.app.name,
    images: config.seo.ogImage ? [{ url: config.seo.ogImage }] : [],
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: config.seo.defaultTitle,
    description: config.seo.defaultDescription,
    images: config.seo.ogImage ? [config.seo.ogImage] : [],
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Icons
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  
  // Manifest
  manifest: '/site.webmanifest',
}

// Viewport aus Config
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: config.theme.colors.primary },
    { media: '(prefers-color-scheme: dark)', color: config.theme.colors.primary },
  ],
  width: 'device-width',
  initialScale: 1,
}

// Props
interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang={config.app.defaultLocale} 
      suppressHydrationWarning
      className={cn(inter.variable)}
    >
      <head>
        {/* Preconnect zu externen Services */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Supabase preconnect wenn konfiguriert */}
        {process.env.NEXT_PUBLIC_SUPABASE_URL && (
          <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
        )}
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable
        )}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

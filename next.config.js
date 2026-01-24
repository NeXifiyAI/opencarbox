/** @type {import('next').NextConfig} */
const nextConfig = {
  // ============================================================
  // Experimental Features
  // ============================================================
  experimental: {
    // Optimized Package Imports
    optimizePackageImports: ['lucide-react'],
  },

  // ============================================================
  // Font Optimization
  // ============================================================
  // Skip font optimization in CI environments without external network access
  // This prevents build failures when Google Fonts cannot be reached
  ...(process.env.CI && {
    optimizeFonts: false,
  }),

  // ============================================================
  // Image Optimization
  // ============================================================
  images: {
    remotePatterns: [
      // Supabase Storage
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      // Lokale Supabase Instanz
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
      // Weitere Domains hier hinzufügen
    ],
  },

  // ============================================================
  // Environment Variables (Public)
  // ============================================================
  env: {
    // App URL für absolute Links
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },

  // ============================================================
  // Headers (Security)
  // ============================================================
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Clickjacking Protection
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // XSS Protection
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Referrer Policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Permissions Policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },

  // ============================================================
  // Redirects (optional)
  // ============================================================
  async redirects() {
    return [
      // Beispiel: www zu non-www redirect
      // {
      //   source: '/:path*',
      //   has: [{ type: 'host', value: 'www.example.com' }],
      //   destination: 'https://example.com/:path*',
      //   permanent: true,
      // },
    ]
  },

  // ============================================================
  // Logging
  // ============================================================
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

module.exports = nextConfig

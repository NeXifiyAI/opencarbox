'use client'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { type FC, type ReactNode } from 'react'

interface ServiceLayoutProps {
  children: ReactNode
}

/**
 * Layout für den OpenCarBox Werkstatt-Bereich
 * Brand: OpenCarBox (Blau)
 */
const ServiceLayout: FC<ServiceLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="texture-noise flex-grow bg-slate-50">{children}</main>
      <Footer />
    </div>
  )
}

export default ServiceLayout

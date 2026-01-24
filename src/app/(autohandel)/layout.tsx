'use client'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { type FC, type ReactNode } from 'react'

interface AutohandelLayoutProps {
  children: ReactNode
}

/**
 * Layout für den OpenCarBox Autohandel-Bereich
 * Brand: OpenCarBox (Blau)
 */
const AutohandelLayout: FC<AutohandelLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="texture-noise flex-grow bg-slate-50">{children}</main>
      <Footer />
    </div>
  )
}

export default AutohandelLayout

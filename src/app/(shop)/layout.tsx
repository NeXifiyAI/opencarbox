'use client'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { type FC, type ReactNode } from 'react'

interface ShopLayoutProps {
  children: ReactNode
}

/**
 * Layout für den Carvantooo Shop-Bereich
 * Brand: Carvantooo (Rot)
 */
const ShopLayout: FC<ShopLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="texture-noise flex-grow bg-slate-50">{children}</main>
      <Footer />
    </div>
  )
}

export default ShopLayout

'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Brand-Typ
 */
export type Brand = 'carvantooo' | 'opencarbox'

/**
 * Brand Context
 */
interface BrandContextType {
  brand: Brand
  setBrand: (brand: Brand) => void
}

const BrandContext = createContext<BrandContextType | undefined>(undefined)

/**
 * Bestimmt den Brand basierend auf dem Pfad
 */
function getBrandFromPath(pathname: string): Brand {
  // Shop-Routen → Carvantooo
  if (pathname.startsWith('/shop')) {
    return 'carvantooo'
  }

  // Werkstatt-Routen → OpenCarBox
  if (pathname.startsWith('/werkstatt')) {
    return 'opencarbox'
  }

  // Autohandel-Routen → OpenCarBox
  if (pathname.startsWith('/fahrzeuge')) {
    return 'opencarbox'
  }

  // Default: OpenCarBox (Hauptmarke)
  return 'opencarbox'
}

/**
 * Brand Provider
 *
 * Verwaltet den aktiven Brand und wendet das entsprechende Theme an.
 */
export function BrandProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [brand, setBrand] = useState<Brand>(() => getBrandFromPath(pathname))

  // Brand basierend auf Route aktualisieren
  useEffect(() => {
    const newBrand = getBrandFromPath(pathname)
    if (newBrand !== brand) {
      setBrand(newBrand)
    }
  }, [pathname, brand])

  // data-brand Attribut am HTML-Element setzen
  useEffect(() => {
    document.documentElement.setAttribute('data-brand', brand)
  }, [brand])

  return <BrandContext.Provider value={{ brand, setBrand }}>{children}</BrandContext.Provider>
}

/**
 * Hook zum Zugriff auf den aktuellen Brand
 */
export function useBrand() {
  const context = useContext(BrandContext)

  if (context === undefined) {
    throw new Error('useBrand muss innerhalb eines BrandProvider verwendet werden')
  }

  return context
}

/**
 * Helper: Brand-spezifische Klassen
 */
export function getBrandClasses(brand: Brand) {
  return {
    primary: brand === 'carvantooo' ? 'bg-carvantooo-500' : 'bg-opencarbox-500',
    primaryHover: brand === 'carvantooo' ? 'hover:bg-carvantooo-600' : 'hover:bg-opencarbox-600',
    text: brand === 'carvantooo' ? 'text-carvantooo-500' : 'text-opencarbox-500',
    border: brand === 'carvantooo' ? 'border-carvantooo-500' : 'border-opencarbox-500',
    gradient:
      brand === 'carvantooo'
        ? 'bg-gradient-to-r from-carvantooo-500 to-carvantooo-700'
        : 'bg-gradient-to-r from-opencarbox-500 to-opencarbox-900',
  }
}

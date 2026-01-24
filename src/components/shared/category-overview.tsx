'use client'

import { type FC } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Wrench, Car, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const categories = [
  {
    title: 'Carvantooo Shop',
    description: 'Premium Autoteile mit HSN/TSN-Suche finden.',
    icon: ShoppingCart,
    href: '/shop',
    color: 'carvantooo',
    features: ['Über 100.000 Teile', 'Schnelle Lieferung', 'Sichere Bezahlung'],
  },
  {
    title: 'OpenCarBox Werkstatt',
    description: 'Meisterbetrieb für Inspektion & Reparatur.',
    icon: Wrench,
    href: '/werkstatt',
    color: 'opencarbox',
    features: ['Online-Terminbuchung', 'Faire Preise', 'Herstellervorgaben'],
  },
  {
    title: 'OpenCarBox Autohandel',
    description: 'Geprüfte Gebraucht- und Neuwagen.',
    icon: Car,
    href: '/fahrzeuge',
    color: 'opencarbox',
    features: ['Geprüfte Qualität', 'Finanzierung möglich', 'Inzahlungnahme'],
  },
]

/**
 * Bereichsübersicht für die Landing Page
 */
export const CategoryOverview: FC = () => {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      <div className="container-content relative z-10">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 font-display text-4xl font-bold text-slate-900 md:text-5xl"
          >
            Alles aus einer Hand
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl text-xl text-slate-600"
          >
            Egal ob Teile, Service oder Fahrzeugkauf – wir sind Ihr zuverlässiger Partner.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div
                className={cn(
                  'card-premium flex h-full flex-col border-t-4 p-8',
                  cat.color === 'carvantooo' ? 'border-t-carvantooo-500' : 'border-t-opencarbox-500'
                )}
              >
                <div
                  className={cn(
                    'mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110',
                    cat.color === 'carvantooo' ? 'bg-carvantooo-50' : 'bg-opencarbox-50'
                  )}
                >
                  <cat.icon
                    className={cn(
                      'h-8 w-8',
                      cat.color === 'carvantooo' ? 'text-carvantooo-500' : 'text-opencarbox-500'
                    )}
                  />
                </div>

                <h3 className="mb-3 font-display text-2xl font-bold text-slate-900">{cat.title}</h3>

                <p className="mb-6 flex-grow text-slate-600">{cat.description}</p>

                <ul className="mb-8 space-y-3">
                  {cat.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-500">
                      <div
                        className={cn(
                          'h-1.5 w-1.5 rounded-full',
                          cat.color === 'carvantooo' ? 'bg-carvantooo-500' : 'bg-opencarbox-500'
                        )}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={cat.href}
                  className={cn(
                    'inline-flex items-center gap-2 font-bold transition-all group-hover:gap-3',
                    cat.color === 'carvantooo' ? 'text-carvantooo-600' : 'text-opencarbox-600'
                  )}
                >
                  Entdecken
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

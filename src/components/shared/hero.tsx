'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { CheckCircle2, ChevronRight, Search } from 'lucide-react'
import { type FC } from 'react'

/**
 * Premium Hero Komponente für die Landing Page
 */
export const Hero: FC = () => {
  return (
    <section className="bg-mesh-red texture-noise relative flex min-h-[90vh] items-center justify-center overflow-hidden">
      {/* Animierte Hintergrund-Elemente */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"
      />

      <div className="container-content relative z-10 pt-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-slate-800 backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-carvantooo-500" />
            Willkommen bei Ihrer Automotive Premium Plattform
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8 font-display text-5xl font-extrabold tracking-tighter text-slate-900 md:text-7xl lg:text-8xl"
        >
          <span className="text-gradient-red">OpenCarBox</span>
          <br className="sm:hidden" />
          <span className="mx-4 hidden text-slate-400 sm:inline">&</span>
          <br className="sm:hidden" />
          <span className="text-gradient-blue">Carvantooo</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-slate-600 md:text-2xl"
        >
          Ihr Partner für <strong className="text-opencarbox-600">KFZ-Service</strong>,{' '}
          <strong className="text-opencarbox-600">Autohandel</strong> und{' '}
          <strong className="text-carvantooo-600">Premium Autoteile</strong>.
          <br />
          <span className="italic text-slate-500">"Weil das Auto zur Familie gehört."</span>
        </motion.p>

        {/* Fahrzeug-Finder Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="card-glass group relative mx-auto mb-12 max-w-3xl p-2 shadow-2xl sm:p-3"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-carvantooo-500/5 to-opencarbox-500/5 opacity-0 transition-opacity group-hover:opacity-100" />

          <div className="relative flex flex-col gap-6 rounded-xl bg-white/90 p-6 backdrop-blur-sm sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
                <Search className="h-5 w-5 text-carvantooo-500" />
                Fahrzeugspezifische Suche
              </h2>
              <div className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-400">
                <CheckCircle2 className="text-success h-3 w-3" />
                HSN/TSN Unterstützung
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="HSN/TSN oder Kennzeichen..."
                  className="h-14 w-full rounded-xl border border-slate-200 pl-5 pr-4 text-lg font-medium outline-none transition-all focus:border-carvantooo-500 focus:ring-4 focus:ring-carvantooo-500/10"
                />
              </div>
              <Button className="btn-gradient-red h-14 rounded-xl px-10 text-lg font-bold shadow-lg shadow-carvantooo-500/20 hover:scale-[1.02] active:scale-[0.98]">
                Teile finden
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" /> Über 1 Mio. Teile
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" /> 24h Express
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" /> Bestpreis Garantie
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Entdecken
          </span>
          <div className="h-12 w-[1px] bg-gradient-to-b from-slate-300 to-transparent" />
        </div>
      </motion.div>
    </section>
  )
}

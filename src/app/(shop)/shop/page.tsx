'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  Car,
  CheckCircle2,
  ChevronRight,
  Clock,
  Search,
  ShieldCheck,
  Star,
  Truck,
  Zap,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

/**
 * Carvantooo Shop Landing Page - kfzteile24 Inspired Premium Design
 */
export default function ShopPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* 1. Top Vehicle Finder Section (kfzteile24 Style) */}
      <section className="relative overflow-hidden bg-slate-900 pb-12 pt-8">
        <div className="bg-mesh-red absolute inset-0 opacity-10" />
        <div className="container-content relative z-10">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* Left: Headline */}
            <div className="text-white lg:col-span-5">
              <Badge variant="carvantooo" className="mb-4">
                Carvantooo Parts & Service
              </Badge>
              <h1 className="mb-6 font-display text-4xl font-bold leading-tight md:text-5xl">
                Die richtigen Teile für{' '}
                <span className="italic text-carvantooo-500">Dein Auto.</span>
              </h1>
              <p className="mb-8 max-w-md text-lg text-slate-400">
                Finden Sie garantiert passende Ersatzteile mit unserer HSN/TSN Suche oder über Ihr
                Fahrzeugmodell.
              </p>

              <div className="mt-12 hidden items-center gap-6 lg:flex">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-slate-900 bg-slate-800"
                    >
                      <Image src={`/api/placeholder/40/40`} alt="User" width={40} height={40} />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-0.5 text-yellow-400">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <Star className="h-3.5 w-3.5 fill-current" />
                  </div>
                  <p className="font-medium text-slate-400">4.9/5 von über 10.000 Kunden</p>
                </div>
              </div>
            </div>

            {/* Right: Finder Card */}
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="flex border-b">
                  <button className="flex flex-1 items-center justify-center gap-2 border-b-2 border-carvantooo-500 py-4 text-sm font-bold text-slate-900">
                    <Search className="h-4 w-4 text-carvantooo-500" /> HSN/TSN Suche
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-2 bg-slate-50 py-4 text-sm font-bold text-slate-500 hover:text-slate-900">
                    <Car className="h-4 w-4" /> Fahrzeug wählen
                  </button>
                </div>

                <div className="p-8">
                  <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                        HSN (2.1)
                      </label>
                      <Input
                        placeholder="z.B. 0603"
                        className="h-12 font-mono text-lg uppercase"
                        maxLength={4}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                        TSN (2.2)
                      </label>
                      <Input
                        placeholder="z.B. ADO"
                        className="h-12 font-mono text-lg uppercase"
                        maxLength={3}
                      />
                    </div>
                  </div>

                  <div className="mb-6 flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                      <Clock className="h-5 w-5 text-carvantooo-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-relaxed text-slate-600">
                        Sie finden diese Nummern in Ihrem Fahrzeugschein im mittleren Teil unter 2.1
                        und 2.2.
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="gradient-red"
                    size="xl"
                    className="group w-full rounded-xl shadow-lg shadow-carvantooo-500/20"
                  >
                    Passende Teile finden
                    <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Indicators */}
      <section className="border-b bg-white py-6">
        <div className="container-content">
          <div className="flex flex-wrap justify-between gap-6 lg:gap-12">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-carvantooo-500" />
              <span className="text-sm font-bold text-slate-700">100 Tage Rückgaberecht</span>
            </div>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
              <Truck className="h-5 w-5 text-carvantooo-500" />
              <span className="text-sm font-bold text-slate-700">Versand heute bis 18 Uhr</span>
            </div>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
              <ShieldCheck className="h-5 w-5 text-carvantooo-500" />
              <span className="text-sm font-bold text-slate-700">Sicher verschlüsselt</span>
            </div>
            <div className="flex hidden items-center gap-3 border-l border-slate-200 pl-6 md:flex">
              <Zap className="h-5 w-5 text-carvantooo-500" />
              <span className="text-sm font-bold text-slate-700">Bestpreis Garantie</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Tiles (kfzteile24 Style) */}
      <section className="container-content py-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="mb-2 font-display text-3xl font-bold text-slate-900">
              Ersatzteile nach Kategorie
            </h2>
            <p className="text-slate-500">
              Wählen Sie einen Bereich, um alle passenden Teile zu sehen.
            </p>
          </div>
          <Button
            variant="outline"
            className="hidden rounded-xl border-slate-200 font-bold sm:flex"
          >
            Alle Kategorien
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {[
            { name: 'Bremsanlage', icon: '🛑', color: 'bg-red-50' },
            { name: 'Filter', icon: '🧪', color: 'bg-blue-50' },
            { name: 'Motor', icon: '⚙️', color: 'bg-slate-100' },
            { name: 'Zündanlage', icon: '⚡', color: 'bg-orange-50' },
            { name: 'Fahrwerk', icon: '⛓️', color: 'bg-indigo-50' },
            { name: 'Karosserie', icon: '🚗', color: 'bg-emerald-50' },
            { name: 'Elektrik', icon: '💡', color: 'bg-yellow-50' },
            { name: 'Kühlung', icon: '❄️', color: 'bg-cyan-50' },
            { name: 'Auspuff', icon: '💨', color: 'bg-stone-100' },
            { name: 'Lenkung', icon: '🔘', color: 'bg-purple-50' },
            { name: 'Heizung', icon: '🔥', color: 'bg-orange-100' },
            { name: 'Reifen', icon: '🛞', color: 'bg-slate-900 text-white' },
          ].map((cat, i) => (
            <Link key={i} href={`/shop/kategorie/${cat.name.toLowerCase()}`} className="group">
              <div
                className={cn(
                  'flex h-full flex-col items-center gap-4 rounded-2xl border border-transparent p-6 text-center transition-all hover:border-carvantooo-200 hover:shadow-xl hover:shadow-slate-200/50',
                  cat.color || 'bg-white'
                )}
              >
                <span className="text-4xl transition-transform duration-300 group-hover:scale-110">
                  {cat.icon}
                </span>
                <span className="text-sm font-bold text-inherit">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Promotional Banners */}
      <section className="container-content py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-3xl bg-carvantooo-500 p-8">
            <div className="relative z-10 text-white">
              <Badge className="mb-4 border-none bg-white/20 text-white backdrop-blur-md">
                Sonderaktion
              </Badge>
              <h3 className="mb-4 font-display text-3xl font-bold">
                Bremswochen bei <br />
                Carvantooo
              </h3>
              <p className="mb-6 max-w-xs text-white/80">
                Sichern Sie sich bis zu 20% Rabatt auf alle Bremsscheiben und Beläge namhafter
                Hersteller.
              </p>
              <Button className="h-12 rounded-xl bg-white px-8 font-bold text-carvantooo-500 hover:bg-slate-100">
                Jetzt sparen
              </Button>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2 bg-[url('/api/placeholder/400/300')] bg-cover bg-center opacity-40 transition-transform duration-700 group-hover:scale-105" />
          </div>

          <div className="group relative overflow-hidden rounded-3xl bg-opencarbox-500 p-8">
            <div className="relative z-10 text-white">
              <Badge className="mb-4 border-none bg-white/20 text-white backdrop-blur-md">
                Werkstatt-Service
              </Badge>
              <h3 className="mb-4 font-display text-3xl font-bold">
                Direkt-Einbau <br />
                buchen
              </h3>
              <p className="mb-6 max-w-xs text-white/80">
                Teile online kaufen und direkt in unserer Meisterwerkstatt in 1030 Wien fachgerecht
                einbauen lassen.
              </p>
              <Button className="h-12 rounded-xl bg-white px-8 font-bold text-opencarbox-500 hover:bg-slate-100">
                Termin vereinbaren
              </Button>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2 bg-[url('/api/placeholder/400/300')] bg-cover bg-center opacity-40 transition-transform duration-700 group-hover:scale-105" />
          </div>
        </div>
      </section>

      {/* 5. Featured Brands */}
      <section className="mt-12 bg-slate-100/50 py-20">
        <div className="container-content">
          <div className="mb-12 text-center">
            <h2 className="mb-2 font-display text-2xl font-bold text-slate-900">
              Unsere Top-Marken
            </h2>
            <p className="text-slate-500">
              Nur Originalqualität von führenden Automobilzulieferern.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale transition-all duration-500 hover:grayscale-0">
            {/* Mock Logos */}
            {['BOSCH', 'ATE', 'MANN', 'BREMBO', 'SACHS', 'CASTROL'].map((brand) => (
              <span key={brand} className="text-2xl font-black tracking-tighter text-slate-400">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

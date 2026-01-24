'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Calendar, Car, ChevronRight, Fuel, Gauge, Info, Search, Settings2 } from 'lucide-react'

const vehicles = [
  {
    id: 1,
    title: 'Mercedes-Benz E 220 d AMG Line',
    price: 45900,
    year: 2021,
    mileage: 32500,
    fuel: 'Diesel',
    transmission: 'Automatik',
    power: '194 PS',
    image:
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
    featured: true,
  },
  {
    id: 2,
    title: 'BMW M3 Competition',
    price: 89900,
    year: 2022,
    mileage: 12800,
    fuel: 'Benzin',
    transmission: 'Automatik',
    power: '510 PS',
    image:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800',
    featured: true,
  },
  {
    id: 3,
    title: 'Audi Q5 40 TDI quattro',
    price: 52400,
    year: 2022,
    mileage: 21500,
    fuel: 'Diesel',
    transmission: 'Automatik',
    power: '204 PS',
    image:
      'https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&q=80&w=800',
    featured: false,
  },
]

/**
 * OpenCarBox Autohandel Landing Page
 */
export default function AutohandelPage() {
  return (
    <div className="pb-20">
      {/* Autohandel Hero */}
      <section className="relative overflow-hidden bg-slate-900 py-24 text-white">
        <div className="bg-mesh-blue absolute inset-0 opacity-30" />
        <div className="container-content relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl"
          >
            <h1 className="mb-8 font-display text-5xl font-bold md:text-7xl">
              Finden Sie Ihr <span className="text-opencarbox-500">Traumauto</span>
            </h1>
            <p className="mb-12 text-xl text-slate-400">
              Premium Gebrauchtwagen mit 100-Punkte-Check, Garantie und maßgeschneiderter
              Finanzierung. Professionell & Fair.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="btn-gradient-blue h-14 rounded-xl px-10 text-lg font-bold">
                Bestand ansehen
              </Button>
              <Button
                variant="outline"
                className="h-14 rounded-xl border-white/20 px-10 text-lg font-bold text-white hover:bg-white/10"
              >
                Inzahlungnahme
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="sticky top-20 z-40 border-b bg-white py-8 shadow-sm">
        <div className="container-content">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Marke, Modell oder Schlagwort..."
                className="h-12 w-full rounded-lg border border-slate-200 pl-12 pr-4 outline-none transition-all focus:border-opencarbox-500 focus:ring-4 focus:ring-opencarbox-500/10"
              />
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="h-12 gap-2">
                <Settings2 className="h-4 w-4" /> Filter
              </Button>
              <Button className="btn-gradient-blue h-12 px-8 font-bold">Angebote finden</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Listing */}
      <section className="container-content py-20">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="font-display text-3xl font-bold">Aktuelle Angebote</h2>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <Car className="h-4 w-4" /> 124 Fahrzeuge verfügbar
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((v, idx) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="card-premium group flex h-full flex-col overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={v.image}
                  alt={v.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute left-4 top-4">
                  {v.featured && (
                    <Badge
                      variant="default"
                      className="bg-opencarbox-500 px-3 py-1 font-bold text-white"
                    >
                      Top Angebot
                    </Badge>
                  )}
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="rounded-lg bg-white/90 px-4 py-2 text-lg font-bold text-slate-900 backdrop-blur-md">
                    € {v.price.toLocaleString('de-DE')}
                  </div>
                </div>
              </div>

              <div className="flex flex-grow flex-col p-6">
                <h3 className="mb-4 text-xl font-bold transition-colors group-hover:text-opencarbox-600">
                  {v.title}
                </h3>

                <div className="mb-6 grid grid-cols-2 gap-x-2 gap-y-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="h-4 w-4 text-opencarbox-500" />
                    EZ {v.year}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Gauge className="h-4 w-4 text-opencarbox-500" />
                    {v.mileage.toLocaleString('de-DE')} km
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Fuel className="h-4 w-4 text-opencarbox-500" />
                    {v.fuel}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Settings2 className="h-4 w-4 text-opencarbox-500" />
                    {v.transmission}
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between border-t pt-6">
                  <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
                    <Info className="h-3 w-3" /> Inkl. 12 Monate Garantie
                  </span>
                  <Button
                    variant="ghost"
                    className="gap-1 p-0 font-bold text-opencarbox-600 transition-all hover:gap-2 hover:bg-transparent"
                  >
                    Details <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            variant="outline"
            className="h-14 rounded-xl border-slate-200 px-12 text-lg font-bold hover:bg-slate-50"
          >
            Alle Fahrzeuge laden
          </Button>
        </div>
      </section>
    </div>
  )
}

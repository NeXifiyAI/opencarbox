'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Calendar, ChevronRight, Clock, ShieldCheck, Star, Wrench } from 'lucide-react'

/**
 * OpenCarBox Werkstatt Landing Page
 */
export default function WerkstattPage() {
  return (
    <div className="pb-20">
      {/* Service Hero */}
      <section className="relative overflow-hidden bg-slate-900 py-24 text-white">
        <div className="bg-mesh-blue absolute inset-0 opacity-30" />
        <div className="container-content relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-3xl"
          >
            <Badge variant="opencarbox" className="mb-6 px-4 py-1.5 text-sm font-bold">
              OpenCarBox Meisterbetrieb
            </Badge>
            <h1 className="mb-8 font-display text-5xl font-bold leading-tight md:text-7xl">
              Meisterlicher <span className="text-opencarbox-500">Service</span> für Ihr Auto
            </h1>
            <p className="mb-12 text-xl leading-relaxed text-slate-400">
              Von der Inspektion nach Herstellervorgaben bis zur komplexen Reparatur. Wir sorgen
              dafür, dass Ihr Fahrzeug sicher auf der Straße bleibt.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="btn-gradient-blue h-16 rounded-xl px-10 text-xl font-bold shadow-lg shadow-opencarbox-500/20">
                Termin online buchen
              </Button>
              <Button
                variant="outline"
                className="h-16 rounded-xl border-white/20 px-10 text-xl font-bold text-white hover:bg-white/10"
              >
                Unsere Leistungen
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="relative z-10 border-b bg-white py-12">
        <div className="container-content">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="group flex flex-col items-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-opencarbox-50 transition-transform duration-300 group-hover:scale-110">
                <ShieldCheck className="h-8 w-8 text-opencarbox-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Garantie erhalten</h3>
                <p className="max-w-[250px] text-sm text-slate-500">
                  Wartung streng nach Herstellervorgaben für vollen Garantieerhalt.
                </p>
              </div>
            </div>
            <div className="group flex flex-col items-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-opencarbox-50 transition-transform duration-300 group-hover:scale-110">
                <Wrench className="h-8 w-8 text-opencarbox-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Modernste Technik</h3>
                <p className="max-w-[250px] text-sm text-slate-500">
                  Präzise Diagnose mit aktuellster Hard- und Software.
                </p>
              </div>
            </div>
            <div className="group flex flex-col items-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-opencarbox-50 transition-transform duration-300 group-hover:scale-110">
                <Star className="h-8 w-8 text-opencarbox-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Höchste Qualität</h3>
                <p className="max-w-[250px] text-sm text-slate-500">
                  Verwendung von Originalteilen oder Erstausrüsterqualität.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Widget Section */}
      <section className="container-content py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-8 font-display text-4xl font-bold leading-tight md:text-5xl">
              Schnell & einfach zum <span className="text-opencarbox-500">Wunschtermin</span>
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-slate-600">
              Wählen Sie Ihren gewünschten Service, Ihr Fahrzeug und finden Sie in Echtzeit einen
              passenden Termin in unserer Werkstatt.
            </p>
            <ul className="space-y-6">
              {[
                { title: 'Service wählen', desc: 'Ölwechsel, Inspektion, Bremsen...' },
                { title: 'Zeit wählen', desc: 'Alle freien Slots auf einen Blick' },
                { title: 'Bestätigung erhalten', desc: 'Sofort per E-Mail & WhatsApp' },
              ].map((step, idx) => (
                <li key={step.title} className="group flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-opencarbox-500 font-bold text-white shadow-lg shadow-opencarbox-500/20 transition-transform group-hover:scale-110">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{step.title}</h4>
                    <p className="text-slate-500">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="card-premium relative overflow-hidden bg-white p-10 shadow-2xl"
          >
            <div className="absolute right-0 top-0 p-8 opacity-5">
              <Calendar className="h-32 w-32 text-opencarbox-500" />
            </div>

            <h3 className="mb-8 flex items-center gap-3 text-2xl font-bold text-slate-900">
              <Calendar className="h-6 w-6 text-opencarbox-500" />
              Termin anfragen
            </h3>

            <div className="relative z-10 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Leistung wählen</label>
                <div className="flex h-14 w-full cursor-pointer items-center rounded-xl border border-slate-200 bg-slate-50 px-4 font-medium text-slate-400 transition-colors hover:border-opencarbox-500">
                  Bitte wählen Sie eine Leistung...
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Fahrzeug (HSN/TSN)</label>
                <input
                  type="text"
                  placeholder="z.B. 0603 / BDE"
                  className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 font-medium outline-none transition-all focus:border-opencarbox-500 focus:ring-4 focus:ring-opencarbox-500/10"
                />
              </div>

              <Button className="btn-gradient-blue h-14 w-full rounded-xl text-lg font-bold shadow-lg shadow-opencarbox-500/20">
                Verfügbarkeit prüfen
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>

              <div className="flex items-center justify-center gap-4 pt-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3" /> Blitz-Antwort
                </div>
                <div className="h-1 w-1 rounded-full bg-slate-300" />
                <div className="text-success flex items-center gap-1.5">
                  <ShieldCheck className="h-3 w-3" /> SSL Verschlüsselt
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

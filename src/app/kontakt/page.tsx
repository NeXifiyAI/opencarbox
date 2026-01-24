'use client'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'

/**
 * Kontaktseite - OpenCarBox & Carvantooo
 */
export default function KontaktPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-grow pb-32 pt-20">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 text-center"
          >
            <h1 className="mb-6 font-display text-5xl font-bold md:text-6xl">
              Lassen Sie uns <span className="text-gradient-red">sprechen</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-slate-500">
              Haben Sie Fragen zu unseren Services, Fahrzeugen oder Ersatzteilen? Unser Team ist für
              Sie da – persönlich, schnell und kompetent.
            </p>
          </motion.div>

          <div className="grid items-start gap-12 lg:grid-cols-3">
            {/* Contact Info Cards */}
            <div className="space-y-6 lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="card-premium flex items-start gap-6 p-8"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-carvantooo-50">
                  <Phone className="h-6 w-6 text-carvantooo-500" />
                </div>
                <div>
                  <h3 className="mb-1 font-bold text-slate-900">Telefon</h3>
                  <p className="mb-2 text-sm text-slate-500">Mo-Fr: 08:00 - 18:00</p>
                  <a
                    href="tel:+43179813410"
                    className="text-lg font-bold text-carvantooo-600 transition-colors hover:text-carvantooo-700"
                  >
                    +43 1 798 134 10
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="card-premium flex items-start gap-6 p-8"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-opencarbox-50">
                  <Mail className="h-6 w-6 text-opencarbox-500" />
                </div>
                <div>
                  <h3 className="mb-1 font-bold text-slate-900">E-Mail</h3>
                  <p className="mb-2 text-sm text-slate-500">Wir antworten innerhalb von 24h</p>
                  <a
                    href="mailto:office@opencarbox.at"
                    className="text-lg font-bold text-opencarbox-600 transition-colors hover:text-opencarbox-700"
                  >
                    office@opencarbox.at
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="card-premium flex items-start gap-6 p-8"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                  <MapPin className="h-6 w-6 text-slate-600" />
                </div>
                <div>
                  <h3 className="mb-1 font-bold text-slate-900">Standort</h3>
                  <p className="mb-2 text-sm text-slate-500">Besuchen Sie uns vor Ort</p>
                  <address className="font-bold not-italic text-slate-700">
                    Rennweg 76, 1030 Wien
                    <br />
                    Österreich
                  </address>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="card-premium relative overflow-hidden bg-white p-10 shadow-2xl lg:col-span-2"
            >
              <div className="absolute right-0 top-0 p-8 opacity-5">
                <Send className="h-40 w-40 text-carvantooo-500" />
              </div>

              <h2 className="mb-8 font-display text-3xl font-bold">Nachricht senden</h2>

              <form className="relative z-10 space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Vor- & Nachname</label>
                    <input
                      type="text"
                      placeholder="Max Mustermann"
                      className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-5 font-medium outline-none transition-all focus:border-carvantooo-500 focus:ring-4 focus:ring-carvantooo-500/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">E-Mail Adresse</label>
                    <input
                      type="email"
                      placeholder="max@beispiel.at"
                      className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-5 font-medium outline-none transition-all focus:border-carvantooo-500 focus:ring-4 focus:ring-carvantooo-500/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Betreff</label>
                  <select className="h-14 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-5 font-medium outline-none transition-all focus:border-carvantooo-500 focus:ring-4 focus:ring-carvantooo-500/10">
                    <option>Allgemeine Anfrage</option>
                    <option>Werkstatt-Termin</option>
                    <option>Ersatzteile-Shop</option>
                    <option>Fahrzeugkauf / Inzahlungnahme</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Ihre Nachricht</label>
                  <textarea
                    placeholder="Wie können wir Ihnen helfen?"
                    rows={5}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-5 font-medium outline-none transition-all focus:border-carvantooo-500 focus:ring-4 focus:ring-carvantooo-500/10"
                  />
                </div>

                <div className="flex flex-col items-center justify-between gap-6 pt-4 sm:flex-row">
                  <p className="max-w-xs text-xs text-slate-400">
                    Mit dem Absenden erklären Sie sich mit unserer
                    <a
                      href="/datenschutz"
                      className="ml-1 font-bold text-carvantooo-500 hover:underline"
                    >
                      Datenschutzerklärung
                    </a>{' '}
                    einverstanden.
                  </p>
                  <Button className="btn-gradient-red group h-16 rounded-xl px-12 text-lg font-bold shadow-xl shadow-carvantooo-500/20">
                    Nachricht senden
                    <Send className="ml-2 h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-premium mt-20 rounded-3xl bg-gradient-to-r from-carvantooo-500 to-opencarbox-500 p-1"
          >
            <div className="flex flex-col items-center justify-between gap-8 rounded-[22px] bg-slate-900 p-8 md:flex-row md:p-12">
              <div className="flex items-center gap-6">
                <div className="bg-success/20 text-success flex h-20 w-20 items-center justify-center rounded-2xl">
                  <MessageCircle className="h-12 w-12" />
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-bold text-white">Lieber per WhatsApp?</h3>
                  <p className="text-slate-400">
                    Schreiben Sie uns direkt und unkompliziert. Wir antworten sofort.
                  </p>
                </div>
              </div>
              <Button className="bg-success hover:bg-success/90 shadow-success/20 h-16 rounded-xl px-12 text-xl font-bold text-white shadow-xl">
                WhatsApp Chat starten
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

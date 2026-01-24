import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { Link } from 'react-router-dom'
import { ChevronRight, RotateCcw, AlertCircle, FileText, CheckCircle2 } from 'lucide-react'
import { Button } from '../components/ui/button'

const RueckgabePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-[#4fd1c5]">
            Startseite
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#1e3a5f]">Rückgabe & Reklamation</span>
        </nav>

        <h1 className="mb-8 text-3xl font-bold text-[#1e3a5f]">Rückgabe & Reklamation</h1>

        <div className="space-y-8 rounded-lg bg-white p-8 shadow-sm">
          {/* Banner */}
          <div className="flex items-start gap-4 rounded-lg border border-blue-100 bg-blue-50 p-6">
            <RotateCcw className="h-8 w-8 flex-shrink-0 text-[#1e3a5f]" />
            <div>
              <h2 className="mb-2 text-lg font-bold text-[#1e3a5f]">30 Tage Rückgaberecht</h2>
              <p className="text-gray-600">
                Sie können Artikel innerhalb von 30 Tagen nach Erhalt ohne Angabe von Gründen an uns
                zurücksenden. Die Rücksendung ist für Sie kostenlos (innerhalb Österreichs).
              </p>
            </div>
          </div>

          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-[#1e3a5f]">
              <FileText className="h-5 w-5" /> So funktioniert die Rücksendung
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#1e3a5f] font-bold text-white">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Rücksendeantrag starten</h3>
                  <p className="text-sm text-gray-600">
                    Gehen Sie in Ihr Kundenkonto unter "Bestellungen" und wählen Sie "Artikel
                    zurücksenden".
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#1e3a5f] font-bold text-white">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Label ausdrucken</h3>
                  <p className="text-sm text-gray-600">
                    Drucken Sie das kostenlose Retourenlabel aus und kleben Sie es auf das Paket.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#1e3a5f] font-bold text-white">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Paket abgeben</h3>
                  <p className="text-sm text-gray-600">
                    Geben Sie das Paket bei einer Post-Filiale oder einem Paketshop ab.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#1e3a5f] font-bold text-white">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Geld zurückerhalten</h3>
                  <p className="text-sm text-gray-600">
                    Nach Prüfung der Ware erstatten wir den Betrag innerhalb von 5-7 Werktagen auf
                    Ihr ursprüngliches Zahlungsmittel.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/konto">
                <Button className="bg-[#4fd1c5] font-bold text-[#1e3a5f] hover:bg-[#38b2ac]">
                  Jetzt Rücksendung starten
                </Button>
              </Link>
            </div>
          </section>

          <div className="border-t border-gray-100 pt-8"></div>

          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-[#1e3a5f]">
              <AlertCircle className="h-5 w-5" /> Wichtige Hinweise
            </h2>
            <ul className="list-inside list-disc space-y-2 text-gray-600">
              <li>Die Ware muss unbenutzt, unbeschädigt und in der Originalverpackung sein.</li>
              <li>Einbauteile dürfen keine Montagespuren aufweisen.</li>
              <li>Öle und Flüssigkeiten dürfen nicht geöffnet sein.</li>
              <li>Bitte legen Sie den Rücksendeschein dem Paket bei.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-[#1e3a5f]">
              <CheckCircle2 className="h-5 w-5" /> Reklamation / Defekte Ware
            </h2>
            <p className="mb-4 text-gray-600">
              Sollte ein Artikel defekt oder falsch geliefert worden sein, kontaktieren Sie bitte
              direkt unseren Kundenservice. Wir kümmern uns umgehend um einen Austausch oder Ersatz.
            </p>
            <Link to="/kontakt" className="font-semibold text-[#4fd1c5] hover:underline">
              Zum Kontaktformular
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default RueckgabePage

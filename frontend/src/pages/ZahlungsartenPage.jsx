import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { Link } from 'react-router-dom'
import { ChevronRight, CreditCard, Wallet, Banknote } from 'lucide-react'

const ZahlungsartenPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-[#4fd1c5]">
            Startseite
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#1e3a5f]">Zahlungsarten</span>
        </nav>

        <h1 className="mb-8 text-3xl font-bold text-[#1e3a5f]">Zahlungsarten</h1>

        <div className="space-y-8 rounded-lg bg-white p-8 shadow-sm">
          <p className="mb-6 text-gray-600">
            Bei Carvantooo können Sie sicher und bequem bezahlen. Wir bieten Ihnen folgende
            Zahlungsmöglichkeiten an:
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Kreditkarte */}
            <div className="rounded-lg border border-gray-200 p-6 transition-colors hover:border-[#4fd1c5]">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-full bg-blue-50 p-2 text-[#1e3a5f]">
                  <CreditCard className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1e3a5f]">Kreditkarte</h3>
              </div>
              <p className="text-sm text-gray-600">
                Wir akzeptieren VISA, MasterCard und American Express. Die Belastung erfolgt mit
                Abschluss der Bestellung. Sicher verschlüsselte Übertragung per SSL.
              </p>
            </div>

            {/* PayPal */}
            <div className="rounded-lg border border-gray-200 p-6 transition-colors hover:border-[#4fd1c5]">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-full bg-blue-50 p-2 text-[#003087]">
                  <Wallet className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1e3a5f]">PayPal</h3>
              </div>
              <p className="text-sm text-gray-600">
                Bezahlen Sie einfach und schnell mit Ihrem PayPal-Konto. Sie werden am Ende des
                Bestellvorgangs direkt zu PayPal weitergeleitet.
              </p>
            </div>

            {/* Klarna */}
            <div className="rounded-lg border border-gray-200 p-6 transition-colors hover:border-[#4fd1c5]">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-full bg-pink-50 p-2 text-[#FFB3C7]">
                  <span className="text-lg font-bold">K.</span>
                </div>
                <h3 className="text-lg font-bold text-[#1e3a5f]">Klarna Rechnung</h3>
              </div>
              <p className="text-sm text-gray-600">
                Erst kaufen, später bezahlen. Mit Klarna Rechnung haben Sie 14 Tage Zeit, Ihre
                Rechnung zu begleichen.
              </p>
            </div>

            {/* Vorkasse */}
            <div className="rounded-lg border border-gray-200 p-6 transition-colors hover:border-[#4fd1c5]">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-full bg-gray-50 p-2 text-gray-600">
                  <Banknote className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1e3a5f]">Vorkasse / Überweisung</h3>
              </div>
              <p className="text-sm text-gray-600">
                Sie überweisen den Betrag vorab auf unser Bankkonto. Die Ware wird nach
                Zahlungseingang versendet.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-lg bg-blue-50 p-6">
            <h3 className="mb-2 font-bold text-[#1e3a5f]">Sicherheitshinweis</h3>
            <p className="text-sm text-gray-600">
              Ihre Daten werden bei uns durch modernste Sicherheitstechnologien geschützt. Wir
              nutzen SSL-Verschlüsselung für alle Transaktionen.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ZahlungsartenPage

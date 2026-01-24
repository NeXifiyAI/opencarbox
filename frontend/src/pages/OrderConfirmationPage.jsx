import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const OrderConfirmationPage = () => {
  const { orderId } = useParams()

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-lg border border-gray-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>

          <h1 className="mb-2 text-2xl font-bold text-[#1e3a5f]">
            Vielen Dank für Ihre Bestellung!
          </h1>
          <p className="mb-6 text-gray-600">
            Ihre Bestellung <span className="font-mono font-medium text-[#1e3a5f]">#{orderId}</span>{' '}
            wurde erfolgreich entgegengenommen. Sie erhalten in Kürze eine Bestätigung per E-Mail.
          </p>

          <div className="mb-8 rounded-lg bg-gray-50 p-4 text-left">
            <h3 className="mb-2 text-sm font-bold text-[#1e3a5f]">Nächste Schritte:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1e3a5f] text-xs text-white">
                  1
                </span>
                Auftragsbestätigung per E-Mail
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-500">
                  2
                </span>
                Versandvorbereitung
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-500">
                  3
                </span>
                Zustellung durch DHL
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <Link to="/">
              <Button className="w-full bg-[#1e3a5f] hover:bg-[#2d4a6f]">Zurück zum Shop</Button>
            </Link>
            <Link to="/konto">
              <Button variant="outline" className="w-full">
                Bestellung ansehen
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default OrderConfirmationPage

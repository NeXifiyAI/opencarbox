import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { Link } from 'react-router-dom'
import { ChevronRight, HelpCircle, ChevronDown } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion'

const HilfePage = () => {
  const faqs = [
    {
      q: 'Wie lange dauert die Lieferung?',
      a: 'Innerhalb Österreichs beträgt die Lieferzeit in der Regel 1-3 Werktage. Nach Deutschland liefern wir in 2-4 Werktagen.',
    },
    {
      q: 'Wie kann ich meine Bestellung verfolgen?',
      a: 'Sobald Ihre Bestellung versendet wurde, erhalten Sie eine E-Mail mit der Sendungsnummer und einem Link zur Nachverfolgung.',
    },
    {
      q: 'Kann ich Artikel zurücksenden?',
      a: 'Ja, Sie haben ein 30-tägiges Rückgaberecht. Die Rücksendung ist innerhalb Österreichs kostenlos. Nutzen Sie dazu einfach unser Retourenportal.',
    },
    {
      q: 'Welche Zahlungsarten werden akzeptiert?',
      a: 'Wir akzeptieren Kreditkarte (Visa, Mastercard), PayPal, Klarna Rechnung und Vorkasse.',
    },
    {
      q: 'Bieten Sie auch einen Einbauservice an?',
      a: 'Ja! In unserer OpenCarBox Werkstatt in Wien können Sie gekaufte Teile direkt einbauen lassen. Buchen Sie dazu einfach einen Termin online.',
    },
    {
      q: 'Sind die Teile Originalteile?',
      a: 'Wir führen sowohl Originalteile (OE) als auch hochwertige Erstausrüsterqualität von Markenherstellern wie Bosch, ATE, Brembo etc.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-[#4fd1c5]">
            Startseite
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#1e3a5f]">Hilfe & FAQ</span>
        </nav>

        <h1 className="mb-8 text-3xl font-bold text-[#1e3a5f]">Hilfe & Häufige Fragen</h1>

        <div className="rounded-lg bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <HelpCircle className="h-6 w-6 text-[#4fd1c5]" />
            <h2 className="text-xl font-semibold text-[#1e3a5f]">Oft gestellte Fragen</h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-[#4fd1c5]">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 rounded-lg bg-gray-50 p-6 text-center">
            <h3 className="mb-2 font-bold text-[#1e3a5f]">Frage nicht gefunden?</h3>
            <p className="mb-4 text-gray-600">Unser Kundenservice hilft Ihnen gerne weiter.</p>
            <Link to="/kontakt">
              <button className="rounded-lg bg-[#1e3a5f] px-6 py-2 font-semibold text-white transition-colors hover:bg-[#2d4a6f]">
                Kontakt aufnehmen
              </button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default HilfePage

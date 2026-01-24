'use client'

import { companyConfig } from '@/config/company'
import { Clock, Cookie, Eye, FileText, Lock, Server, Shield, UserCheck } from 'lucide-react'
import Link from 'next/link'

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-[#1e3a5f]">Datenschutzerklärung</h1>
          <p className="text-gray-600">
            Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß DSGVO
          </p>
        </div>

        <div className="space-y-8">
          {/* Einleitung */}
          <section className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4fd1c5]/10">
                <Shield className="h-6 w-6 text-[#4fd1c5]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1e3a5f]">1. Verantwortlicher</h2>
            </div>
            <p className="mb-4 text-gray-600">
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </p>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="font-semibold">{companyConfig.legalName}</p>
              <p>{companyConfig.address.street}</p>
              <p>
                {companyConfig.address.zip} {companyConfig.address.city}
              </p>
              <p className="mt-2">
                E-Mail:{' '}
                <a
                  href={`mailto:${companyConfig.contact.email}`}
                  className="text-[#4fd1c5] hover:underline"
                >
                  {companyConfig.contact.email}
                </a>
              </p>
              <p>Telefon: {companyConfig.contact.phone}</p>
            </div>
          </section>

          {/* Datenerfassung */}
          <section className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4fd1c5]/10">
                <Eye className="h-6 w-6 text-[#4fd1c5]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1e3a5f]">
                2. Datenerfassung auf unserer Website
              </h2>
            </div>

            <h3 className="mb-3 text-lg font-semibold">Automatisch erfasste Daten</h3>
            <p className="mb-4 text-gray-600">
              Beim Besuch unserer Website werden automatisch folgende Daten erfasst:
            </p>
            <ul className="mb-6 list-inside list-disc space-y-1 text-gray-600">
              <li>IP-Adresse (anonymisiert)</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>Browser-Typ und -Version</li>
              <li>Betriebssystem</li>
              <li>Referrer URL (zuvor besuchte Seite)</li>
            </ul>

            <h3 className="mb-3 text-lg font-semibold">Zweck der Verarbeitung</h3>
            <p className="text-gray-600">
              Diese Daten werden benötigt, um die Funktionalität unserer Website zu gewährleisten
              und unser Angebot zu verbessern. Eine Zusammenführung dieser Daten mit anderen
              Datenquellen wird nicht vorgenommen.
            </p>
          </section>

          {/* Cookies */}
          <section className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4fd1c5]/10">
                <Cookie className="h-6 w-6 text-[#4fd1c5]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1e3a5f]">3. Cookies</h2>
            </div>
            <p className="mb-4 text-gray-600">
              Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem
              Endgerät gespeichert werden und die Ihr Browser speichert.
            </p>

            <h3 className="mb-3 text-lg font-semibold">Arten von Cookies:</h3>
            <div className="space-y-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="font-medium text-[#1e3a5f]">Technisch notwendige Cookies</p>
                <p className="text-sm text-gray-600">
                  Für die Grundfunktionen der Website erforderlich (z.B. Warenkorb, Login)
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="font-medium text-[#1e3a5f]">Analyse-Cookies</p>
                <p className="text-sm text-gray-600">
                  Helfen uns zu verstehen, wie Besucher mit der Website interagieren (nur mit Ihrer
                  Einwilligung)
                </p>
              </div>
            </div>
          </section>

          {/* Bestellung */}
          <section className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4fd1c5]/10">
                <FileText className="h-6 w-6 text-[#4fd1c5]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1e3a5f]">4. Bestellung & Kundenkonto</h2>
            </div>
            <p className="mb-4 text-gray-600">Bei einer Bestellung erheben wir folgende Daten:</p>
            <ul className="mb-4 list-inside list-disc space-y-1 text-gray-600">
              <li>Name und Anschrift</li>
              <li>E-Mail-Adresse</li>
              <li>Telefonnummer (optional)</li>
              <li>Zahlungsdaten</li>
              <li>Fahrzeugdaten (für passende Ersatzteile)</li>
            </ul>
            <p className="text-gray-600">
              Diese Daten werden zur Vertragserfüllung und für gesetzliche Aufbewahrungspflichten (7
              Jahre gemäß österreichischem Recht) gespeichert.
            </p>
          </section>

          {/* Sicherheit */}
          <section className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4fd1c5]/10">
                <Lock className="h-6 w-6 text-[#4fd1c5]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1e3a5f]">5. Datensicherheit</h2>
            </div>
            <p className="mb-4 text-gray-600">
              Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten
              gegen Manipulation, Verlust oder unberechtigten Zugriff zu schützen:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                <Lock className="h-5 w-5 text-[#4fd1c5]" />
                <span className="text-gray-700">SSL/TLS-Verschlüsselung</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                <Server className="h-5 w-5 text-[#4fd1c5]" />
                <span className="text-gray-700">Sichere Serverinfrastruktur</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                <UserCheck className="h-5 w-5 text-[#4fd1c5]" />
                <span className="text-gray-700">Zugriffskontrollen</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                <Clock className="h-5 w-5 text-[#4fd1c5]" />
                <span className="text-gray-700">Regelmäßige Sicherheitsupdates</span>
              </div>
            </div>
          </section>

          {/* Ihre Rechte */}
          <section className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4fd1c5]/10">
                <UserCheck className="h-6 w-6 text-[#4fd1c5]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1e3a5f]">6. Ihre Rechte</h2>
            </div>
            <p className="mb-4 text-gray-600">Sie haben jederzeit das Recht auf:</p>
            <ul className="space-y-3">
              {[
                { title: 'Auskunft', desc: 'Über Ihre bei uns gespeicherten Daten' },
                { title: 'Berichtigung', desc: 'Unrichtiger personenbezogener Daten' },
                { title: 'Löschung', desc: 'Ihrer Daten (\"Recht auf Vergessenwerden\")' },
                { title: 'Einschränkung', desc: 'Der Verarbeitung Ihrer Daten' },
                { title: 'Datenübertragbarkeit', desc: 'Ihrer Daten in einem gängigen Format' },
                { title: 'Widerspruch', desc: 'Gegen die Verarbeitung Ihrer Daten' },
              ].map((right, index) => (
                <li key={index} className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
                  <span className="font-bold text-[#4fd1c5]">✓</span>
                  <div>
                    <span className="font-medium text-[#1e3a5f]">{right.title}</span>
                    <span className="text-gray-600"> – {right.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Beschwerde */}
          <section className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-[#1e3a5f]">7. Beschwerderecht</h2>
            <p className="mb-4 text-gray-600">
              Sie haben das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren:
            </p>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="font-semibold">Österreichische Datenschutzbehörde</p>
              <p>Barichgasse 40-42, 1030 Wien</p>
              <p>E-Mail: dsb@dsb.gv.at</p>
              <p>
                Website:{' '}
                <a
                  href="https://www.dsb.gv.at"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4fd1c5] hover:underline"
                >
                  www.dsb.gv.at
                </a>
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Stand: {new Date().toLocaleDateString('de-AT')}</p>
          <p className="mt-2">
            <Link href="/impressum" className="text-[#4fd1c5] hover:underline">
              Impressum
            </Link>
            {' | '}
            <Link href="/agb" className="text-[#4fd1c5] hover:underline">
              AGB
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

'use client'

import { companyConfig } from '@/config/company'
import { Building2, FileText, Globe, Mail, MapPin, Phone, Scale } from 'lucide-react'

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-[#1e3a5f]">Impressum</h1>
          <p className="text-gray-600">
            Angaben gemäß § 5 ECG und Offenlegungspflicht gemäß § 25 MedienG
          </p>
        </div>

        <div className="grid gap-8">
          {/* Firmeninformationen */}
          <section className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4fd1c5]/10">
                <Building2 className="h-6 w-6 text-[#4fd1c5]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1e3a5f]">Firmeninformationen</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-lg font-semibold text-gray-900">{companyConfig.legalName}</p>
                <p className="mt-2 text-gray-600">{companyConfig.description}</p>
              </div>
              <div className="space-y-2">
                <p>
                  <span className="text-gray-500">Geschäftsführer:</span>{' '}
                  <span className="font-medium">{companyConfig.ceo}</span>
                </p>
                <p>
                  <span className="text-gray-500">Gründung:</span>{' '}
                  <span className="font-medium">{companyConfig.founded}</span>
                </p>
                <p>
                  <span className="text-gray-500">Rechtsform:</span>{' '}
                  <span className="font-medium">{companyConfig.legal.form}</span>
                </p>
              </div>
            </div>
          </section>

          {/* Kontakt & Adresse */}
          <section className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4fd1c5]/10">
                <MapPin className="h-6 w-6 text-[#4fd1c5]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1e3a5f]">Kontakt & Adresse</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-[#4fd1c5]" />
                  <div>
                    <p className="font-medium">{companyConfig.address.street}</p>
                    <p className="text-gray-600">
                      {companyConfig.address.zip} {companyConfig.address.city}
                    </p>
                    <p className="text-gray-600">{companyConfig.address.country}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#4fd1c5]" />
                  <a
                    href={`tel:${companyConfig.contact.phone}`}
                    className="transition-colors hover:text-[#4fd1c5]"
                  >
                    {companyConfig.contact.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#4fd1c5]" />
                  <a
                    href={`mailto:${companyConfig.contact.email}`}
                    className="transition-colors hover:text-[#4fd1c5]"
                  >
                    {companyConfig.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-[#4fd1c5]" />
                  <a
                    href={`https://${companyConfig.contact.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-[#4fd1c5]"
                  >
                    {companyConfig.contact.website}
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Rechtliche Informationen */}
          <section className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4fd1c5]/10">
                <Scale className="h-6 w-6 text-[#4fd1c5]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1e3a5f]">Rechtliche Informationen</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <p>
                  <span className="text-gray-500">Firmenbuchnummer:</span>{' '}
                  <span className="font-medium">{companyConfig.legal.registerNumber}</span>
                </p>
                <p>
                  <span className="text-gray-500">UID-Nummer:</span>{' '}
                  <span className="font-medium">{companyConfig.legal.uid}</span>
                </p>
                <p>
                  <span className="text-gray-500">Firmenbuchgericht:</span>{' '}
                  <span className="font-medium">{companyConfig.legal.court}</span>
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-gray-500">Aufsichtsbehörde:</p>
                <p className="font-medium">{companyConfig.legal.authority}</p>
                <p className="text-sm text-gray-600">{companyConfig.legal.department}</p>
                <p className="text-sm text-gray-600">{companyConfig.legal.authorityAddress}</p>
              </div>
            </div>
          </section>

          {/* Gewerbeberechtigungen */}
          <section className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4fd1c5]/10">
                <FileText className="h-6 w-6 text-[#4fd1c5]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1e3a5f]">Gewerbeberechtigungen</h2>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 font-semibold text-gray-900">Anwendbare Rechtsvorschriften:</h3>
              <ul className="grid gap-2 md:grid-cols-2">
                {companyConfig.regulations.map((reg, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600">
                    <span className="text-[#4fd1c5]">•</span>
                    {reg}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-gray-900">Lizenzen:</h3>
              <ul className="space-y-2">
                {companyConfig.licenses.map((license, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600">
                    <span className="text-[#4fd1c5]">✓</span>
                    {license}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Streitschlichtung */}
          <section className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-[#1e3a5f]">Streitschlichtung</h2>
            <p className="mb-4 text-gray-600">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
              bereit:
            </p>
            <a
              href={companyConfig.dispute.euUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#4fd1c5] hover:underline"
            >
              {companyConfig.dispute.euUrl}
            </a>
            <p className="mt-4 text-gray-600">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Stand: {new Date().toLocaleDateString('de-AT')}</p>
        </div>
      </div>
    </main>
  )
}

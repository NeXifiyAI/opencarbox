'use client'

import { companyConfig } from '@/config/company'
import {
  Clock,
  CreditCard,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Shield,
  Truck,
  Twitter,
} from 'lucide-react'
import Link from 'next/link'

/**
 * Footer Component - Carvantooo Design System
 * Basierend auf finales_Design Branch
 * Navy Background + Teal Accents
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#1e3a5f] text-white">
      {/* Trust-Badges Sektion */}
      <div className="border-b border-[#4fd1c5]/20">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4fd1c5]/10">
                <Truck className="h-5 w-5 text-[#4fd1c5]" />
              </div>
              <div>
                <p className="text-sm font-semibold">Schneller Versand</p>
                <p className="text-xs text-gray-400">1-3 Werktage</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4fd1c5]/10">
                <Shield className="h-5 w-5 text-[#4fd1c5]" />
              </div>
              <div>
                <p className="text-sm font-semibold">30 Tage Rückgabe</p>
                <p className="text-xs text-gray-400">Kostenlos</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4fd1c5]/10">
                <CreditCard className="h-5 w-5 text-[#4fd1c5]" />
              </div>
              <div>
                <p className="text-sm font-semibold">Sichere Zahlung</p>
                <p className="text-xs text-gray-400">SSL-verschlüsselt</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4fd1c5]/10">
                <Clock className="h-5 w-5 text-[#4fd1c5]" />
              </div>
              <div>
                <p className="text-sm font-semibold">Kundenservice</p>
                <p className="text-xs text-gray-400">Mo-Fr 8-18 Uhr</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Haupt-Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Spalte 1: Unternehmen */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-[#4fd1c5]">{companyConfig.name}</h3>
            <p className="mb-4 text-sm text-gray-300">{companyConfig.claim}</p>
            <p className="text-sm text-gray-400">
              Ihr Premium-Partner für Autoteile, Werkstattservice und Gebrauchtwagen. Qualität und
              Vertrauen seit der Gründung.
            </p>
          </div>

          {/* Spalte 2: Kategorien */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-[#4fd1c5]">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/kategorien"
                  className="text-sm text-gray-300 transition-colors hover:text-[#4fd1c5]"
                >
                  Alle Kategorien
                </Link>
              </li>
              <li>
                <Link
                  href="/marken"
                  className="text-sm text-gray-300 transition-colors hover:text-[#4fd1c5]"
                >
                  Marken
                </Link>
              </li>
              <li>
                <Link
                  href="/werkstatt"
                  className="text-sm text-gray-300 transition-colors hover:text-[#4fd1c5]"
                >
                  Werkstatt
                </Link>
              </li>
              <li>
                <Link
                  href="/fahrzeuge"
                  className="text-sm text-gray-300 transition-colors hover:text-[#4fd1c5]"
                >
                  Fahrzeughandel
                </Link>
              </li>
              <li>
                <Link
                  href="/angebote"
                  className="text-sm text-gray-300 transition-colors hover:text-[#4fd1c5]"
                >
                  Angebote
                </Link>
              </li>
            </ul>
          </div>

          {/* Spalte 3: Service & Rechtliches */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-[#4fd1c5]">Service & Rechtliches</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/hilfe"
                  className="text-sm text-gray-300 transition-colors hover:text-[#4fd1c5]"
                >
                  Hilfe & FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-sm text-gray-300 transition-colors hover:text-[#4fd1c5]"
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <Link
                  href="/versand"
                  className="text-sm text-gray-300 transition-colors hover:text-[#4fd1c5]"
                >
                  Versand & Lieferung
                </Link>
              </li>
              <li>
                <Link
                  href="/zahlung"
                  className="text-sm text-gray-300 transition-colors hover:text-[#4fd1c5]"
                >
                  Zahlungsarten
                </Link>
              </li>
              <li>
                <Link
                  href="/rueckgabe"
                  className="text-sm text-gray-300 transition-colors hover:text-[#4fd1c5]"
                >
                  Rückgabe & Widerruf
                </Link>
              </li>
              <li>
                <Link
                  href="/impressum"
                  className="text-sm text-gray-300 transition-colors hover:text-[#4fd1c5]"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="text-sm text-gray-300 transition-colors hover:text-[#4fd1c5]"
                >
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link
                  href="/agb"
                  className="text-sm text-gray-300 transition-colors hover:text-[#4fd1c5]"
                >
                  AGB
                </Link>
              </li>
            </ul>
          </div>

          {/* Spalte 4: Kontakt */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-[#4fd1c5]">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#4fd1c5]" />
                <span className="text-sm text-gray-300">
                  {companyConfig.address.street}
                  <br />
                  {companyConfig.address.zip} {companyConfig.address.city}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-[#4fd1c5]" />
                <a
                  href={`tel:${companyConfig.contact.phone}`}
                  className="text-sm text-gray-300 transition-colors hover:text-[#4fd1c5]"
                >
                  {companyConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-[#4fd1c5]" />
                <a
                  href={`mailto:${companyConfig.contact.email}`}
                  className="text-sm text-gray-300 transition-colors hover:text-[#4fd1c5]"
                >
                  {companyConfig.contact.email}
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-[#4fd1c5]">Folgen Sie uns</p>
              <div className="flex gap-3">
                <a
                  href={companyConfig.social?.facebook || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4fd1c5]/10 transition-colors hover:bg-[#4fd1c5]/20"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5 text-[#4fd1c5]" />
                </a>
                <a
                  href={companyConfig.social?.instagram || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4fd1c5]/10 transition-colors hover:bg-[#4fd1c5]/20"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 text-[#4fd1c5]" />
                </a>
                <a
                  href={companyConfig.social?.twitter || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4fd1c5]/10 transition-colors hover:bg-[#4fd1c5]/20"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5 text-[#4fd1c5]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-[#4fd1c5]/20">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <p className="text-center text-sm text-gray-400 md:text-left">
              © {currentYear} {companyConfig.legalName}. Alle Rechte vorbehalten.
            </p>
            <p className="text-xs text-gray-500">
              {companyConfig.legal.uid} | {companyConfig.legal.registerNumber}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

import React from 'react'
import { Link } from 'react-router-dom'
import {
  Car,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  CreditCard,
  Truck,
} from 'lucide-react'
import { companyConfig } from '../../config/company'

const Footer = () => {
  return (
    <footer className="bg-[#1e3a5f] text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo & About */}
          <div className="lg:col-span-2">
            <Link to="/" className="mb-4 flex items-center gap-2">
              <div className="rounded-lg bg-white/10 p-2">
                <Car className="h-6 w-6 text-[#4fd1c5]" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">{companyConfig.name}</span>
                <p className="-mt-1 text-xs text-[#4fd1c5]">Weil dein Auto zur Familie gehört.</p>
              </div>
            </Link>
            <p className="mb-4 text-sm text-gray-300">
              {companyConfig.name} ist Ihr zuverlässiger Partner für hochwertige Kfz-Teile und
              Autozubehör. Mit über 3 Millionen Teilen im Sortiment finden Sie bei uns alles, was
              Ihr Auto braucht.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="rounded-lg bg-white/10 p-2 transition-all hover:bg-[#4fd1c5] hover:text-[#1e3a5f]"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-lg bg-white/10 p-2 transition-all hover:bg-[#4fd1c5] hover:text-[#1e3a5f]"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-lg bg-white/10 p-2 transition-all hover:bg-[#4fd1c5] hover:text-[#1e3a5f]"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#4fd1c5]">Schnelllinks</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/kategorien"
                  className="text-gray-300 transition-colors hover:text-[#4fd1c5]"
                >
                  Alle Kategorien
                </Link>
              </li>
              <li>
                <Link
                  to="/angebote"
                  className="text-gray-300 transition-colors hover:text-[#4fd1c5]"
                >
                  Aktuelle Angebote
                </Link>
              </li>
              <li>
                <Link to="/marken" className="text-gray-300 transition-colors hover:text-[#4fd1c5]">
                  Marken
                </Link>
              </li>
              <li>
                <Link
                  to="/neuheiten"
                  className="text-gray-300 transition-colors hover:text-[#4fd1c5]"
                >
                  Neuheiten
                </Link>
              </li>
              <li>
                <Link
                  to="/bestseller"
                  className="text-gray-300 transition-colors hover:text-[#4fd1c5]"
                >
                  Bestseller
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#4fd1c5]">Kundenservice</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/hilfe" className="text-gray-300 transition-colors hover:text-[#4fd1c5]">
                  Hilfe & FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/versand"
                  className="text-gray-300 transition-colors hover:text-[#4fd1c5]"
                >
                  Versand & Lieferung
                </Link>
              </li>
              <li>
                <Link
                  to="/rueckgabe"
                  className="text-gray-300 transition-colors hover:text-[#4fd1c5]"
                >
                  Rückgabe
                </Link>
              </li>
              <li>
                <Link
                  to="/zahlung"
                  className="text-gray-300 transition-colors hover:text-[#4fd1c5]"
                >
                  Zahlungsarten
                </Link>
              </li>
              <li>
                <Link
                  to="/kontakt"
                  className="text-gray-300 transition-colors hover:text-[#4fd1c5]"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#4fd1c5]">Kontakt</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-300">
                <Phone className="h-4 w-4 text-[#4fd1c5]" />
                <a
                  href={`tel:${companyConfig.contact.phone.replace(/\s/g, '')}`}
                  className="transition-colors hover:text-white"
                >
                  {companyConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Mail className="h-4 w-4 text-[#4fd1c5]" />
                <a
                  href={`mailto:${companyConfig.contact.email}`}
                  className="transition-colors hover:text-white"
                >
                  {companyConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <MapPin className="mt-0.5 h-4 w-4 text-[#4fd1c5]" />
                <span>
                  {companyConfig.legalName}
                  <br />
                  {companyConfig.address.street}
                  <br />
                  {companyConfig.address.zip} {companyConfig.address.city},{' '}
                  {companyConfig.address.country}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment & Shipping */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Zahlungsarten:</span>
              <div className="flex gap-2">
                <div className="rounded bg-white/10 px-2 py-1 text-xs">Visa</div>
                <div className="rounded bg-white/10 px-2 py-1 text-xs">Mastercard</div>
                <div className="rounded bg-white/10 px-2 py-1 text-xs">PayPal</div>
                <div className="rounded bg-white/10 px-2 py-1 text-xs">Klarna</div>
                <div className="rounded bg-white/10 px-2 py-1 text-xs">SEPA</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-[#4fd1c5]" />
              <span className="text-sm text-gray-300">Kostenloser Versand ab 120€</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#162d47]">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} {companyConfig.legalName}. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-4">
              <Link to="/impressum" className="transition-colors hover:text-[#4fd1c5]">
                Impressum
              </Link>
              <Link to="/datenschutz" className="transition-colors hover:text-[#4fd1c5]">
                Datenschutz
              </Link>
              <Link to="/agb" className="transition-colors hover:text-[#4fd1c5]">
                AGB
              </Link>
              <Link to="/widerruf" className="transition-colors hover:text-[#4fd1c5]">
                Widerrufsrecht
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

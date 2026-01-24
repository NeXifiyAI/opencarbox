'use client'

import { companyConfig } from '@/config/company'
import {
  AlertTriangle,
  CreditCard,
  FileText,
  RefreshCw,
  Scale,
  Shield,
  ShoppingCart,
  Truck,
} from 'lucide-react'
import Link from 'next/link'

export default function AGBPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-[#1e3a5f]">
            Allgemeine Geschäftsbedingungen
          </h1>
          <p className="text-gray-600">
            der {companyConfig.legalName} für den Online-Shop {companyConfig.name}
          </p>
        </div>

        <div className="space-y-8">
          {/* §1 Geltungsbereich */}
          <section className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4fd1c5]/10">
                <Scale className="h-6 w-6 text-[#4fd1c5]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1e3a5f]">§ 1 Geltungsbereich</h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                (1) Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB") gelten für alle
                Verträge, die zwischen der {companyConfig.legalName}, {companyConfig.address.street}
                , {companyConfig.address.zip} {companyConfig.address.city}
                (nachfolgend „Verkäufer") und dem Kunden (nachfolgend „Käufer") über den Online-Shop
                {companyConfig.name} geschlossen werden.
              </p>
              <p>
                (2) Abweichende Bedingungen des Käufers werden nicht Vertragsbestandteil, es sei
                denn, der Verkäufer stimmt ihrer Geltung ausdrücklich schriftlich zu.
              </p>
              <p>
                (3) Diese AGB gelten sowohl gegenüber Verbrauchern als auch gegenüber Unternehmern,
                es sei denn, in der jeweiligen Klausel wird eine Differenzierung vorgenommen.
              </p>
            </div>
          </section>

          {/* §2 Vertragsschluss */}
          <section className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4fd1c5]/10">
                <ShoppingCart className="h-6 w-6 text-[#4fd1c5]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1e3a5f]">§ 2 Vertragsschluss</h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                (1) Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes
                Angebot, sondern eine Aufforderung zur Bestellung dar.
              </p>
              <p>
                (2) Durch Anklicken des Buttons „Zahlungspflichtig bestellen" gibt der Käufer ein
                verbindliches Kaufangebot ab.
              </p>
              <p>
                (3) Der Verkäufer bestätigt den Eingang der Bestellung unverzüglich per E-Mail
                (Bestellbestätigung). Diese Bestätigung stellt noch keine Annahme des Angebots dar.
              </p>
              <p>
                (4) Der Vertrag kommt zustande, wenn der Verkäufer das Angebot durch eine
                Auftragsbestätigung oder durch Lieferung der Ware annimmt.
              </p>
            </div>
          </section>

          {/* §3 Preise & Zahlung */}
          <section className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4fd1c5]/10">
                <CreditCard className="h-6 w-6 text-[#4fd1c5]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1e3a5f]">
                § 3 Preise und Zahlungsbedingungen
              </h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                (1) Alle angegebenen Preise sind Endpreise inklusive der gesetzlichen Umsatzsteuer
                von derzeit 20%.
              </p>
              <p>
                (2) Zusätzlich anfallende Liefer- und Versandkosten werden vor Abschluss des
                Bestellvorgangs gesondert angegeben.
              </p>
              <p>
                (3) Dem Käufer stehen verschiedene Zahlungsmöglichkeiten zur Verfügung, die im
                Online-Shop angegeben werden.
              </p>
              <p>
                (4) Bei Zahlung per Vorkasse ist der Kaufpreis sofort nach Vertragsschluss fällig.
              </p>
            </div>
          </section>

          {/* §4 Lieferung */}
          <section className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4fd1c5]/10">
                <Truck className="h-6 w-6 text-[#4fd1c5]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1e3a5f]">§ 4 Lieferung und Versand</h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>(1) Die Lieferung erfolgt an die vom Käufer angegebene Lieferadresse.</p>
              <p>
                (2) Die Lieferzeit beträgt, sofern nicht anders angegeben, 1-3 Werktage innerhalb
                Österreichs.
              </p>
              <p>(3) Lieferungen ins Ausland können längere Lieferzeiten erfordern.</p>
              <p>
                (4) Sollte ein Produkt nicht lieferbar sein, wird der Käufer unverzüglich informiert
                und bereits geleistete Zahlungen werden erstattet.
              </p>
            </div>
          </section>

          {/* §5 Widerrufsrecht */}
          <section className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4fd1c5]/10">
                <RefreshCw className="h-6 w-6 text-[#4fd1c5]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1e3a5f]">
                § 5 Widerrufsrecht für Verbraucher
              </h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <div className="rounded-lg border border-[#4fd1c5]/20 bg-[#4fd1c5]/5 p-4">
                <p className="mb-2 font-semibold text-[#1e3a5f]">Widerrufsbelehrung</p>
                <p>
                  Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag
                  zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie
                  oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in
                  Besitz genommen haben.
                </p>
              </div>
              <p>
                Um Ihr Widerrufsrecht auszuüben, müssen Sie uns ({companyConfig.legalName},
                {companyConfig.address.street}, {companyConfig.address.zip}{' '}
                {companyConfig.address.city}, E-Mail: {companyConfig.contact.email}) mittels einer
                eindeutigen Erklärung über Ihren Entschluss, diesen Vertrag zu widerrufen,
                informieren.
              </p>
              <p>
                Weitere Informationen zum Widerrufsrecht finden Sie auf unserer
                <Link href="/rueckgabe" className="ml-1 text-[#4fd1c5] hover:underline">
                  Rückgabe & Widerruf-Seite
                </Link>
                .
              </p>
            </div>
          </section>

          {/* §6 Gewährleistung */}
          <section className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4fd1c5]/10">
                <Shield className="h-6 w-6 text-[#4fd1c5]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1e3a5f]">§ 6 Gewährleistung und Garantie</h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                (1) Es gelten die gesetzlichen Gewährleistungsrechte nach österreichischem Recht.
              </p>
              <p>(2) Für neue Waren beträgt die Gewährleistungsfrist 2 Jahre ab Übergabe.</p>
              <p>
                (3) Etwaige Herstellergarantien bleiben von den gesetzlichen Gewährleistungsrechten
                unberührt.
              </p>
              <p>
                (4) Bei Mängeln hat der Käufer zunächst Anspruch auf Verbesserung oder Austausch.
                Schlägt dies fehl, kann er Preisminderung oder Wandlung verlangen.
              </p>
            </div>
          </section>

          {/* §7 Haftung */}
          <section className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4fd1c5]/10">
                <AlertTriangle className="h-6 w-6 text-[#4fd1c5]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1e3a5f]">§ 7 Haftung</h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>(1) Der Verkäufer haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit.</p>
              <p>
                (2) Bei leichter Fahrlässigkeit haftet der Verkäufer nur bei Verletzung wesentlicher
                Vertragspflichten und der Höhe nach begrenzt auf den vorhersehbaren,
                vertragstypischen Schaden.
              </p>
              <p>
                (3) Die Haftung für Personenschäden und nach dem Produkthaftungsgesetz bleibt
                unberührt.
              </p>
            </div>
          </section>

          {/* §8 Schlussbestimmungen */}
          <section className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4fd1c5]/10">
                <FileText className="h-6 w-6 text-[#4fd1c5]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1e3a5f]">§ 8 Schlussbestimmungen</h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>(1) Es gilt österreichisches Recht unter Ausschluss des UN-Kaufrechts.</p>
              <p>
                (2) Gerichtsstand für alle Streitigkeiten ist, soweit gesetzlich zulässig, Wien,
                Österreich.
              </p>
              <p>
                (3) Die EU-Kommission stellt eine Plattform für die außergerichtliche
                Online-Streitbeilegung bereit:
                <a
                  href={companyConfig.dispute.euUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-[#4fd1c5] hover:underline"
                >
                  {companyConfig.dispute.euUrl}
                </a>
              </p>
              <p>
                (4) Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit
                der übrigen Bestimmungen unberührt.
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
            <Link href="/datenschutz" className="text-[#4fd1c5] hover:underline">
              Datenschutz
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

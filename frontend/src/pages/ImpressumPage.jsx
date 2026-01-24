import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { companyConfig } from '../config/company'

const ImpressumPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-[#4fd1c5]">
            Startseite
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#1e3a5f]">Impressum</span>
        </nav>

        <h1 className="mb-2 text-3xl font-bold text-[#1e3a5f]">
          {companyConfig.name} by OpenCarBox
        </h1>
        <p className="mb-8 text-gray-600">
          Informationspflicht gemäß § 5 ECG (E-Commerce-Gesetz) und § 14 UGB
          (Unternehmensgesetzbuch)
        </p>

        <div className="space-y-8 rounded-lg bg-white p-8 shadow-sm">
          <section>
            <h2 className="mb-4 border-b pb-2 text-xl font-bold text-[#1e3a5f]">
              Unternehmensdaten
            </h2>
            <div className="space-y-3 text-gray-600">
              <p>
                <span className="block font-semibold text-gray-800">Firmenname:</span>
                {companyConfig.legalName}
              </p>
              <p>
                <span className="block font-semibold text-gray-800">Geschäftsführer:</span>
                {companyConfig.ceo}
              </p>
              <p>
                <span className="block font-semibold text-gray-800">Gründungsjahr:</span>
                {companyConfig.founded}
              </p>
              <p>
                <span className="block font-semibold text-gray-800">Tätigkeitsbeschreibung:</span>
                {companyConfig.description}
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 border-b pb-2 text-xl font-bold text-[#1e3a5f]">Kontaktdaten</h2>
            <div className="space-y-3 text-gray-600">
              <p>
                <span className="block font-semibold text-gray-800">Adresse:</span>
                {companyConfig.address.street}
                <br />
                {companyConfig.address.zip} {companyConfig.address.city}
                <br />
                {companyConfig.address.country}
              </p>
              <p>
                <span className="block font-semibold text-gray-800">Telefon:</span>
                <a
                  href={`tel:${companyConfig.contact.phone.replace(/\s/g, '')}`}
                  className="hover:text-[#4fd1c5]"
                >
                  {companyConfig.contact.phone}
                </a>
              </p>
              <p>
                <span className="block font-semibold text-gray-800">E-Mail:</span>
                <a href={`mailto:${companyConfig.contact.email}`} className="hover:text-[#4fd1c5]">
                  {companyConfig.contact.email}
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 border-b pb-2 text-xl font-bold text-[#1e3a5f]">
              Rechtliche Angaben
            </h2>
            <div className="grid gap-6 text-gray-600 md:grid-cols-2">
              <p>
                <span className="font-semibold text-gray-800">Firmenbuch-Nr.:</span>{' '}
                {companyConfig.legal.registerNumber}
              </p>
              <p>
                <span className="font-semibold text-gray-800">UID-Nummer:</span>{' '}
                {companyConfig.legal.uid}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Firmenbuchgericht:</span>{' '}
                {companyConfig.legal.court}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Rechtsform:</span>{' '}
                {companyConfig.legal.form}
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 border-b pb-2 text-xl font-bold text-[#1e3a5f]">
              Aufsichtsbehörde & Gewerberechtliches
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <span className="block font-semibold text-gray-800">
                  Zuständige Gewerbebehörde:
                </span>
                {companyConfig.legal.authority}
                <br />
                {companyConfig.legal.department}
                <br />
                {companyConfig.legal.authorityAddress}
                <br />
                Telefon: {companyConfig.legal.authorityPhone}
              </p>

              <div>
                <span className="mb-2 block font-semibold text-gray-800">
                  Berufsrechtliche Regelungen:
                </span>
                <ul className="list-inside list-disc space-y-1 pl-2 text-sm">
                  {companyConfig.regulations.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="mb-2 block font-semibold text-gray-800">
                  Gewerbeberechtigungen:
                </span>
                <ul className="list-inside list-disc space-y-1 pl-2 text-sm">
                  {companyConfig.licenses.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 border-b pb-2 text-xl font-bold text-[#1e3a5f]">
              Technologie & KI-Einsatz
            </h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="mb-1 font-semibold text-gray-800">
                  Einsatz von Künstlicher Intelligenz
                </h3>
                <p>
                  Auf unserer Website verwenden wir KI-gestützte Systeme für den Kundenservice-Chat.
                  Diese Technologie dient der besseren Beratung und schnelleren Beantwortung von
                  Anfragen. Alle Daten werden dabei DSGVO-konform verarbeitet.
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-gray-800">
                  Automatisierte Entscheidungsfindung
                </h3>
                <p>
                  Im Rahmen unserer Dienstleistungen erfolgen keine automatisierten Entscheidungen
                  im Sinne des Art. 22 DSGVO, die rechtliche Wirkung für Sie entfalten oder Sie in
                  ähnlicher Weise erheblich beeinträchtigen würden.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 border-b pb-2 text-xl font-bold text-[#1e3a5f]">
              Haftungsausschluss
            </h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="mb-1 font-semibold text-gray-800">Haftung für Inhalte</h3>
                <p>
                  Als Diensteanbieter sind wir gemäß § 16 ECG für eigene Inhalte auf diesen Seiten
                  nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet,
                  übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach
                  Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen (§ 18 ECG).
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-gray-800">Haftung für Links</h3>
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
                  keinen Einfluss haben. Für diese fremden Inhalte können wir daher keine Gewähr
                  übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
                  oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum
                  Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-gray-800">Urheberrecht</h3>
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                  unterliegen dem österreichischen Urheberrechtsgesetz (UrhG). Die Vervielfältigung,
                  Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
                  Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw.
                  Erstellers.
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-gray-800">KI-generierte Inhalte</h3>
                <p>
                  Teile unserer Website-Inhalte können mit Unterstützung von KI-Systemen erstellt
                  worden sein. Alle Inhalte werden jedoch redaktionell überprüft und verantwortet.
                  Für die Richtigkeit und Vollständigkeit aller Informationen übernehmen wir die
                  volle Verantwortung.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 border-b pb-2 text-xl font-bold text-[#1e3a5f]">
              Online-Streitbeilegung & Verbraucherschutz
            </h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="mb-1 font-semibold text-gray-800">EU-Online-Streitbeilegung</h3>
                <p className="mb-2">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
                  bereit:
                  <a
                    href={companyConfig.dispute.euUrl}
                    className="ml-1 text-[#4fd1c5] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {companyConfig.dispute.euUrl}
                  </a>
                </p>
                <p>
                  Unsere E-Mail-Adresse für Streitbeilegungsverfahren:{' '}
                  <a
                    href={`mailto:${companyConfig.contact.email}`}
                    className="text-[#4fd1c5] hover:underline"
                  >
                    {companyConfig.contact.email}
                  </a>
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-gray-800">
                  Österreichische Schlichtungsstellen
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <span className="block font-medium text-gray-800">
                      Allgemeine Schlichtungsstelle:
                    </span>
                    Internet Ombudsmann
                    <br />
                    <a
                      href={`https://${companyConfig.dispute.ombudsmann}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4fd1c5] hover:underline"
                    >
                      {companyConfig.dispute.ombudsmann}
                    </a>
                  </div>
                  <div>
                    <span className="block font-medium text-gray-800">
                      KFZ-spezifische Schlichtung:
                    </span>
                    Automobil-Schiedsgericht beim ÖAMTC
                    <br />
                    <a
                      href={`https://${companyConfig.dispute.oeamtc}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4fd1c5] hover:underline"
                    >
                      {companyConfig.dispute.oeamtc}
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border-l-4 border-[#4fd1c5] bg-gray-50 p-4 text-sm italic">
                <p>
                  Hinweis: Wir sind grundsätzlich bereit, an Streitbeilegungsverfahren vor
                  Verbraucherschlichtungsstellen teilzunehmen, sind dazu jedoch nicht verpflichtet.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ImpressumPage

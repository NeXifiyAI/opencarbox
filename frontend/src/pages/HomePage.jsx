import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Sidebar from '../components/layout/Sidebar'
import HeroSlider from '../components/home/HeroSlider'
import BenefitsBar from '../components/home/BenefitsBar'
import CategoryGrid from '../components/home/CategoryGrid'
import FeaturedProducts from '../components/home/FeaturedProducts'
import TopBrands from '../components/home/TopBrands'
import AppBanner from '../components/home/AppBanner'
import InfoSection from '../components/home/InfoSection'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { Wrench, Car, ShoppingBag, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/button'

const HomePage = () => {
  const { cart } = useCart()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItems={cart.item_count} />

      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar - Hidden on mobile */}
          <div className="hidden w-64 flex-shrink-0 lg:block">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <HeroSlider />
            <BenefitsBar />

            {/* Platform Overview / Cross-Linking */}
            <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Shop Teaser */}
              <div className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="absolute right-0 top-0 -mr-4 -mt-4 h-24 w-24 rounded-bl-full bg-blue-50 transition-transform group-hover:scale-110" />
                <ShoppingBag className="relative z-10 mb-4 h-10 w-10 text-[#1e3a5f]" />
                <h3 className="relative z-10 mb-2 text-xl font-bold text-[#1e3a5f]">
                  Teile & Zubehör
                </h3>
                <p className="relative z-10 mb-4 text-sm text-gray-600">
                  Über 3 Millionen Ersatzteile für alle Marken. Top-Qualität zu fairen Preisen.
                </p>
                <Link
                  to="/kategorien"
                  className="flex items-center gap-1 text-sm font-bold text-[#4fd1c5] transition-all hover:gap-2"
                >
                  Zum Shop <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Workshop Teaser */}
              <div className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="absolute right-0 top-0 -mr-4 -mt-4 h-24 w-24 rounded-bl-full bg-teal-50 transition-transform group-hover:scale-110" />
                <Wrench className="relative z-10 mb-4 h-10 w-10 text-[#4fd1c5]" />
                <h3 className="relative z-10 mb-2 text-xl font-bold text-[#1e3a5f]">
                  Werkstatt-Service
                </h3>
                <p className="relative z-10 mb-4 text-sm text-gray-600">
                  Montage, Wartung und Reparatur. Buchen Sie Ihren Termin direkt online.
                </p>
                <Link
                  to="/werkstatt"
                  className="flex items-center gap-1 text-sm font-bold text-[#4fd1c5] transition-all hover:gap-2"
                >
                  Termin vereinbaren <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Dealership Teaser */}
              <div className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="absolute right-0 top-0 -mr-4 -mt-4 h-24 w-24 rounded-bl-full bg-gray-50 transition-transform group-hover:scale-110" />
                <Car className="relative z-10 mb-4 h-10 w-10 text-[#1e3a5f]" />
                <h3 className="relative z-10 mb-2 text-xl font-bold text-[#1e3a5f]">
                  Fahrzeugmarkt
                </h3>
                <p className="relative z-10 mb-4 text-sm text-gray-600">
                  Geprüfte Gebraucht- und Neuwagen. Finden Sie Ihr Traumauto bei uns.
                </p>
                <Link
                  to="/fahrzeuge"
                  className="flex items-center gap-1 text-sm font-bold text-[#4fd1c5] transition-all hover:gap-2"
                >
                  Fahrzeuge ansehen <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>

            <CategoryGrid />
            <FeaturedProducts />
            <TopBrands />
            <AppBanner />
            <InfoSection />

            {/* SEO Content */}
            <section className="mt-10 rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-[#1e3a5f]">
                Carvantooo - Die OpenCarBox Plattform
              </h2>
              <div className="prose prose-sm max-w-none text-gray-600">
                <p className="mb-4">
                  Carvantooo ist mehr als nur ein Online-Shop. Als Teil der OpenCarBox Plattform
                  bieten wir Ihnen ein ganzheitliches Erlebnis rund um Ihr Auto. Von hochwertigen
                  Ersatzteilen über professionelle Werkstatt-Services bis hin zum Fahrzeugkauf -
                  alles aus einer Hand.
                </p>

                <h3 className="mb-3 mt-6 text-lg font-semibold text-[#1e3a5f]">
                  Ein Ökosystem für Ihre Mobilität
                </h3>
                <ul className="mb-4 list-inside list-disc space-y-1">
                  <li>
                    <strong>Shop:</strong> Große Auswahl und niedrige Preise für 3 Mio. Teile
                  </li>
                  <li>
                    <strong>Werkstatt:</strong> Kompetente Meisterbetriebe für Einbau und Wartung
                  </li>
                  <li>
                    <strong>Handel:</strong> Zertifizierte Fahrzeuge mit Garantie
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage

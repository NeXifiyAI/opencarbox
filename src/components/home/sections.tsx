'use client'

import { featuredProducts } from '@/lib/mock-data'
import { ArrowRight, Car, ShoppingBag, Star, Wrench } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function PlatformOverview() {
  return (
    <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Shop Teaser */}
      <div className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
        <div className="absolute right-0 top-0 -mr-4 -mt-4 h-24 w-24 rounded-bl-full bg-blue-50 transition-transform group-hover:scale-110" />
        <ShoppingBag className="relative z-10 mb-4 h-10 w-10 text-[#1e3a5f]" />
        <h3 className="relative z-10 mb-2 text-xl font-bold text-[#1e3a5f]">Teile & Zubehör</h3>
        <p className="relative z-10 mb-4 text-sm text-gray-600">
          Über 3 Millionen Ersatzteile für alle Marken. Top-Qualität zu fairen Preisen.
        </p>
        <Link
          href="/kategorien"
          className="flex items-center gap-1 text-sm font-bold text-[#4fd1c5] transition-all hover:gap-2"
        >
          Zum Shop <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Workshop Teaser */}
      <div className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
        <div className="absolute right-0 top-0 -mr-4 -mt-4 h-24 w-24 rounded-bl-full bg-teal-50 transition-transform group-hover:scale-110" />
        <Wrench className="relative z-10 mb-4 h-10 w-10 text-[#4fd1c5]" />
        <h3 className="relative z-10 mb-2 text-xl font-bold text-[#1e3a5f]">Werkstatt-Service</h3>
        <p className="relative z-10 mb-4 text-sm text-gray-600">
          Montage, Wartung und Reparatur. Buchen Sie Ihren Termin direkt online.
        </p>
        <Link
          href="/werkstatt"
          className="flex items-center gap-1 text-sm font-bold text-[#4fd1c5] transition-all hover:gap-2"
        >
          Termin vereinbaren <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Dealership Teaser */}
      <div className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
        <div className="absolute right-0 top-0 -mr-4 -mt-4 h-24 w-24 rounded-bl-full bg-gray-50 transition-transform group-hover:scale-110" />
        <Car className="relative z-10 mb-4 h-10 w-10 text-[#1e3a5f]" />
        <h3 className="relative z-10 mb-2 text-xl font-bold text-[#1e3a5f]">Fahrzeugmarkt</h3>
        <p className="relative z-10 mb-4 text-sm text-gray-600">
          Geprüfte Gebraucht- und Neuwagen. Finden Sie Ihr Traumauto bei uns.
        </p>
        <Link
          href="/fahrzeuge"
          className="flex items-center gap-1 text-sm font-bold text-[#4fd1c5] transition-all hover:gap-2"
        >
          Fahrzeuge ansehen <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}

export function FeaturedProducts() {
  return (
    <section className="mt-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1e3a5f]">Top Angebote</h2>
        <Link
          href="/angebote"
          className="flex items-center gap-1 text-sm font-medium text-[#4fd1c5] transition-colors hover:text-[#38b2ac]"
        >
          Alle Angebote <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {featuredProducts.map((product) => (
          <Link key={product.id} href={`/produkt/${product.id}`} className="group">
            <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-[#4fd1c5]/30 hover:shadow-md">
              {/* Discount Badge */}
              {product.discount > 0 && (
                <div className="absolute left-2 top-2 z-10 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
                  -{product.discount}%
                </div>
              )}

              {/* Image */}
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-3">
                <p className="mb-1 text-xs text-gray-500">{product.brand}</p>
                <h3 className="mb-2 line-clamp-2 text-sm font-medium text-[#1e3a5f] transition-colors group-hover:text-[#4fd1c5]">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="mb-2 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-[#1e3a5f]">
                    {product.price.toFixed(2)} €
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-xs text-gray-400 line-through">
                      {product.originalPrice.toFixed(2)} €
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function TopBrands() {
  const brands = [
    { id: 'bosch', name: 'BOSCH' },
    { id: 'ate', name: 'ATE' },
    { id: 'brembo', name: 'Brembo' },
    { id: 'mann', name: 'MANN-FILTER' },
    { id: 'liquimoly', name: 'LIQUI MOLY' },
    { id: 'skf', name: 'SKF' },
    { id: 'luk', name: 'LuK' },
    { id: 'valeo', name: 'Valeo' },
  ]

  return (
    <section className="mt-10">
      <h2 className="mb-6 text-2xl font-bold text-[#1e3a5f]">Top Marken</h2>
      <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-4 gap-4 md:grid-cols-8">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/marke/${brand.id}`}
              className="flex items-center justify-center rounded-lg bg-gray-50 p-4 transition-colors hover:bg-[#4fd1c5]/10"
            >
              <span className="text-sm font-bold text-[#1e3a5f]">{brand.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SEOContent() {
  return (
    <section className="mt-10 rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-[#1e3a5f]">
        Carvantooo - Die OpenCarBox Plattform
      </h2>
      <div className="prose prose-sm max-w-none text-gray-600">
        <p className="mb-4">
          Carvantooo ist mehr als nur ein Online-Shop. Als Teil der OpenCarBox Plattform bieten wir
          Ihnen ein ganzheitliches Erlebnis rund um Ihr Auto. Von hochwertigen Ersatzteilen über
          professionelle Werkstatt-Services bis hin zum Fahrzeugkauf - alles aus einer Hand.
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
  )
}

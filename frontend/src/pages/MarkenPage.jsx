import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { carBrands } from '../data/mockData'

const MarkenPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-[#4fd1c5]">
            Startseite
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#1e3a5f]">Marken</span>
        </nav>

        <h1 className="mb-8 text-3xl font-bold text-[#1e3a5f]">Unsere Top Marken</h1>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
          {carBrands.map((brand) => (
            <Link
              key={brand.id}
              to={`/marke/${brand.id}`}
              className="group flex flex-col items-center justify-center rounded-lg border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-[#4fd1c5] hover:shadow-md"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center opacity-80 transition-opacity group-hover:opacity-100">
                {/* Fallback for logo if needed */}
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="font-bold text-gray-700 group-hover:text-[#1e3a5f]">
                {brand.name}
              </span>
            </Link>
          ))}

          {/* Add some more generic brands for filler */}
          {['Bosch', 'Continental', 'Mahle', 'Mann-Filter', 'Sachs', 'Valeo', 'Luk', 'SKF'].map(
            (name) => (
              <Link
                key={name}
                to={`/marke/${name.toLowerCase()}`}
                className="group flex flex-col items-center justify-center rounded-lg border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-[#4fd1c5] hover:shadow-md"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-xl font-bold text-gray-400 transition-colors group-hover:bg-[#4fd1c5] group-hover:text-white">
                  {name[0]}
                </div>
                <span className="font-bold text-gray-700 group-hover:text-[#1e3a5f]">{name}</span>
              </Link>
            )
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default MarkenPage

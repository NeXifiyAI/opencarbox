import React from 'react'
import { topBrands } from '../../data/mockData'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const TopBrands = () => {
  return (
    <section className="mt-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1e3a5f]">Top-Marken im Shop</h2>
        <Link
          to="/marken"
          className="flex items-center gap-1 text-sm font-medium text-[#4fd1c5] transition-colors hover:text-[#38b2ac]"
        >
          Alle Marken <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-4 gap-6 md:grid-cols-8">
          {topBrands.map((brand) => (
            <Link
              key={brand.id}
              to={`/marke/${brand.id}`}
              className="group flex items-center justify-center rounded-lg p-4 transition-colors hover:bg-gray-50"
            >
              <div className="flex h-12 w-24 items-center justify-center grayscale transition-all group-hover:grayscale-0">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'block'
                  }}
                />
                <span className="hidden text-sm font-semibold text-[#1e3a5f]">{brand.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TopBrands

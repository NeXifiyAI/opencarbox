'use client'

import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'
import { useState } from 'react'

/**
 * Filter Component for Shop
 */
export function ProductFilter() {
  const [priceRange, setPriceRange] = useState<string[]>([])
  const [brands, setBrands] = useState<string[]>([])

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold text-slate-900">Filter</h3>
        <Filter className="h-4 w-4 text-slate-400" />
      </div>

      <div className="space-y-6">
        {/* Price Filter */}
        <div>
          <h4 className="mb-3 text-sm font-semibold">Preis</h4>
          <div className="space-y-2">
            {[
              { id: 'p1', label: '0€ - 50€' },
              { id: 'p2', label: '50€ - 100€' },
              { id: 'p3', label: '100€ +' },
            ].map((range) => (
              <div key={range.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={range.id}
                  className="rounded border-slate-300 text-carvantooo-500 focus:ring-carvantooo-500"
                  onChange={(e) => {
                    if (e.target.checked) setPriceRange([...priceRange, range.id])
                    else setPriceRange(priceRange.filter((id) => id !== range.id))
                  }}
                />
                <label htmlFor={range.id} className="cursor-pointer text-sm text-slate-600">
                  {range.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Filter */}
        <div>
          <h4 className="mb-3 text-sm font-semibold">Marke</h4>
          <div className="space-y-2">
            {['BOSCH', 'ATE', 'BREMBO', 'MANN', 'SACHS'].map((brand) => (
              <div key={brand} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`brand-${brand}`}
                  className="rounded border-slate-300 text-carvantooo-500 focus:ring-carvantooo-500"
                  onChange={(e) => {
                    if (e.target.checked) setBrands([...brands, brand])
                    else setBrands(brands.filter((b) => b !== brand))
                  }}
                />
                <label htmlFor={`brand-${brand}`} className="cursor-pointer text-sm text-slate-600">
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Availability Filter */}
        <div>
          <h4 className="mb-3 text-sm font-semibold">Verfügbarkeit</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="instock"
                className="rounded border-slate-300 text-carvantooo-500 focus:ring-carvantooo-500"
                defaultChecked
              />
              <label htmlFor="instock" className="cursor-pointer text-sm text-slate-600">
                Auf Lager
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 border-t border-slate-100 pt-4">
          <Button className="w-full bg-carvantooo-500 text-white hover:bg-carvantooo-600">
            Anwenden
          </Button>
          <Button variant="ghost" className="w-full text-slate-500 hover:text-slate-700">
            Filter zurücksetzen
          </Button>
        </div>
      </div>
    </div>
  )
}

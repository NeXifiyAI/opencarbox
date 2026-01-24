'use client'

import { categories } from '@/lib/mock-data'
import {
  ArrowRight,
  Battery,
  Circle,
  Droplet,
  Hammer,
  Lightbulb,
  Settings,
  Sparkles,
  Wrench,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Settings,
  Circle,
  Battery,
  Droplet,
  Sparkles,
  Wrench,
  Lightbulb,
  Hammer,
}

export function CategoryGrid() {
  return (
    <section className="mt-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1e3a5f]">Kategorien</h2>
        <Link
          href="/kategorien"
          className="flex items-center gap-1 text-sm font-medium text-[#4fd1c5] transition-colors hover:text-[#38b2ac]"
        >
          Alle Kategorien <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {categories.slice(0, 6).map((category) => {
          const Icon = iconMap[category.icon] || Settings
          return (
            <Link key={category.id} href={`/kategorie/${category.id}`} className="group">
              <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-[#4fd1c5]/30 hover:shadow-md">
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/80 to-transparent" />
                  <div className="absolute bottom-2 left-2">
                    <Icon className="h-6 w-6 text-[#4fd1c5]" />
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="line-clamp-2 text-sm font-semibold text-[#1e3a5f] transition-colors group-hover:text-[#4fd1c5]">
                    {category.name.split(',')[0]}
                  </h3>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default CategoryGrid

'use client'

import { ProductFilter } from '@/components/shop/product-filter'
import { ProductGrid } from '@/components/shop/product-grid'
import { ProductSort } from '@/components/shop/product-sort'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { featuredProducts } from '@/lib/mock-data'
import { ChevronRight, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  // Mock data filtering
  const categoryName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1)
  const products = featuredProducts // In real app, filter by category

  return (
    <div className="container-content py-8">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="transition-colors hover:text-carvantooo-500">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/shop" className="transition-colors hover:text-carvantooo-500">
          Shop
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-slate-900">{categoryName}</span>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar Filters */}
        <aside className="hidden w-full flex-shrink-0 space-y-8 lg:block lg:w-64">
          <ProductFilter />
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="font-display text-2xl font-bold text-slate-900">{categoryName}</h1>
              <p className="mt-1 text-sm text-slate-500">{products.length} Produkte gefunden</p>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal className="mr-2 h-4 w-4" /> Filter
              </Button>
              <ProductSort />
            </div>
          </div>

          {/* Active Filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            >
              BOSCH <span className="ml-1 cursor-pointer">×</span>
            </Badge>
            <Button variant="link" size="sm" className="h-auto p-0 text-carvantooo-500">
              Alle Filter löschen
            </Button>
          </div>

          {/* Grid */}
          <ProductGrid products={products} />

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <div className="flex gap-2">
              <Button variant="outline" disabled>
                Zurück
              </Button>
              <Button variant="default" className="bg-carvantooo-500 hover:bg-carvantooo-600">
                1
              </Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Weiter</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { ProductCard } from '@/components/shared/product-card'
import { type FeaturedProduct } from '@/lib/mock-data'

interface ProductGridProps {
  products: FeaturedProduct[]
  isLoading?: boolean
}

export function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-[400px] animate-pulse rounded-xl bg-slate-100" />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-20 text-center">
        <h3 className="mb-2 text-lg font-bold text-slate-900">Keine Produkte gefunden</h3>
        <p className="text-slate-500">Bitte passen Sie Ihre Filter an.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          slug={product.name.toLowerCase().replace(/ /g, '-')}
          brand={product.brand}
          price={product.price}
          rating={product.rating}
          reviews={product.reviews}
          image={product.image}
        />
      ))}
    </div>
  )
}

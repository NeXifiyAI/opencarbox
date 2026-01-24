'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { featuredProducts } from '@/lib/mock-data'
import {
  Check,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Share2,
  ShieldCheck,
  Star,
  Truck,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  // Mock data lookup (in real app, fetch by ID/Slug)
  // For now we just pick the first featured product as a dummy
  const product = featuredProducts[0] || { name: params.slug }
  const [quantity, setQuantity] = useState(1)

  if (!product) return <div>Produkt nicht gefunden</div>

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
        <Link
          href={`/shop/kategorie/${product.category.toLowerCase()}`}
          className="transition-colors hover:text-carvantooo-500"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="max-w-xs truncate font-medium text-slate-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left: Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
            {product.discount > 0 && (
              <div className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 font-bold text-white shadow-lg">
                -{product.discount}%
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="relative aspect-square cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-white transition-colors hover:border-carvantooo-500"
              >
                <Image
                  src={product.image}
                  alt={`${product.name} ${i}`}
                  fill
                  className="object-cover opacity-80 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="outline" className="border-slate-300 text-slate-500">
              {product.brand}
            </Badge>
            {product.inStock && (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Auf Lager
              </Badge>
            )}
          </div>

          <h1 className="mb-4 font-display text-3xl font-bold leading-tight text-slate-900">
            {product.name}
          </h1>

          <div className="mb-6 flex items-center gap-4">
            <div className="flex items-center gap-0.5 text-yellow-400">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i <= Math.round(product.rating) ? 'fill-current' : 'text-slate-300'}`}
                />
              ))}
            </div>
            <span className="cursor-pointer text-sm text-slate-500 underline decoration-dotted underline-offset-2 hover:text-carvantooo-500">
              {product.reviews} Bewertungen
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-sm text-slate-500">Art.Nr.: 12345678</span>
          </div>

          <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
            <div className="mb-2 flex items-end gap-4">
              <span className="text-4xl font-bold text-slate-900">
                {product.price.toFixed(2)} €
              </span>
              {product.originalPrice > product.price && (
                <span className="mb-1 text-lg text-slate-400 line-through">
                  {product.originalPrice.toFixed(2)} €
                </span>
              )}
            </div>
            <p className="mb-6 text-xs text-slate-500">inkl. 20% MwSt., zzgl. Versandkosten</p>

            <div className="mb-4 flex gap-4">
              <div className="flex h-12 items-center rounded-lg border border-slate-300 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-full w-10 items-center justify-center text-slate-600 hover:bg-slate-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="h-full w-12 border-x border-slate-300 text-center focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-full w-10 items-center justify-center text-slate-600 hover:bg-slate-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button
                size="xl"
                className="flex-1 rounded-lg bg-carvantooo-500 font-bold text-white shadow-lg shadow-carvantooo-500/20 hover:bg-carvantooo-600"
              >
                In den Warenkorb
              </Button>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 border-slate-300 text-slate-700 hover:border-carvantooo-500 hover:bg-white"
              >
                <Heart className="mr-2 h-4 w-4" /> Merken
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-slate-300 text-slate-700 hover:border-carvantooo-500 hover:bg-white"
              >
                <Share2 className="mr-2 h-4 w-4" /> Teilen
              </Button>
            </div>
          </div>

          {/* USPs */}
          <div className="space-y-4 border-t border-slate-200 pt-6">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Passt für Ihr Fahrzeug</p>
                <p className="text-xs text-slate-500">VW Golf VII 2.0 TDI (150 PS)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
                <Truck className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Schnelle Lieferung</p>
                <p className="text-xs text-slate-500">Lieferung bis Mittwoch, 22.05.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100">
                <ShieldCheck className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">2 Jahre Garantie</p>
                <p className="text-xs text-slate-500">Volle Herstellergarantie inklusive</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

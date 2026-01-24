import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingCart, Star, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * Props für die ProductCard Komponente
 */
interface ProductCardProps {
  id: string | number
  name: string
  slug: string
  brand: string
  price: number
  image: string
  rating?: number
  reviews?: number
  className?: string
  onAddToCart?: (id: string | number) => void
}

/**
 * Premium Produktkarte für den Carvantooo Shop.
 * Implementiert das Design-System für Automotive E-Commerce.
 */
export const ProductCard = ({
  id,
  name,
  slug,
  brand,
  price,
  image,
  rating = 0,
  reviews = 0,
  className,
  onAddToCart,
}: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        'card-premium group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:border-carvantooo-200 hover:shadow-2xl hover:shadow-carvantooo-500/10',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Quick Add Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            onAddToCart?.(id)
          }}
          aria-label="In den Warenkorb"
          className="absolute bottom-4 right-4 flex h-12 w-12 translate-y-12 transform items-center justify-center rounded-full bg-white text-slate-900 opacity-0 shadow-xl transition-all hover:bg-carvantooo-500 hover:text-white active:scale-95 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ShoppingCart className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-grow flex-col p-6">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-carvantooo-500">
          {brand}
        </div>

        <Link href={`/shop/produkte/${slug}`} className="group/title block">
          <h3 className="mb-2 line-clamp-2 min-h-[3rem] font-display font-bold text-slate-900 transition-colors group-hover/title:text-carvantooo-600">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mb-6 flex items-center gap-2">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-3.5 w-3.5 fill-current',
                  i >= Math.floor(rating) && 'fill-none text-slate-200'
                )}
              />
            ))}
          </div>
          {reviews > 0 && <span className="text-xs font-medium text-slate-400">({reviews})</span>}
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Preis
            </span>
            <div className="font-display text-xl font-bold text-slate-900">
              € {price.toFixed(2)}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="p-0 font-bold text-carvantooo-600 transition-all hover:gap-2 hover:bg-transparent"
          >
            <Link href={`/shop/produkte/${slug}`}>
              Details <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

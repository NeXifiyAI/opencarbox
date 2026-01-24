import React from 'react'
import { Link } from 'react-router-dom'
import { Star, Heart, ShoppingCart } from 'lucide-react'
import { featuredProducts } from '../../data/mockData'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

const FeaturedProducts = () => {
  return (
    <section className="mt-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1e3a5f]">Top-Angebote</h2>
        <Link
          to="/angebote"
          className="text-sm font-medium text-[#4fd1c5] transition-colors hover:text-[#38b2ac]"
        >
          Alle Angebote ansehen
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="group overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
          >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Discount Badge */}
              <Badge className="absolute left-3 top-3 bg-red-500 font-bold text-white">
                -{product.discount}%
              </Badge>
              {/* Wishlist Button */}
              <button className="absolute right-3 top-3 rounded-full bg-white/90 p-2 opacity-0 backdrop-blur-sm transition-all hover:bg-[#4fd1c5] hover:text-white group-hover:opacity-100">
                <Heart className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Brand */}
              <span className="text-xs uppercase tracking-wider text-gray-500">
                {product.brand}
              </span>

              {/* Name */}
              <h3 className="mt-1 line-clamp-2 font-semibold text-[#1e3a5f] transition-colors group-hover:text-[#4fd1c5]">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="mt-2 flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">({product.reviews})</span>
              </div>

              {/* Price */}
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xl font-bold text-[#1e3a5f]">
                  {product.price.toFixed(2).replace('.', ',')} €
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {product.originalPrice.toFixed(2).replace('.', ',')} €
                </span>
              </div>

              {/* Stock Status */}
              <div className="mt-2 flex items-center gap-1">
                <span
                  className={`h-2 w-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}
                />
                <span className={`text-xs ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'Auf Lager' : 'Nicht verfügbar'}
                </span>
              </div>

              {/* Add to Cart Button */}
              <Button className="mt-4 flex w-full items-center justify-center gap-2 bg-[#1e3a5f] text-white hover:bg-[#2d4a6f]">
                <ShoppingCart className="h-4 w-4" />
                In den Warenkorb
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturedProducts

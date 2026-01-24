import React, { useState, useEffect } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { Link } from 'react-router-dom'
import { ChevronRight, Filter, Grid, List, Heart, ShoppingCart, Star } from 'lucide-react'
import { Button } from '../components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { featuredProducts } from '../data/mockData'
import { Badge } from '../components/ui/badge'

const SpecialProductsPage = ({ title, type }) => {
  const [viewMode, setViewMode] = useState('grid')
  // In a real app, fetch products based on 'type' (new, bestseller, offers)
  // For demo, we just shuffle or slice mock data
  const products = featuredProducts

  const getBreadcrumb = () => {
    switch (type) {
      case 'new':
        return 'Neuheiten'
      case 'bestseller':
        return 'Bestseller'
      case 'offers':
        return 'Angebote'
      default:
        return title
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-[#4fd1c5]">
            Startseite
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-[#1e3a5f]">{getBreadcrumb()}</span>
        </nav>

        <div className="mb-8 rounded-lg border border-gray-100 bg-white p-8 shadow-sm">
          <h1 className="mb-2 text-3xl font-bold text-[#1e3a5f]">{title}</h1>
          <p className="text-gray-600">
            {type === 'new' && 'Entdecken Sie die neuesten Produkte in unserem Sortiment.'}
            {type === 'bestseller' && 'Unsere beliebtesten Produkte - von Kunden empfohlen.'}
            {type === 'offers' && 'Sichern Sie sich die besten Schnäppchen und Rabatte.'}
          </p>
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{products.length} Artikel</span>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="relevanz">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sortieren nach" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevanz">Relevanz</SelectItem>
                <SelectItem value="preis-asc">Preis aufsteigend</SelectItem>
                <SelectItem value="preis-desc">Preis absteigend</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex overflow-hidden rounded border">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-[#1e3a5f] text-white' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-[#1e3a5f] text-white' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Products */}
        <div
          className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className={`group overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg ${viewMode === 'list' ? 'flex' : ''}`}
            >
              {/* Image */}
              <div
                className={`relative overflow-hidden ${viewMode === 'list' ? 'h-48 w-48 flex-shrink-0' : 'h-48'}`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.discount > 0 && (
                  <Badge className="absolute left-3 top-3 bg-red-500 font-bold text-white">
                    -{product.discount}%
                  </Badge>
                )}
                {type === 'new' && (
                  <Badge className="absolute left-3 top-3 bg-blue-500 font-bold text-white">
                    NEU
                  </Badge>
                )}
                <button className="absolute right-3 top-3 rounded-full bg-white/90 p-2 opacity-0 backdrop-blur-sm transition-all hover:bg-[#4fd1c5] hover:text-white group-hover:opacity-100">
                  <Heart className="h-4 w-4" />
                </button>
              </div>

              {/* Content */}
              <div className={`p-4 ${viewMode === 'list' ? 'flex flex-1 flex-col' : ''}`}>
                <span className="text-xs uppercase tracking-wider text-gray-500">
                  {product.brand}
                </span>
                <Link to={`/produkt/${product.id}`}>
                  <h3 className="mt-1 line-clamp-2 font-semibold text-[#1e3a5f] transition-colors group-hover:text-[#4fd1c5]">
                    {product.name}
                  </h3>
                </Link>

                <div className="mt-2 flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>

                <div
                  className={`mt-3 flex items-center gap-2 ${viewMode === 'list' ? 'mt-auto' : ''}`}
                >
                  <span className="text-xl font-bold text-[#1e3a5f]">
                    {product.price.toFixed(2).replace('.', ',')} €
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {product.originalPrice.toFixed(2).replace('.', ',')} €
                    </span>
                  )}
                </div>

                <Button className="mt-4 flex w-full items-center justify-center gap-2 bg-[#1e3a5f] text-white hover:bg-[#2d4a6f]">
                  <ShoppingCart className="h-4 w-4" />
                  In den Warenkorb
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default SpecialProductsPage

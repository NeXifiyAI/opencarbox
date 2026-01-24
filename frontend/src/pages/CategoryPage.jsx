import React, { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Sidebar from '../components/layout/Sidebar'
import { featuredProducts } from '../data/mockData' // Fallback if API fails or for initial render
import {
  Star,
  Heart,
  ShoppingCart,
  Filter,
  ChevronDown,
  Grid,
  List,
  ChevronRight,
  Loader,
} from 'lucide-react'
import { Button } from '../components/ui/button'
import ImageWithFallback from '../components/ui/ImageWithFallback'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { Checkbox } from '../components/ui/checkbox'
import { productService } from '../services/api'
import { useCart } from '../context/CartContext'
import { useToast } from '../hooks/use-toast'

const CategoryPage = () => {
  const { categoryId, subcategoryId } = useParams()
  const [viewMode, setViewMode] = useState('grid')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [categoryName, setCategoryName] = useState('')

  const { addToCart } = useCart()
  const { toast } = useToast()
  const location = useLocation()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const searchParams = new URLSearchParams(location.search)
        const searchQuery = searchParams.get('search')

        let data = []
        try {
          // Try fetching from real API
          const response = await productService.getAll({
            category: subcategoryId || categoryId,
            search: searchQuery,
          })
          data = response.items || response // Handle paginated or list response
        } catch (err) {
          console.warn('API fetch failed, falling back to mock data', err)
          // Fallback logic
          data = featuredProducts
        }

        // If data is empty (API returned nothing or failed), use mock data for demo purposes
        if (!data || data.length === 0) {
          data = featuredProducts
        }

        setProducts(data)
        setCategoryName(subcategoryId || categoryId || 'Kategorie')
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [categoryId, subcategoryId])

  const handleAddToCart = async (product) => {
    const result = await addToCart(product.id, 1)
    if (result.success) {
      toast({
        title: 'Hinzugefügt',
        description: `${product.name} wurde zum Warenkorb hinzugefügt.`,
      })
    } else {
      toast({
        variant: 'destructive',
        title: 'Fehler',
        description: 'Konnte nicht zum Warenkorb hinzugefügt werden.',
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-[#4fd1c5]">
            Startseite
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium capitalize text-[#1e3a5f]">{categoryName}</span>
        </nav>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="hidden w-64 flex-shrink-0 lg:block">
            <Sidebar />

            {/* Filters */}
            <div className="mt-6 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-[#1e3a5f]">
                <Filter className="h-4 w-4" /> Filter
              </h3>

              {/* Price Filter */}
              <div className="mb-4">
                <h4 className="mb-2 text-sm font-medium text-gray-700">Preis</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Von"
                    className="w-20 rounded border px-2 py-1 text-sm"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Bis"
                    className="w-20 rounded border px-2 py-1 text-sm"
                  />
                  <span>€</span>
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-4">
                <h4 className="mb-2 text-sm font-medium text-gray-700">Marke</h4>
                <div className="space-y-2">
                  {['BOSCH', 'BREMBO', 'MANN-FILTER', 'SKF', 'LIQUI MOLY'].map((brand) => (
                    <div key={brand} className="flex items-center gap-2">
                      <Checkbox id={brand} />
                      <label htmlFor={brand} className="text-sm text-gray-600">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Category Header */}
            <div className="mb-6 rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
              <h1 className="mb-2 text-2xl font-bold capitalize text-[#1e3a5f]">{categoryName}</h1>
              <p className="text-gray-600">{products.length} Produkte gefunden</p>
            </div>

            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{products.length} Ergebnisse</span>
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
                    <SelectItem value="bewertung">Beste Bewertung</SelectItem>
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

            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader className="h-8 w-8 animate-spin text-[#1e3a5f]" />
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
                }`}
              >
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`group overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    {/* Image */}
                    <div
                      className={`relative overflow-hidden ${
                        viewMode === 'list' ? 'h-48 w-48 flex-shrink-0' : 'h-48'
                      }`}
                    >
                      <ImageWithFallback
                        src={
                          product.image || product.images?.[0] || 'https://via.placeholder.com/400'
                        }
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {product.discount_percent && (
                        <Badge className="absolute left-3 top-3 bg-red-500 font-bold text-white">
                          -{product.discount_percent}%
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
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating || 4)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">({product.review_count || 0})</span>
                      </div>

                      <div
                        className={`mt-3 flex items-center gap-2 ${viewMode === 'list' ? 'mt-auto' : ''}`}
                      >
                        <span className="text-xl font-bold text-[#1e3a5f]">
                          {product.price?.toFixed(2).replace('.', ',')} €
                        </span>
                        {product.original_price && (
                          <span className="text-sm text-gray-400 line-through">
                            {product.original_price.toFixed(2).replace('.', ',')} €
                          </span>
                        )}
                      </div>

                      <div className="mt-2 flex items-center gap-1">
                        <span
                          className={`h-2 w-2 rounded-full ${product.is_active ? 'bg-green-500' : 'bg-red-500'}`}
                        />
                        <span
                          className={`text-xs ${product.is_active ? 'text-green-600' : 'text-red-600'}`}
                        >
                          {product.is_active ? 'Auf Lager' : 'Nicht verfügbar'}
                        </span>
                      </div>

                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="mt-4 flex w-full items-center justify-center gap-2 bg-[#1e3a5f] text-white hover:bg-[#2d4a6f]"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        In den Warenkorb
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button variant="outline" disabled>
                Zurück
              </Button>
              <Button variant="outline" className="bg-[#1e3a5f] text-white hover:bg-[#2d4a6f]">
                1
              </Button>
              <Button variant="outline">Weiter</Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default CategoryPage

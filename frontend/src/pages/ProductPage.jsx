import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { featuredProducts } from '../data/mockData'
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  RotateCcw,
  Shield,
  ChevronRight,
  Plus,
  Minus,
  Check,
  Info,
  Loader,
  Wrench,
  ArrowRight,
} from 'lucide-react'
import { Button } from '../components/ui/button'
import ImageWithFallback from '../components/ui/ImageWithFallback'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { productService } from '../services/api'
import { useCart } from '../context/CartContext'
import { useToast } from '../hooks/use-toast'

const ProductPage = () => {
  const { productId } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  const { addToCart } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        let data = null
        try {
          data = await productService.getById(productId)
        } catch (err) {
          console.warn('API fetch failed, falling back to mock data', err)
          data = featuredProducts.find((p) => p.id === parseInt(productId) || p.id === productId)
        }

        if (!data) {
          data = featuredProducts[0]
        }

        setProduct(data)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [productId])

  const handleAddToCart = async () => {
    if (!product) return

    const result = await addToCart(product.id, quantity)
    if (result.success) {
      toast({
        title: 'Hinzugefügt',
        description: `${quantity}x ${product.name} wurde zum Warenkorb hinzugefügt.`,
      })
    } else {
      toast({
        variant: 'destructive',
        title: 'Fehler',
        description: 'Konnte nicht zum Warenkorb hinzugefügt werden.',
      })
    }
  }

  if (loading || !product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader className="h-10 w-10 animate-spin text-[#1e3a5f]" />
      </div>
    )
  }

  const productImages = product.images || [product.image] || ['https://via.placeholder.com/600']

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
          <Link to="/kategorien" className="hover:text-[#4fd1c5]">
            Produkte
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="truncate font-medium text-[#1e3a5f]">{product.name}</span>
        </nav>

        <div className="mb-6 rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Product Images */}
            <div>
              <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-gray-100">
                <ImageWithFallback
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                {product.discount_percent && (
                  <Badge className="absolute left-4 top-4 bg-red-500 px-3 py-1 text-lg font-bold text-white">
                    -{product.discount_percent}%
                  </Badge>
                )}
                <button className="absolute right-4 top-4 rounded-full bg-white p-3 shadow-md transition-colors hover:bg-[#4fd1c5] hover:text-white">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
              {productImages.length > 1 && (
                <div className="flex gap-3">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`h-20 w-20 overflow-hidden rounded-lg border-2 transition-all ${
                        selectedImage === index
                          ? 'border-[#4fd1c5]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <ImageWithFallback src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <span className="text-sm uppercase tracking-wider text-gray-500">
                {product.brand}
              </span>
              <h1 className="mb-4 mt-1 text-2xl font-bold text-[#1e3a5f] md:text-3xl">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="mb-4 flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating || 4)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  ({product.review_count || 0} Bewertungen)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#1e3a5f]">
                  {product.price?.toFixed(2).replace('.', ',')} €
                </span>
                {product.original_price && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      {product.original_price.toFixed(2).replace('.', ',')} €
                    </span>
                    <Badge className="bg-red-100 text-red-600">
                      Sie sparen{' '}
                      {(product.original_price - product.price).toFixed(2).replace('.', ',')} €
                    </Badge>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6 flex items-center gap-2">
                <Check
                  className={`h-5 w-5 ${product.is_active ? 'text-green-500' : 'text-red-500'}`}
                />
                <span
                  className={`${product.is_active ? 'text-green-600' : 'text-red-600'} font-medium`}
                >
                  {product.is_active
                    ? 'Auf Lager - Lieferbar in 1-3 Werktagen'
                    : 'Derzeit nicht verfügbar'}
                </span>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center rounded-lg border">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 transition-colors hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 transition-colors hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  className="flex flex-1 items-center justify-center gap-2 bg-[#4fd1c5] py-6 text-lg font-semibold text-[#1e3a5f] hover:bg-[#38b2ac]"
                >
                  <ShoppingCart className="h-5 w-5" />
                  In den Warenkorb
                </Button>
              </div>

              {/* Cross-Sell Workshop Service */}
              <div className="mb-6 flex items-start gap-4 rounded-lg border border-[#4fd1c5] bg-[#e6fffa] p-4">
                <div className="rounded-full bg-white p-2 shadow-sm">
                  <Wrench className="h-6 w-6 text-[#1e3a5f]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#1e3a5f]">Einbau-Service gewünscht?</h3>
                  <p className="mt-1 text-sm text-gray-700">
                    Lassen Sie dieses Ersatzteil direkt in unserer OpenCarBox Werkstatt montieren.
                  </p>
                  <Link
                    to="/werkstatt"
                    className="group mt-2 inline-flex items-center text-sm font-bold text-[#1e3a5f] hover:text-[#4fd1c5]"
                  >
                    Termin vereinbaren{' '}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 gap-4 rounded-lg bg-gray-50 p-4 md:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-[#4fd1c5]" />
                  <span className="text-sm">Gratis Versand ab 120€</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-5 w-5 text-[#4fd1c5]" />
                  <span className="text-sm">30 Tage Rückgabe</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#4fd1c5]" />
                  <span className="text-sm">Herstellergarantie</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-4">
              <TabsTrigger value="description">Beschreibung</TabsTrigger>
              <TabsTrigger value="specifications">Spezifikationen</TabsTrigger>
              <TabsTrigger value="compatibility">Fahrzeuge</TabsTrigger>
              <TabsTrigger value="reviews">Bewertungen</TabsTrigger>
            </TabsList>

            <TabsContent value="description">
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold text-[#1e3a5f]">Produktbeschreibung</h3>
                <p className="mt-2 text-gray-600">
                  {product.description ||
                    `Hochwertige ${product.name} vom Markenhersteller ${product.brand}.`}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="specifications">
              <p>Keine Spezifikationen verfügbar.</p>
            </TabsContent>

            <TabsContent value="compatibility">
              <p className="mt-4 flex items-center gap-1 text-sm text-gray-500">
                <Info className="h-4 w-4" />
                Bitte überprüfen Sie die Kompatibilität mit Ihrem Fahrzeug vor dem Kauf.
              </p>
            </TabsContent>

            <TabsContent value="reviews">
              <p>Noch keine Bewertungen.</p>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ProductPage

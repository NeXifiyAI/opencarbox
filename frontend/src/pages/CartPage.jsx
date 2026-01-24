import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, Truck, Shield, Tag } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useCart } from '../context/CartContext'

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, applyCoupon } = useCart()
  const [couponCode, setCouponCode] = useState('')

  const cartItems = cart.items || []

  // Calculations (Backend handles this ideally, but good for UI responsiveness)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 120 ? 0 : 5.99
  const total = subtotal + shipping

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty < 1) return
    updateQuantity(id, newQty)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItems={cart.item_count} />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-[#1e3a5f]">Warenkorb</h1>

        {cartItems.length === 0 ? (
          <div className="rounded-lg border border-gray-100 bg-white p-12 text-center shadow-sm">
            <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-gray-300" />
            <h2 className="mb-2 text-xl font-semibold text-[#1e3a5f]">Ihr Warenkorb ist leer</h2>
            <p className="mb-6 text-gray-500">
              Entdecken Sie unsere Produkte und füllen Sie Ihren Warenkorb!
            </p>
            <Link to="/">
              <Button className="bg-[#4fd1c5] text-[#1e3a5f] hover:bg-[#38b2ac]">
                Weiter einkaufen
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="space-y-4 lg:col-span-2">
              {cartItems.map((item) => (
                <div
                  key={item.id || item.product_id}
                  className="flex gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <Link to={`/produkt/${item.product_id || item.id}`} className="flex-shrink-0">
                    <img
                      src={item.image || 'https://via.placeholder.com/150'}
                      alt={item.name}
                      className="h-24 w-24 rounded-lg object-cover"
                    />
                  </Link>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <span className="text-xs text-gray-500">{item.brand}</span>
                        <Link to={`/produkt/${item.product_id || item.id}`}>
                          <h3 className="font-semibold text-[#1e3a5f] transition-colors hover:text-[#4fd1c5]">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="mt-1 text-sm text-green-600">Auf Lager</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product_id || item.id)}
                        className="text-gray-400 transition-colors hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center rounded-lg border">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.product_id || item.id, item.quantity - 1)
                          }
                          className="p-2 transition-colors hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.product_id || item.id, item.quantity + 1)
                          }
                          className="p-2 transition-colors hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-[#1e3a5f]">
                          {(item.price * item.quantity).toFixed(2).replace('.', ',')} €
                        </span>
                        {item.quantity > 1 && (
                          <p className="text-xs text-gray-500">
                            {item.price.toFixed(2).replace('.', ',')} € / Stück
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Link
                to="/"
                className="inline-flex items-center font-medium text-[#4fd1c5] hover:text-[#38b2ac]"
              >
                <ArrowRight className="mr-1 h-4 w-4 rotate-180" />
                Weiter einkaufen
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-[#1e3a5f]">Bestellzusammenfassung</h2>

                {/* Coupon Code */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm text-gray-600">Gutscheincode</label>
                  <div className="flex gap-2">
                    <Input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Code eingeben"
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={() => applyCoupon(couponCode)}
                    >
                      <Tag className="h-4 w-4" />
                      Einlösen
                    </Button>
                  </div>
                </div>

                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Zwischensumme</span>
                    <span>{subtotal.toFixed(2).replace('.', ',')} €</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Versand</span>
                    <span className={shipping === 0 ? 'font-medium text-green-600' : ''}>
                      {shipping === 0 ? 'Kostenlos' : `${shipping.toFixed(2).replace('.', ',')} €`}
                    </span>
                  </div>
                  {subtotal < 120 && (
                    <p className="text-xs text-gray-500">
                      Noch {(120 - subtotal).toFixed(2).replace('.', ',')} € bis zum kostenlosen
                      Versand
                    </p>
                  )}
                  <div className="flex justify-between border-t pt-3 text-lg font-bold text-[#1e3a5f]">
                    <span>Gesamtsumme</span>
                    <span>{total.toFixed(2).replace('.', ',')} €</span>
                  </div>
                  <p className="text-xs text-gray-500">inkl. MwSt.</p>
                </div>

                <Link to="/kasse">
                  <Button className="mt-6 w-full bg-[#4fd1c5] py-6 text-lg font-semibold text-[#1e3a5f] hover:bg-[#38b2ac]">
                    Zur Kasse
                  </Button>
                </Link>

                {/* Trust Badges */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck className="h-4 w-4 text-[#4fd1c5]" />
                    <span>Gratis Versand ab 120€</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="h-4 w-4 text-[#4fd1c5]" />
                    <span>Sichere Zahlung</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default CartPage

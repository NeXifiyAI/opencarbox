import React, { useState, useEffect } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { LogOut, Package, User, MapPin, CreditCard, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const API = `${BACKEND_URL}/api`

const AccountPage = () => {
  const { user, logout, token } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(false)

  useEffect(() => {
    if (token) {
      fetchOrders()
    }
  }, [token])

  const fetchOrders = async () => {
    setLoadingOrders(true)
    try {
      const response = await axios.get(`${API}/orders/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setOrders(response.data)
    } catch (error) {
      console.error('Bestellungen konnten nicht geladen werden', error)
    } finally {
      setLoadingOrders(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Sidebar */}
          <aside className="w-full flex-shrink-0 md:w-64">
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-[#1e3a5f] text-2xl font-bold text-white">
                    {user?.first_name?.[0]}
                    {user?.last_name?.[0]}
                  </div>
                  <h2 className="text-lg font-bold">
                    {user?.first_name} {user?.last_name}
                  </h2>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" /> Abmelden
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <h1 className="mb-6 text-2xl font-bold text-[#1e3a5f]">Mein Konto</h1>

            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <Package className="h-4 w-4" /> Bestellungen
                </TabsTrigger>
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" /> Profil
                </TabsTrigger>
                <TabsTrigger value="addresses" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Adressen
                </TabsTrigger>
              </TabsList>

              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Meine Bestellungen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loadingOrders ? (
                      <p>Laden...</p>
                    ) : orders.length === 0 ? (
                      <div className="py-8 text-center text-gray-500">
                        <Package className="mx-auto mb-3 h-12 w-12 opacity-20" />
                        <p>Noch keine Bestellungen vorhanden.</p>
                        <Button className="mt-4 bg-[#1e3a5f]" onClick={() => navigate('/')}>
                          Jetzt einkaufen
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div
                            key={order.id}
                            className="flex flex-col items-start justify-between gap-4 rounded-lg border p-4 transition-colors hover:border-[#4fd1c5] sm:flex-row sm:items-center"
                          >
                            <div>
                              <div className="mb-1 flex items-center gap-3">
                                <span className="font-mono font-bold text-[#1e3a5f]">
                                  {order.order_number}
                                </span>
                                <span
                                  className={`rounded-full px-2 py-0.5 text-xs ${
                                    order.status === 'pending'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : order.status === 'delivered'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-800'
                                  }`}
                                >
                                  {order.status === 'pending' ? 'In Bearbeitung' : order.status}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500">
                                {new Date(order.created_at).toLocaleDateString('de-DE')} •{' '}
                                {order.items?.length} Artikel
                              </p>
                            </div>
                            <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end">
                              <span className="font-bold text-[#1e3a5f]">
                                {order.total?.toFixed(2).replace('.', ',')} €
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate(`/bestellung/${order.order_number}`)}
                              >
                                Details <ChevronRight className="ml-1 h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Persönliche Daten</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Vorname</label>
                        <p className="font-medium">{user?.first_name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Nachname</label>
                        <p className="font-medium">{user?.last_name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">E-Mail</label>
                        <p className="font-medium">{user?.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Telefon</label>
                        <p className="font-medium">{user?.phone || '-'}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="mt-6">
                      Daten bearbeiten
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="addresses">
                <Card>
                  <CardHeader>
                    <CardTitle>Adressbuch</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">
                      Hier können Sie Ihre Liefer- und Rechnungsadressen verwalten.
                    </p>
                    {/* Placeholder for Address Management */}
                    <Button className="mt-4 bg-[#1e3a5f]">Neue Adresse hinzufügen</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AccountPage

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import AdminLayout from './AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import {
  ShoppingCart,
  Users,
  Package,
  Euro,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  Truck,
  AlertTriangle,
} from 'lucide-react'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const API = `${BACKEND_URL}/api`

const AdminDashboard = () => {
  const { token } = useAuth()
  const [stats, setStats] = useState(null)
  const [recentOrders, setRecentOrders] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    try {
      const response = await axios.get(`${API}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setStats(response.data.stats)
      setRecentOrders(response.data.recent_orders || [])
      setTopProducts(response.data.top_products || [])
    } catch (error) {
      console.error('Dashboard laden fehlgeschlagen:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Umsatz heute',
      value: stats?.revenue_today?.toFixed(2).replace('.', ',') + ' €' || '0,00 €',
      icon: Euro,
      trend: '+12%',
      trendUp: true,
      color: 'bg-green-500',
    },
    {
      title: 'Bestellungen heute',
      value: stats?.orders_today || 0,
      icon: ShoppingCart,
      trend: '+5%',
      trendUp: true,
      color: 'bg-blue-500',
    },
    {
      title: 'Ausstehend',
      value: stats?.pending_orders || 0,
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      title: 'Niedriger Bestand',
      value: stats?.low_stock_products || 0,
      icon: AlertTriangle,
      color: 'bg-red-500',
    },
  ]

  const overviewCards = [
    {
      title: 'Gesamtumsatz',
      value: stats?.total_revenue?.toFixed(2).replace('.', ',') + ' €' || '0,00 €',
      icon: Euro,
    },
    {
      title: 'Bestellungen',
      value: stats?.total_orders || 0,
      icon: ShoppingCart,
    },
    {
      title: 'Kunden',
      value: stats?.total_customers || 0,
      icon: Users,
    },
    {
      title: 'Produkte',
      value: stats?.total_products || 0,
      icon: Package,
    },
  ]

  const getStatusBadge = (status) => {
    const config = {
      pending: { label: 'Ausstehend', class: 'bg-yellow-100 text-yellow-800' },
      confirmed: { label: 'Bestätigt', class: 'bg-blue-100 text-blue-800' },
      shipped: { label: 'Versendet', class: 'bg-purple-100 text-purple-800' },
      delivered: { label: 'Geliefert', class: 'bg-green-100 text-green-800' },
      cancelled: { label: 'Storniert', class: 'bg-red-100 text-red-800' },
    }
    const c = config[status] || config.pending
    return (
      <span className={`rounded-full px-2 py-1 text-xs font-medium ${c.class}`}>{c.label}</span>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Dashboard</h1>
          <p className="text-gray-500">Willkommen im Carvantooo Admin-Portal</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{stat.title}</p>
                      <p className="mt-1 text-2xl font-bold text-[#1e3a5f]">{stat.value}</p>
                      {stat.trend && (
                        <div
                          className={`mt-1 flex items-center gap-1 text-sm ${
                            stat.trendUp ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {stat.trendUp ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          {stat.trend}
                        </div>
                      )}
                    </div>
                    <div className={`rounded-full p-3 ${stat.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {overviewCards.map((card, index) => {
            const Icon = card.icon
            return (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#4fd1c5]/10 p-2">
                      <Icon className="h-5 w-5 text-[#4fd1c5]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{card.title}</p>
                      <p className="text-xl font-bold text-[#1e3a5f]">{card.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Letzte Bestellungen</CardTitle>
            </CardHeader>
            <CardContent>
              {recentOrders.length === 0 ? (
                <p className="py-4 text-center text-gray-500">Keine Bestellungen vorhanden</p>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                    >
                      <div>
                        <p className="font-mono text-sm">{order.order_number}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(order.created_at).toLocaleDateString('de-DE')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {order.total?.toFixed(2).replace('.', ',')} €
                        </p>
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top-Produkte</CardTitle>
            </CardHeader>
            <CardContent>
              {topProducts.length === 0 ? (
                <p className="py-4 text-center text-gray-500">Keine Produkte vorhanden</p>
              ) : (
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1e3a5f] text-xs text-white">
                        {index + 1}
                      </span>
                      <img
                        src={product.images?.[0] || 'https://via.placeholder.com/40'}
                        alt={product.name}
                        className="h-10 w-10 rounded object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.sold_count} verkauft</p>
                      </div>
                      <span className="font-semibold text-[#1e3a5f]">
                        {product.price?.toFixed(2).replace('.', ',')} €
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard

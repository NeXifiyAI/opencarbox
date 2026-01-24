import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import AdminLayout from './AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table'
import { Badge } from '../../components/ui/badge'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const API = `${BACKEND_URL}/api`

const AdminProducts = () => {
  const { token } = useAuth()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchProducts()
  }, [page, search])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
      })
      if (search) params.append('search', search)

      const response = await axios.get(`${API}/products?${params}`)
      setProducts(response.data)

      // Gesamtanzahl für Pagination
      const countResponse = await axios.get(
        `${API}/products/count${search ? `?search=${search}` : ''}`
      )
      setTotalPages(Math.ceil(countResponse.data.count / 20))
    } catch (error) {
      console.error('Produkte laden fehlgeschlagen:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (productId) => {
    if (!window.confirm('Produkt wirklich löschen?')) return

    try {
      await axios.delete(`${API}/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      fetchProducts()
    } catch (error) {
      alert('Löschen fehlgeschlagen: ' + (error.response?.data?.detail || error.message))
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1e3a5f]">Produkte</h1>
            <p className="text-gray-500">Verwalten Sie Ihre Produkte</p>
          </div>
          <Link to="/admin/produkte/neu">
            <Button className="bg-[#4fd1c5] text-[#1e3a5f] hover:bg-[#38b2ac]">
              <Plus className="mr-2 h-4 w-4" /> Neues Produkt
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Produkt suchen..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produkt</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Preis</TableHead>
                  <TableHead>Bestand</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-8 text-center">
                      Laden...
                    </TableCell>
                  </TableRow>
                ) : products.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-8 text-center text-gray-500">
                      Keine Produkte gefunden
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images?.[0] || 'https://via.placeholder.com/40'}
                            alt={product.name}
                            className="h-10 w-10 rounded object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium">{product.name}</p>
                            <p className="text-xs text-gray-500">{product.brand}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                      <TableCell>
                        <div>
                          <span className="font-semibold">
                            {product.price?.toFixed(2).replace('.', ',')} €
                          </span>
                          {product.original_price && (
                            <span className="ml-2 text-xs text-gray-400 line-through">
                              {product.original_price?.toFixed(2).replace('.', ',')} €
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`${product.stock < 10 ? 'text-red-600' : 'text-green-600'}`}
                        >
                          {product.stock}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.is_active ? 'default' : 'secondary'}>
                          {product.is_active ? 'Aktiv' : 'Inaktiv'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/produkt/${product.id}`} className="flex items-center">
                                <Eye className="mr-2 h-4 w-4" /> Ansehen
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link
                                to={`/admin/produkte/${product.id}`}
                                className="flex items-center"
                              >
                                <Edit className="mr-2 h-4 w-4" /> Bearbeiten
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(product.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Löschen
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Seite {page} von {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4" /> Zurück
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Weiter <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

export default AdminProducts

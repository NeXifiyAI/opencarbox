import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import {
  Fuel,
  Gauge,
  Calendar,
  Cog,
  Filter,
  ChevronRight,
  Phone,
  Loader,
  AlertCircle,
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { Checkbox } from '../components/ui/checkbox'
import axios from 'axios'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const API = `${BACKEND_URL}/api`

const CarDealershipPage = () => {
  const [filterBrand, setFilterBrand] = useState('all')
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const location = useLocation()

  useEffect(() => {
    fetchCars()
  }, [filterBrand, location.search])

  const fetchCars = async () => {
    setLoading(true)
    try {
      const searchParams = new URLSearchParams(location.search)
      const searchQuery = searchParams.get('search')

      const params = {}
      if (filterBrand !== 'all') params.brand = filterBrand
      if (searchQuery) params.search = searchQuery

      const response = await axios.get(`${API}/vehicles`, { params })
      setCars(response.data)
    } catch (err) {
      console.error('Error fetching vehicles:', err)
      // Fallback if backend is empty (for demo purposes) or fails
      // We don't want to break the page for the user if the backend is fresh
      setCars([])
      setError('Momentan sind keine Fahrzeuge verfügbar.')
    } finally {
      setLoading(false)
    }
  }

  // Get unique brands for filter (if we had a list endpoint, we'd use that)
  // For now, we hardcode common brands or extract from cars if available
  const brands = ['all', 'Volkswagen', 'Audi', 'BMW', 'Mercedes-Benz', 'Tesla', 'Porsche']

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-grow px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-[#4fd1c5]">
            Startseite
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-[#1e3a5f]">Fahrzeugmarkt</span>
        </nav>

        {/* Hero Banner */}
        <div className="relative mb-10 flex flex-col items-center justify-between gap-8 overflow-hidden rounded-xl bg-[#1e3a5f] p-8 text-white shadow-lg md:flex-row">
          <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="relative z-10">
            <h1 className="mb-3 font-display text-3xl font-bold md:text-4xl">
              OpenCarBox Autohandel
            </h1>
            <p className="max-w-xl text-lg text-gray-300">
              Geprüfte Gebrauchtwagen und Neuwagen mit umfassender Garantie und Finanzierung.
            </p>
          </div>
          <Button className="relative z-10 h-12 whitespace-nowrap bg-[#4fd1c5] px-8 font-bold text-[#1e3a5f] hover:bg-[#38b2ac]">
            Fahrzeug verkaufen
          </Button>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar Filters */}
          <div className="w-full flex-shrink-0 lg:w-72">
            <div className="sticky top-24 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-[#1e3a5f]">
                <Filter className="h-5 w-5" /> Filter
              </h3>

              <div className="mb-6">
                <h4 className="mb-3 text-sm font-semibold text-gray-700">Marke</h4>
                <Select value={filterBrand} onValueChange={setFilterBrand}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Marke wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((b) => (
                      <SelectItem key={b} value={b}>
                        {b === 'all' ? 'Alle Marken' : b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-sm font-semibold text-gray-700">Preis bis</h4>
                <input type="range" min="5000" max="150000" className="w-full accent-[#1e3a5f]" />
                <div className="mt-2 flex justify-between text-xs font-medium text-gray-500">
                  <span>5.000€</span>
                  <span>150.000€</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-sm font-semibold text-gray-700">Kraftstoff</h4>
                <div className="space-y-3">
                  {['Benzin', 'Diesel', 'Elektro', 'Hybrid'].map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <Checkbox
                        id={f}
                        className="border-gray-300 text-[#1e3a5f] focus:ring-[#1e3a5f]"
                      />
                      <label htmlFor={f} className="cursor-pointer text-sm text-gray-600">
                        {f}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-[#1e3a5f]"
              >
                Filter zurücksetzen
              </Button>
            </div>
          </div>

          {/* Car Listing */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader className="h-10 w-10 animate-spin text-[#1e3a5f]" />
              </div>
            ) : cars.length === 0 ? (
              <div className="rounded-xl border border-gray-100 bg-white py-20 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-gray-400">
                  <AlertCircle className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-[#1e3a5f]">Keine Fahrzeuge gefunden</h3>
                <p className="text-gray-500">
                  Bitte passen Sie Ihre Filter an oder schauen Sie später wieder vorbei.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {cars.map((car) => (
                  <div
                    key={car.id}
                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={car.image || 'https://via.placeholder.com/800x600?text=Kein+Bild'}
                        alt={`${car.brand} ${car.model}`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <Badge
                        className={`absolute right-4 top-4 ${car.is_new ? 'bg-[#1e3a5f]' : 'bg-gray-700'} px-3 py-1 font-bold text-white`}
                      >
                        {car.is_new ? 'Neuwagen' : 'Gebraucht'}
                      </Badge>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <h2 className="text-xl font-bold leading-tight text-[#1e3a5f]">
                            {car.brand} {car.model}
                          </h2>
                          <p className="mt-1 text-sm text-gray-500">{car.variant}</p>
                        </div>
                        <span className="whitespace-nowrap text-2xl font-bold text-[#1e3a5f]">
                          {car.price.toLocaleString('de-DE')} €
                        </span>
                      </div>

                      <div className="mb-6 grid grid-cols-2 gap-x-4 gap-y-3 rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#4fd1c5]" />
                          <span>EZ {car.year}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Gauge className="h-4 w-4 text-[#4fd1c5]" />
                          <span>{car.mileage?.toLocaleString('de-DE')} km</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Fuel className="h-4 w-4 text-[#4fd1c5]" />
                          <span>{car.fuel}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Cog className="h-4 w-4 text-[#4fd1c5]" />
                          <span>{car.transmission}</span>
                        </div>
                      </div>

                      <div className="mt-auto flex gap-3">
                        <Button className="h-11 flex-1 bg-[#1e3a5f] font-bold hover:bg-[#2d4a6f]">
                          Details ansehen
                        </Button>
                        <Button
                          variant="outline"
                          className="flex h-11 w-14 items-center justify-center border-gray-200 px-4 text-[#1e3a5f] hover:bg-gray-50"
                        >
                          <Phone className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default CarDealershipPage

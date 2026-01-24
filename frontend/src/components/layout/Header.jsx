import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Phone,
  ChevronDown,
  Menu,
  X,
  Car,
  Zap,
  Bike,
  Truck,
  LayoutGrid,
  Wrench,
  ShoppingBag,
  Calendar,
  MapPin,
} from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { manufacturers } from '../../data/mockData'

const Header = ({ cartItems = 0 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedVehicleType, setSelectedVehicleType] = useState('alle')
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  const vehicleTypes = [
    { id: 'alle', name: 'Alle', icon: LayoutGrid },
    { id: 'auto', name: 'Auto', icon: Car },
    { id: 'eauto', name: 'E-Auto', icon: Zap },
    { id: 'motorrad', name: 'Motorrad', icon: Bike },
    { id: 'transporter', name: 'Transporter', icon: Truck },
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      if (isActive('/werkstatt')) {
        // Logic for workshop search could be different
        // For now, redirect to workshop page with query
      } else if (isActive('/fahrzeuge')) {
        navigate(`/fahrzeuge?search=${encodeURIComponent(searchQuery)}`)
      } else {
        navigate(`/kategorien?search=${encodeURIComponent(searchQuery)}`)
      }
    }
  }

  // Helper to check active section
  const isActive = (path) => {
    if (path === '/')
      return (
        location.pathname === '/' ||
        location.pathname.startsWith('/kategorie') ||
        location.pathname.startsWith('/produkt')
      )
    return location.pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm">
      {/* 1. Service Switcher Top Bar */}
      <div className="border-b border-gray-700 bg-[#162d47] py-3 text-sm text-gray-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`flex items-center gap-2 transition-colors hover:text-white ${isActive('/') ? 'font-bold text-[#4fd1c5]' : ''}`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Teile-Shop</span>
            </Link>
            <Link
              to="/werkstatt"
              className={`flex items-center gap-2 transition-colors hover:text-white ${isActive('/werkstatt') ? 'font-bold text-[#4fd1c5]' : ''}`}
            >
              <Wrench className="h-4 w-4" />
              <span>Werkstatt</span>
            </Link>
            <Link
              to="/fahrzeuge"
              className={`flex items-center gap-2 transition-colors hover:text-white ${isActive('/fahrzeuge') ? 'font-bold text-[#4fd1c5]' : ''}`}
            >
              <Car className="h-4 w-4" />
              <span>Fahrzeugmarkt</span>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/kontakt" className="hidden transition-colors hover:text-white sm:block">
              Hilfe & Kontakt
            </Link>
            <Link to="/business" className="hidden transition-colors hover:text-white md:block">
              Für Geschäftskunden
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Header */}
      <div className="relative z-20 bg-[#1e3a5f] py-6 text-white shadow-md">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link to="/" className="group flex flex-shrink-0 items-center gap-4">
              <div className="rounded-xl bg-white/10 p-2.5 transition-colors group-hover:bg-white/20">
                <Car className="h-10 w-10 text-[#4fd1c5]" />
              </div>
              <div>
                <span className="font-display text-3xl font-bold tracking-tight text-white transition-colors group-hover:text-[#4fd1c5]">
                  Carvantooo
                </span>
                <p className="-mt-1 text-[11px] font-medium uppercase tracking-widest text-gray-300">
                  OpenCarBox Platform
                </p>
              </div>
            </Link>

            {/* Global Search Bar */}
            <div className="hidden max-w-3xl flex-1 md:flex">
              <form onSubmit={handleSearch} className="relative flex w-full rounded-lg shadow-lg">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder={
                    isActive('/werkstatt')
                      ? 'Service oder Reparatur suchen...'
                      : isActive('/fahrzeuge')
                        ? 'Fahrzeugmarke oder Modell suchen...'
                        : 'Artikel-Nr., OE-Nummer oder Teilename suchen...'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 rounded-l-lg border-none py-3 pl-12 pr-4 text-base text-gray-900 focus:ring-2 focus:ring-[#4fd1c5]"
                />
                <Button
                  type="submit"
                  className="h-14 rounded-l-none bg-[#4fd1c5] px-10 text-base font-bold text-[#1e3a5f] transition-colors hover:bg-[#38b2ac]"
                >
                  Suchen
                </Button>
              </form>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Account */}
              <Link to="/konto" className="group flex flex-col items-center">
                <div className="relative rounded-full p-2.5 transition-colors hover:bg-white/10">
                  <User className="h-6 w-6" />
                </div>
                <span className="mt-1 hidden text-xs font-medium text-gray-300 group-hover:text-white sm:block">
                  Konto
                </span>
              </Link>

              {/* Wishlist */}
              <Link to="/merkzettel" className="group flex flex-col items-center">
                <div className="relative rounded-full p-2.5 transition-colors hover:bg-white/10">
                  <Heart className="h-6 w-6" />
                  <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[#1e3a5f] bg-[#4fd1c5]"></span>
                </div>
                <span className="mt-1 hidden text-xs font-medium text-gray-300 group-hover:text-white sm:block">
                  Merkzettel
                </span>
              </Link>

              {/* Cart */}
              <Link to="/warenkorb" className="group relative flex flex-col items-center">
                <div className="relative rounded-full bg-[#4fd1c5] p-2.5 text-[#1e3a5f] shadow-lg transition-colors hover:bg-[#38b2ac]">
                  <ShoppingCart className="h-6 w-6" />
                  {cartItems > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#1e3a5f] bg-red-500 text-[10px] font-bold text-white">
                      {cartItems}
                    </span>
                  )}
                </div>
                <span className="mt-1 hidden text-xs font-medium text-gray-300 group-hover:text-white sm:block">
                  Warenkorb
                </span>
              </Link>

              {/* Mobile Toggle */}
              <button
                className="p-2 text-white md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>

          {/* Mobile Search (Visible only on mobile) */}
          <div className="mt-6 pb-2 md:hidden">
            <form onSubmit={handleSearch} className="relative flex w-full shadow-md">
              <Input
                type="text"
                placeholder="Suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 w-full rounded-lg border-none pl-4 pr-12 text-base text-gray-900"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-[#4fd1c5] p-2 text-[#1e3a5f]"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 3. Contextual Sub-Bar (Changes based on section) */}
      <div className="relative z-10 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          {isActive('/werkstatt') ? (
            // Workshop Context Bar
            <div className="scrollbar-hide flex items-center justify-between gap-6 overflow-x-auto">
              <div className="flex items-center gap-8 whitespace-nowrap text-sm font-bold text-[#1e3a5f]">
                <Link
                  to="/werkstatt"
                  className="flex items-center gap-2 border-b-2 border-transparent py-1 transition-colors hover:border-[#4fd1c5] hover:text-[#4fd1c5]"
                >
                  <Wrench className="h-4 w-4" /> Services
                </Link>
                <Link
                  to="/werkstatt#termine"
                  className="flex items-center gap-2 border-b-2 border-transparent py-1 transition-colors hover:border-[#4fd1c5] hover:text-[#4fd1c5]"
                >
                  <Calendar className="h-4 w-4" /> Termin buchen
                </Link>
                <Link
                  to="/werkstatt#standorte"
                  className="flex items-center gap-2 border-b-2 border-transparent py-1 transition-colors hover:border-[#4fd1c5] hover:text-[#4fd1c5]"
                >
                  <MapPin className="h-4 w-4" /> Standorte
                </Link>
              </div>
              <div className="hidden items-center gap-3 rounded-full border border-gray-100 bg-gray-50 px-4 py-2 text-sm text-gray-500 md:flex">
                <Phone className="h-4 w-4 text-[#4fd1c5]" />
                Werkstatt-Hotline: <span className="font-bold text-[#1e3a5f]">+43 1 987 65 43</span>
              </div>
            </div>
          ) : isActive('/fahrzeuge') ? (
            // Dealership Context Bar
            <div className="scrollbar-hide flex items-center justify-between gap-6 overflow-x-auto">
              <div className="flex items-center gap-8 whitespace-nowrap text-sm font-bold text-[#1e3a5f]">
                <Link
                  to="/fahrzeuge"
                  className="flex items-center gap-2 border-b-2 border-transparent py-1 transition-colors hover:border-[#4fd1c5] hover:text-[#4fd1c5]"
                >
                  <Car className="h-4 w-4" /> Alle Fahrzeuge
                </Link>
                <Link
                  to="/fahrzeuge?type=new"
                  className="border-b-2 border-transparent py-1 transition-colors hover:border-[#4fd1c5] hover:text-[#4fd1c5]"
                >
                  Neuwagen
                </Link>
                <Link
                  to="/fahrzeuge?type=used"
                  className="border-b-2 border-transparent py-1 transition-colors hover:border-[#4fd1c5] hover:text-[#4fd1c5]"
                >
                  Gebrauchtwagen
                </Link>
                <Link
                  to="/ankauf"
                  className="border-b-2 border-transparent py-1 text-[#4fd1c5] transition-colors hover:border-[#38b2ac] hover:text-[#38b2ac]"
                >
                  Fahrzeugankauf
                </Link>
              </div>
            </div>
          ) : (
            // Shop Vehicle Selection (Default)
            <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">
              <div className="scrollbar-hide flex w-full items-center gap-4 overflow-x-auto pb-2 lg:w-auto lg:pb-0">
                <span className="hidden whitespace-nowrap text-sm font-bold text-[#1e3a5f] sm:block">
                  Fahrzeug wählen:
                </span>
                <div className="flex gap-2">
                  {vehicleTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <button
                        key={type.id}
                        onClick={() => setSelectedVehicleType(type.id)}
                        className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-all ${
                          selectedVehicleType === type.id
                            ? 'scale-105 transform bg-[#1e3a5f] text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-[#1e3a5f]'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {type.name}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="flex w-full gap-3 lg:w-auto">
                <Select>
                  <SelectTrigger className="h-10 w-full border-gray-200 bg-gray-50 text-sm focus:ring-[#4fd1c5] lg:w-56">
                    <SelectValue placeholder="Hersteller wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {manufacturers.map((brand) => (
                      <SelectItem key={brand} value={brand.toLowerCase()}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="h-10 w-full border-gray-200 bg-gray-50 text-sm focus:ring-[#4fd1c5] lg:w-56">
                    <SelectValue placeholder="Modell wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="golf">Golf VII</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  className="h-10 bg-[#4fd1c5] px-6 font-bold text-[#1e3a5f] shadow-sm hover:bg-[#38b2ac]"
                >
                  <span className="hidden sm:inline">Teile finden</span>
                  <span className="sm:hidden">Go</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="animate-in slide-in-from-top-5 absolute z-50 w-full border-b border-gray-200 bg-white shadow-xl md:hidden">
          <div className="space-y-6 p-6">
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/"
                className="group rounded-xl border border-gray-100 bg-gray-50 p-6 text-center transition-colors hover:bg-[#e6fffa]"
              >
                <ShoppingBag className="mx-auto mb-3 h-8 w-8 text-[#1e3a5f] group-hover:text-[#4fd1c5]" />
                <span className="text-base font-bold text-[#1e3a5f]">Shop</span>
              </Link>
              <Link
                to="/werkstatt"
                className="group rounded-xl border border-gray-100 bg-gray-50 p-6 text-center transition-colors hover:bg-[#e6fffa]"
              >
                <Wrench className="mx-auto mb-3 h-8 w-8 text-[#1e3a5f] group-hover:text-[#4fd1c5]" />
                <span className="text-base font-bold text-[#1e3a5f]">Werkstatt</span>
              </Link>
              <Link
                to="/fahrzeuge"
                className="group rounded-xl border border-gray-100 bg-gray-50 p-6 text-center transition-colors hover:bg-[#e6fffa]"
              >
                <Car className="mx-auto mb-3 h-8 w-8 text-[#1e3a5f] group-hover:text-[#4fd1c5]" />
                <span className="text-base font-bold text-[#1e3a5f]">Autohandel</span>
              </Link>
              <Link
                to="/konto"
                className="group rounded-xl border border-gray-100 bg-gray-50 p-6 text-center transition-colors hover:bg-[#e6fffa]"
              >
                <User className="mx-auto mb-3 h-8 w-8 text-[#1e3a5f] group-hover:text-[#4fd1c5]" />
                <span className="text-base font-bold text-[#1e3a5f]">Mein Konto</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header

'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { manufacturers } from '@/lib/mock-data'
import {
  Bike,
  Car,
  Heart,
  LayoutGrid,
  Search,
  ShoppingBag,
  ShoppingCart,
  Truck,
  User,
  Wrench,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface HeaderProps {
  cartItems?: number
}

const vehicleTypes = [
  { id: 'alle', name: 'Alle', icon: LayoutGrid },
  { id: 'auto', name: 'Auto', icon: Car },
  { id: 'eauto', name: 'E-Auto', icon: Zap },
  { id: 'motorrad', name: 'Motorrad', icon: Bike },
  { id: 'transporter', name: 'Transpo', icon: Truck },
]

export function Header({ cartItems = 0 }: HeaderProps) {
  const [selectedVehicleType, setSelectedVehicleType] = useState('alle')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedManufacturer, setSelectedManufacturer] = useState('')
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/')
      return (
        pathname === '/' || pathname.startsWith('/kategorie') || pathname.startsWith('/produkt')
      )
    return pathname.startsWith(path)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/kategorien?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm">
      {/* 1. Service Switcher Top Bar */}
      <div className="border-b border-gray-700 bg-[#162d47] py-3 text-sm text-gray-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <div className="flex space-x-8">
            <Link
              href="/"
              className={`flex items-center gap-2 transition-colors hover:text-white ${isActive('/') ? 'font-bold text-[#4fd1c5]' : ''}`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Teile-Shop</span>
            </Link>
            <Link
              href="/werkstatt"
              className={`flex items-center gap-2 transition-colors hover:text-white ${isActive('/werkstatt') ? 'font-bold text-[#4fd1c5]' : ''}`}
            >
              <Wrench className="h-4 w-4" />
              <span>Werkstatt</span>
            </Link>
            <Link
              href="/fahrzeuge"
              className={`flex items-center gap-2 transition-colors hover:text-white ${isActive('/fahrzeuge') ? 'font-bold text-[#4fd1c5]' : ''}`}
            >
              <Car className="h-4 w-4" />
              <span>Fahrzeugmarkt</span>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/kontakt" className="hidden transition-colors hover:text-white sm:block">
              Hilfe & Kontakt
            </Link>
            <Link href="/business" className="hidden transition-colors hover:text-white md:block">
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
            <Link href="/" className="group flex flex-shrink-0 items-center gap-4">
              <div className="rounded-xl bg-white/10 p-2.5 transition-colors group-hover:bg-white/20">
                <Car className="h-10 w-10 text-[#4fd1c5]" />
              </div>
              <div>
                <span className="text-3xl font-bold tracking-tight text-white transition-colors group-hover:text-[#4fd1c5]">
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
                  placeholder="Artikel-Nr., OE-Nummer oder Teilename suchen..."
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
              <Link href="/konto" className="group flex flex-col items-center">
                <div className="relative rounded-full p-2.5 transition-colors hover:bg-white/10">
                  <User className="h-6 w-6" />
                </div>
                <span className="mt-1 hidden text-xs font-medium text-gray-300 group-hover:text-white sm:block">
                  Konto
                </span>
              </Link>

              {/* Wishlist */}
              <Link href="/merkzettel" className="group flex flex-col items-center">
                <div className="relative rounded-full p-2.5 transition-colors hover:bg-white/10">
                  <Heart className="h-6 w-6" />
                  <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[#1e3a5f] bg-[#4fd1c5]"></span>
                </div>
                <span className="mt-1 hidden text-xs font-medium text-gray-300 group-hover:text-white sm:block">
                  Merkzettel
                </span>
              </Link>

              {/* Cart */}
              <Link href="/warenkorb" className="group relative flex flex-col items-center">
                <div className="relative rounded-full bg-[#4fd1c5] p-2.5 text-[#1e3a5f] shadow-lg transition-colors hover:bg-[#38b2ac]">
                  <ShoppingCart className="h-6 w-6" />
                  {cartItems > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                      {cartItems > 99 ? '99+' : cartItems}
                    </span>
                  )}
                </div>
                <span className="mt-1 hidden text-xs font-medium text-gray-300 group-hover:text-white sm:block">
                  Warenkorb
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Vehicle Selector Bar */}
      <div className="border-b border-gray-200 bg-[#f8fafc] py-4">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-semibold text-[#1e3a5f]">Fahrzeug wählen:</span>

            {/* Vehicle Type Pills */}
            <div className="flex gap-2">
              {vehicleTypes.map((type) => {
                const Icon = type.icon
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedVehicleType(type.id)}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      selectedVehicleType === type.id
                        ? 'bg-[#1e3a5f] text-white'
                        : 'border border-gray-200 bg-white text-[#1e3a5f] hover:border-[#4fd1c5]'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {type.name}
                  </button>
                )
              })}
            </div>

            {/* Manufacturer Select */}
            <Select value={selectedManufacturer} onValueChange={setSelectedManufacturer}>
              <SelectTrigger className="w-48 border-gray-200 bg-white">
                <SelectValue placeholder="Hersteller wählen" />
              </SelectTrigger>
              <SelectContent>
                {manufacturers.map((manufacturer) => (
                  <SelectItem key={manufacturer} value={manufacturer}>
                    {manufacturer}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Model Select */}
            <Select disabled={!selectedManufacturer}>
              <SelectTrigger className="w-48 border-gray-200 bg-white">
                <SelectValue placeholder="Modell wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="golf">Golf</SelectItem>
                <SelectItem value="passat">Passat</SelectItem>
                <SelectItem value="polo">Polo</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-[#4fd1c5] font-semibold text-[#1e3a5f] hover:bg-[#38b2ac]">
              Teile finden
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Settings,
  Tag,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Bell,
  Search,
  Wrench,
  Car,
} from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const API = `${BACKEND_URL}/api`

const AdminLayout = ({ children }) => {
  const { user, token, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login')
    }
  }, [isAdmin, navigate])

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Package, label: 'Produkte', path: '/admin/produkte' },
    { icon: Wrench, label: 'Werkstatt', path: '/admin/werkstatt' },
    { icon: Car, label: 'Fahrzeuge', path: '/admin/fahrzeuge' },
    { icon: FolderTree, label: 'Kategorien', path: '/admin/kategorien' },
    { icon: ShoppingCart, label: 'Bestellungen', path: '/admin/bestellungen' },
    { icon: Users, label: 'Kunden', path: '/admin/kunden' },
    { icon: Tag, label: 'Gutscheine', path: '/admin/gutscheine' },
    { icon: Settings, label: 'Einstellungen', path: '/admin/einstellungen' },
  ]

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin'
    return location.pathname.startsWith(path)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!isAdmin) return null

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 lg:flex-row">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 flex items-center justify-between bg-[#1e3a5f] px-6 py-4 text-white shadow-md lg:hidden">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
        <div className="flex items-center gap-3">
          <Car className="h-7 w-7 text-[#4fd1c5]" />
          <span className="text-lg font-bold">Carvantooo Admin</span>
        </div>
        <div className="w-7" />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-[#1e3a5f] text-white transition-transform duration-300 ease-in-out lg:hidden ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <Car className="h-8 w-8 text-[#4fd1c5]" />
            <div>
              <span className="text-xl font-bold">Carvantooo</span>
              <p className="text-xs font-medium tracking-wide text-[#4fd1c5]">Admin-Portal</p>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white/70 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="space-y-1 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-4 rounded-xl px-4 py-3.5 transition-all ${
                  isActive(item.path)
                    ? 'bg-[#4fd1c5] font-bold text-[#1e3a5f] shadow-md'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block ${sidebarOpen ? 'w-72' : 'w-24'} relative z-20 min-h-screen flex-shrink-0 bg-[#1e3a5f] text-white shadow-xl transition-all duration-300`}
      >
        <div className="flex h-20 items-center border-b border-white/10 p-6">
          <Link to="/admin" className="flex items-center gap-3 overflow-hidden">
            <Car className="h-9 w-9 flex-shrink-0 text-[#4fd1c5]" />
            {sidebarOpen && (
              <div className="min-w-0">
                <span className="block truncate text-xl font-bold">Carvantooo</span>
                <p className="truncate text-xs font-medium tracking-wide text-[#4fd1c5]">
                  Admin-Portal
                </p>
              </div>
            )}
          </Link>
        </div>

        <nav className="space-y-1 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 overflow-hidden whitespace-nowrap rounded-xl px-4 py-3.5 transition-all ${
                  isActive(item.path)
                    ? 'bg-[#4fd1c5] font-bold text-[#1e3a5f] shadow-md'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-[#162d47] p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-4 overflow-hidden rounded-xl px-4 py-3.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Abmelden</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="sticky top-0 z-10 flex h-20 items-center justify-between bg-white px-8 py-5 shadow-sm">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden rounded-lg p-2.5 text-gray-500 transition-colors hover:bg-gray-100 lg:flex"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Suche im Admin-Bereich..."
                className="h-11 w-80 border-gray-200 bg-gray-50 pl-11 transition-all focus:bg-white"
              />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <button className="relative rounded-full p-2.5 transition-colors hover:bg-gray-100">
              <Bell className="h-6 w-6 text-gray-500" />
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
            </button>
            <div className="mx-1 hidden h-8 w-px bg-gray-200 sm:block"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="hidden text-right sm:block">
                <span className="block text-sm font-bold leading-tight text-gray-800">
                  {user?.first_name} {user?.last_name}
                </span>
                <span className="block text-xs font-medium text-gray-500">Administrator</span>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#4fd1c5] bg-[#1e3a5f] font-bold text-white shadow-md">
                {user?.first_name?.[0]}
                {user?.last_name?.[0]}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout

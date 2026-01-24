import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { sidebarCategories, categories } from '../../data/mockData'

const Sidebar = () => {
  const location = useLocation()
  const [expandedCategory, setExpandedCategory] = useState(null)

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  return (
    <aside className="w-64 flex-shrink-0">
      <nav className="rounded-lg border border-gray-100 bg-white shadow-sm">
        <ul className="divide-y divide-gray-100">
          {/* Startseite */}
          <li>
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-3 text-sm transition-colors hover:bg-gray-50 ${
                location.pathname === '/'
                  ? 'bg-gray-50 font-semibold text-[#4fd1c5]'
                  : 'text-[#1e3a5f]'
              }`}
            >
              <ChevronRight className="h-4 w-4" />
              Startseite
            </Link>
          </li>

          {/* Categories with Subcategories */}
          {categories.slice(0, 10).map((category) => (
            <li key={category.id}>
              <button
                onClick={() => toggleCategory(category.id)}
                className={`flex w-full items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-gray-50 ${
                  location.pathname.includes(category.id)
                    ? 'font-semibold text-[#4fd1c5]'
                    : 'text-[#1e3a5f]'
                }`}
              >
                <span className="flex items-center gap-2">
                  {expandedCategory === category.id ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  {category.name.split(',')[0]}
                </span>
              </button>

              {/* Subcategories */}
              {expandedCategory === category.id && (
                <ul className="border-t border-gray-100 bg-gray-50">
                  {category.subcategories.map((sub) => (
                    <li key={sub.id}>
                      <Link
                        to={`/kategorie/${category.id}/${sub.id}`}
                        className="flex items-center justify-between px-8 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-[#4fd1c5]"
                      >
                        <span>{sub.name}</span>
                        <span className="text-xs text-gray-400">
                          ({sub.count.toLocaleString('de-DE')})
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar

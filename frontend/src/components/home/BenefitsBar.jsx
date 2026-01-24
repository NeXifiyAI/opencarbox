import React from 'react'
import { Users, Package, Truck, RotateCcw, Shield } from 'lucide-react'

const BenefitsBar = () => {
  const benefits = [
    {
      icon: Users,
      title: 'Über 3 Millionen',
      subtitle: 'zufriedene Kunden',
    },
    {
      icon: Package,
      title: 'Riesenauswahl: Über',
      subtitle: '3 Millionen Teile',
    },
    {
      icon: Truck,
      title: 'Versand heute bei',
      subtitle: 'Bestellungen bis 15 Uhr',
    },
    {
      icon: RotateCcw,
      title: '30 Tage kostenlose',
      subtitle: 'Rücksendungen',
    },
    {
      icon: Shield,
      title: 'Herstellergarantie',
      subtitle: 'auf alle Produkte',
    },
  ]

  return (
    <div className="mt-6 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon
          return (
            <div key={index} className="group flex cursor-default items-center gap-3">
              <div className="rounded-full bg-[#4fd1c5]/10 p-2 transition-colors group-hover:bg-[#4fd1c5]/20">
                <Icon className="h-6 w-6 text-[#4fd1c5]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1e3a5f]">{benefit.title}</p>
                <p className="text-xs text-gray-500">{benefit.subtitle}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BenefitsBar

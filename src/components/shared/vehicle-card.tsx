import Link from 'next/link'
import { motion } from 'framer-motion'
import { Gauge, Zap, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * Props für die VehicleCard Komponente
 */
interface VehicleCardProps {
  id: string | number
  title: string
  slug: string
  make: string
  model: string
  year: number
  mileage: number
  price: number
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid' | 'lpg'
  transmission: 'manual' | 'automatic'
  powerPs?: number
  image: string
  className?: string
}

/**
 * Premium Fahrzeug-Karte für den OpenCarBox Autohandel.
 * Fokus auf technische Daten und hochwertige Präsentation.
 */
export const VehicleCard = ({
  title,
  slug,
  make,
  year,
  mileage,
  price,
  fuelType,
  transmission,
  powerPs,
  image,
  className,
}: VehicleCardProps) => {
  const fuelLabels: Record<string, string> = {
    petrol: 'Benzin',
    diesel: 'Diesel',
    electric: 'Elektro',
    hybrid: 'Hybrid',
    lpg: 'LPG',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        'group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all hover:border-opencarbox-200 hover:shadow-2xl hover:shadow-opencarbox-500/10',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-lg bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-900 shadow-sm backdrop-blur-md">
            {year}
          </span>
          <span className="rounded-lg bg-opencarbox-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-opencarbox-500/20">
            {fuelLabels[fuelType]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-grow flex-col p-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-opencarbox-500">
            {make}
          </span>
          <span className="text-sm font-bold text-slate-400">
            {transmission === 'automatic' ? 'Automatik' : 'Schaltgetriebe'}
          </span>
        </div>

        <Link href={`/fahrzeuge/${slug}`}>
          <h3 className="mb-6 line-clamp-1 font-display text-2xl font-bold text-slate-900 transition-colors group-hover:text-opencarbox-600">
            {title}
          </h3>
        </Link>

        {/* Technical Specs Grid */}
        <div className="mb-8 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3">
            <Gauge className="h-4 w-4 text-slate-400" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-tight text-slate-400">
                Laufleistung
              </span>
              <span className="text-sm font-bold text-slate-900">
                {mileage.toLocaleString('de-DE')} km
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3">
            <Zap className="h-4 w-4 text-slate-400" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-tight text-slate-400">
                Leistung
              </span>
              <span className="text-sm font-bold text-slate-900">{powerPs} PS</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Verkaufspreis
            </span>
            <div className="font-display text-2xl font-bold text-slate-900">
              € {price.toLocaleString('de-DE', { minimumFractionDigits: 0 })}
            </div>
          </div>

          <Button
            className="btn-gradient-blue h-12 rounded-xl px-6 shadow-lg shadow-opencarbox-500/20"
            asChild
          >
            <Link href={`/fahrzeuge/${slug}`}>
              Details
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

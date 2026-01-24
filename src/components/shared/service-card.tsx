import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock, ChevronRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * Props für die ServiceCard Komponente
 */
interface ServiceCardProps {
  id: string | number
  name: string
  slug: string
  description: string
  priceFrom?: number
  durationMinutes?: number
  category: string
  image?: string
  features?: string[]
  className?: string
}

/**
 * Premium Service-Karte für die OpenCarBox Werkstatt.
 * Fokus auf Vertrauen, Professionalität und klare Informationen.
 */
export const ServiceCard = ({
  name,
  slug,
  description,
  priceFrom,
  durationMinutes,
  category,
  image,
  features = [],
  className,
}: ServiceCardProps) => {
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
      {/* Image / Header */}
      {image ? (
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          <div className="absolute bottom-4 left-6">
            <span className="rounded-full bg-opencarbox-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              {category}
            </span>
          </div>
        </div>
      ) : (
        <div className="p-6 pb-0">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            {category}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-grow flex-col p-8">
        <h3 className="mb-3 font-display text-2xl font-bold text-slate-900 transition-colors group-hover:text-opencarbox-600">
          {name}
        </h3>
        <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-500">{description}</p>

        {/* Features List */}
        {features.length > 0 && (
          <ul className="mb-8 space-y-2">
            {features.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                <CheckCircle2 className="h-4 w-4 text-opencarbox-500" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {/* Info Bar */}
        <div className="mt-auto flex items-center justify-between border-t border-slate-100 py-4">
          <div className="flex flex-col">
            {priceFrom && (
              <>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Ab
                </span>
                <div className="font-display text-xl font-bold text-slate-900">
                  € {priceFrom.toFixed(2)}
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {durationMinutes && (
              <div className="flex items-center gap-1.5 text-slate-400">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-medium">{durationMinutes} Min.</span>
              </div>
            )}

            <Button
              variant="outline"
              size="icon"
              asChild
              className="rounded-full border-slate-200 transition-all hover:border-opencarbox-500 hover:bg-opencarbox-50 hover:text-opencarbox-600"
            >
              <Link href={`/werkstatt/services/${slug}`}>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

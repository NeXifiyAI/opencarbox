'use client'

/**
 * Hero Component - Landing Page
 *
 * Responsive Hero-Sektion für OpenCarBox/Carvantooo Landing Pages.
 * Unterstützt brand-spezifisches Theming.
 *
 * @module components/marketing/hero
 */

import { Button } from '@/components/ui/button'
import { Heading, Text } from '@/components/ui/typography'
import { useBrand } from '@/components/providers/brand-provider'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export interface HeroProps {
  /** Haupt-Überschrift */
  title: string
  /** Beschreibungstext */
  description: string
  /** Primärer CTA-Text */
  primaryCta?: {
    label: string
    href: string
  }
  /** Sekundärer CTA-Text */
  secondaryCta?: {
    label: string
    href: string
  }
  /** Hintergrundbild URL */
  backgroundImage?: string
  /** Zusätzliche CSS-Klassen */
  className?: string
}

/**
 * Hero Component
 */
export function Hero({
  title,
  description,
  primaryCta,
  secondaryCta,
  backgroundImage,
  className,
}: HeroProps) {
  const { brand } = useBrand()

  return (
    <section
      className={cn(
        'relative flex min-h-[600px] items-center justify-center md:min-h-[700px]',
        'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800',
        'overflow-hidden',
        className
      )}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Gradient Overlay */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-10',
          brand === 'carvantooo'
            ? 'from-carvantooo-500 to-carvantooo-700'
            : 'from-opencarbox-500 to-opencarbox-900'
        )}
      />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Title */}
          <Heading
            size="hero"
            variant={brand === 'carvantooo' ? 'gradient-red' : 'gradient-blue'}
            className="mb-6 animate-fade-in"
          >
            {title}
          </Heading>

          {/* Description */}
          <Text
            size="xl"
            variant="muted"
            className="animation-delay-100 mx-auto mb-8 max-w-2xl animate-fade-in"
          >
            {description}
          </Text>

          {/* CTAs */}
          <div className="animation-delay-200 flex animate-fade-in flex-col items-center justify-center gap-4 sm:flex-row">
            {primaryCta && (
              <Button
                asChild
                size="xl"
                variant={brand === 'carvantooo' ? 'carvantooo' : 'opencarbox'}
                className="w-full min-w-[200px] sm:w-auto"
              >
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
            )}

            {secondaryCta && (
              <Button
                asChild
                size="xl"
                variant="outline"
                className="w-full min-w-[200px] sm:w-auto"
              >
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="h-24 w-full text-white dark:text-slate-950"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  )
}

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { bannerSlides } from '../../data/mockData'
import { Button } from '../ui/button'

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)
  }

  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg">
      {/* Slides */}
      <div className="relative h-[300px] md:h-[400px]">
        {bannerSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/90 via-[#1e3a5f]/60 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-lg px-8 md:px-12">
                <span className="text-sm font-semibold uppercase tracking-wider text-[#4fd1c5]">
                  Angebot
                </span>
                <h2 className="mb-2 mt-2 text-3xl font-bold text-white md:text-5xl">
                  {slide.title}
                </h2>
                <p className="mb-6 text-xl text-white/90 md:text-2xl">{slide.subtitle}</p>
                <Button className="bg-[#4fd1c5] px-6 py-3 font-semibold text-[#1e3a5f] hover:bg-[#38b2ac]">
                  {slide.buttonText}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/40"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/40"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              index === currentSlide ? 'w-8 bg-[#4fd1c5]' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroSlider

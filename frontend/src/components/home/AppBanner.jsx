import React from 'react'
import { Smartphone, Download } from 'lucide-react'
import { Button } from '../ui/button'

const AppBanner = () => {
  return (
    <section className="mt-10">
      <div className="overflow-hidden rounded-lg bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f]">
        <div className="flex flex-col items-center justify-between p-8 md:flex-row">
          <div className="mb-6 flex items-center gap-6 md:mb-0">
            <div className="rounded-2xl bg-white/10 p-4">
              <Smartphone className="h-12 w-12 text-[#4fd1c5]" />
            </div>
            <div>
              <h3 className="mb-1 text-xl font-bold text-white md:text-2xl">
                Spare auch in unserer App
              </h3>
              <p className="text-sm text-white/80 md:text-base">
                Exklusive Angebote und schneller Zugriff auf alle Teile
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button className="flex items-center gap-2 bg-white text-[#1e3a5f] hover:bg-gray-100">
              <Download className="h-5 w-5" />
              iOS App
            </Button>
            <Button className="flex items-center gap-2 bg-[#4fd1c5] text-[#1e3a5f] hover:bg-[#38b2ac]">
              <Download className="h-5 w-5" />
              Android App
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AppBanner

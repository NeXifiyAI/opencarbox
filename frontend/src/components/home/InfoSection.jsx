import React from 'react'
import { Wrench, Package, Truck } from 'lucide-react'

const InfoSection = () => {
  const infoCards = [
    {
      icon: Wrench,
      title: 'Vor Ort. Für dich.',
      description:
        'In unseren Filialen kannst du dich beraten lassen oder bestellte Ware abholen. In unseren angeschlossenen Meisterwerkstätten kannst du dein Fahrzeug auch direkt zur Reparatur geben.',
      image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop',
    },
    {
      icon: Package,
      title: 'Großes Lager. Schnelle Lieferung.',
      description:
        'Wir betreiben eines der größten Logistikzentren für Ersatzteile. Auf 50.000 m² lagert alles, was dein Auto braucht. So kannst du dich immer auf eine zügige Lieferung verlassen.',
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&h=300&fit=crop',
    },
    {
      icon: Truck,
      title: 'Aus der Werkstatt. Für die Werkstatt.',
      description:
        'An Werkstätten und Geschäftskunden liefern wir bis zu 3x täglich mit eigenen Fahrzeugen. Profitiere von unserem Service und sag dem Leerlauf an deinen Bühnen den Kampf an.',
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop',
    },
  ]

  return (
    <section className="mt-10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {infoCards.map((card, index) => {
          const Icon = card.icon
          return (
            <div
              key={index}
              className="group overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/90 via-[#1e3a5f]/40 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <Icon className="h-8 w-8 text-[#4fd1c5]" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="mb-2 text-lg font-bold text-[#1e3a5f]">{card.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{card.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default InfoSection

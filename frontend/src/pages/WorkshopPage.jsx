import React, { useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { workshopServices } from '../data/mockData'
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Wrench,
  ClipboardList,
  Droplet,
  Disc,
  Circle,
  Wind,
  ShieldCheck,
  Loader,
  Star,
  MessageCircle,
  Zap,
  ArrowRight,
  Car,
} from 'lucide-react'
import { Button } from '../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useToast } from '../hooks/use-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { companyConfig } from '../config/company'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const API = `${BACKEND_URL}/api`

const iconMap = {
  ClipboardList,
  Droplet,
  Disc,
  Circle,
  Wind,
  ShieldCheck,
  Wrench,
}

const WorkshopPage = () => {
  const { toast } = useToast()
  const [selectedService, setSelectedService] = useState(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    vehicle: '',
  })

  const handleBook = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(`${API}/workshop/appointments`, {
        ...formData,
        serviceId: selectedService?.id || 'general',
        serviceName: selectedService?.name || 'Allgemeine Anfrage',
      })
      setIsBookingOpen(false)
      toast({
        title: 'Terminanfrage gesendet',
        description: 'Wir werden uns in Kürze bei Ihnen melden.',
      })
      setFormData({ name: '', email: '', phone: '', date: '', vehicle: '' })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Fehler',
        description: 'Konnte Anfrage nicht senden. Bitte versuchen Sie es später erneut.',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const testimonials = [
    {
      name: 'Maria Schmidt',
      location: 'Wien 1030',
      text: 'Sehr professioneller Service! Mein Auto wurde schnell und professionell repariert. Das Team ist freundlich und kompetent.',
      verified: true,
    },
    {
      name: 'Thomas Müller',
      location: 'Wien 1020',
      text: 'Pickerl-Überprüfung war super schnell erledigt. Keine Wartezeit und sehr transparent. Kann ich nur weiterempfehlen!',
      verified: true,
    },
    {
      name: 'Sandra Weber',
      location: 'Wien 1100',
      text: 'Nach einem Unfall hat OpenCarBox mein Auto wie neu gemacht. Karosserie und Lackierung sind perfekt. Vielen Dank!',
      verified: true,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#1e3a5f] py-24 text-white">
          {/* Background Image Overlay */}
          <div className="absolute inset-0 z-0 opacity-30">
            <img
              src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=1974"
              alt="Workshop"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
              <div className="text-center md:w-1/2 md:text-left">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#4fd1c5]/30 bg-[#4fd1c5]/20 px-3 py-1 text-sm font-bold text-[#4fd1c5]">
                  <Star className="h-4 w-4 fill-current" /> Zertifizierte Fachwerkstatt
                </div>
                <h1 className="mb-6 font-display text-4xl font-bold leading-tight md:text-6xl">
                  KFZ-Service der <br />
                  <span className="text-[#4fd1c5]">nächsten Generation</span>
                </h1>
                <p className="mb-8 text-xl leading-relaxed text-gray-200">
                  Modernste Werkstatt-Technologie trifft auf jahrelange Expertise. Bei{' '}
                  {companyConfig.legalName} in {companyConfig.address.city}{' '}
                  {companyConfig.address.zip}.
                </p>

                <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
                  <Button
                    size="lg"
                    className="h-14 bg-[#4fd1c5] px-8 text-lg font-bold text-[#1e3a5f] shadow-lg shadow-[#4fd1c5]/20 hover:bg-[#38b2ac]"
                    onClick={() => {
                      setSelectedService({ name: 'Allgemeine Anfrage' })
                      setIsBookingOpen(true)
                    }}
                  >
                    Sofort Termin buchen
                  </Button>
                  <a href={`tel:${companyConfig.contact.phone.replace(/\s/g, '')}`}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-14 border-white/20 bg-white/10 px-8 text-lg font-bold text-white backdrop-blur-sm hover:bg-white/20"
                    >
                      {companyConfig.contact.phone}
                    </Button>
                  </a>
                </div>
                <p className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-gray-300 md:justify-start">
                  <MapPin className="h-4 w-4 text-[#4fd1c5]" /> {companyConfig.address.street},{' '}
                  {companyConfig.address.zip} {companyConfig.address.city} • Mo-Fr 8:00-18:00
                </p>
              </div>

              {/* Express Services Quick Links */}
              <div className="w-full md:w-1/2">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md md:p-8">
                  <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
                    <Zap className="h-5 w-5 text-[#4fd1c5]" /> Express-Services
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        setSelectedService({ name: '§57a Pickerl' })
                        setIsBookingOpen(true)
                      }}
                      className="group rounded-xl bg-white/5 p-4 text-left transition-colors hover:bg-white/10"
                    >
                      <div className="font-bold group-hover:text-[#4fd1c5]">§57a Pickerl</div>
                      <div className="mt-1 text-xs text-gray-400">Offizielle Überprüfung</div>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedService({ name: 'Ölwechsel' })
                        setIsBookingOpen(true)
                      }}
                      className="group rounded-xl bg-white/5 p-4 text-left transition-colors hover:bg-white/10"
                    >
                      <div className="font-bold group-hover:text-[#4fd1c5]">Ölwechsel</div>
                      <div className="mt-1 text-xs text-gray-400">Mit Qualitätsöl</div>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedService({ name: 'Reifenwechsel' })
                        setIsBookingOpen(true)
                      }}
                      className="group rounded-xl bg-white/5 p-4 text-left transition-colors hover:bg-white/10"
                    >
                      <div className="font-bold group-hover:text-[#4fd1c5]">Reifenwechsel</div>
                      <div className="mt-1 text-xs text-gray-400">Schnell & professionell</div>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedService({ name: 'Klimaservice' })
                        setIsBookingOpen(true)
                      }}
                      className="group rounded-xl bg-white/5 p-4 text-left transition-colors hover:bg-white/10"
                    >
                      <div className="font-bold group-hover:text-[#4fd1c5]">Klimaservice</div>
                      <div className="mt-1 text-xs text-gray-400">Wartung & Reparatur</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DPF Special Offer */}
        <section className="border-b border-gray-100 bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] p-8 text-white shadow-xl md:p-12">
              <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/3 translate-x-1/3 transform rounded-full bg-[#4fd1c5] opacity-10 blur-3xl"></div>

              <div className="relative z-10 grid items-center gap-12 md:grid-cols-2">
                <div>
                  <div className="mb-4 inline-block rounded-full border border-[#4fd1c5]/30 bg-[#4fd1c5]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#4fd1c5]">
                    DPF Service • Festpreis
                  </div>
                  <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                    Professionelle DPF-Reinigung
                  </h2>
                  <p className="mb-8 text-lg leading-relaxed text-gray-300">
                    Reinigung ohne Zerlegung - bis zu 100% Reinigung zum transparenten Festpreis.
                    Umweltschonend & effizient.
                  </p>

                  <div className="mb-8 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-[#4fd1c5]/20 p-1.5">
                        <CheckCircle2 className="h-4 w-4 text-[#4fd1c5]" />
                      </div>
                      <span className="text-sm font-medium">Diagnose & Analyse</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-[#4fd1c5]/20 p-1.5">
                        <CheckCircle2 className="h-4 w-4 text-[#4fd1c5]" />
                      </div>
                      <span className="text-sm font-medium">Reinigung ohne Zerlegung</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-[#4fd1c5]/20 p-1.5">
                        <CheckCircle2 className="h-4 w-4 text-[#4fd1c5]" />
                      </div>
                      <span className="text-sm font-medium">Prüfung & Übergabe</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-[#4fd1c5]/20 p-1.5">
                        <CheckCircle2 className="h-4 w-4 text-[#4fd1c5]" />
                      </div>
                      <span className="text-sm font-medium">25 Jahre Erfahrung</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      className="h-12 bg-[#4fd1c5] px-8 font-bold text-[#1e3a5f] hover:bg-[#38b2ac]"
                      onClick={() => {
                        setSelectedService({ id: 'dpf', name: 'DPF-Reinigung Spezial' })
                        setIsBookingOpen(true)
                      }}
                    >
                      Jetzt Termin buchen
                    </Button>
                  </div>
                </div>

                {/* Price Card */}
                <div className="relative">
                  <div className="transform rounded-2xl border border-white/20 bg-white/10 p-8 text-center backdrop-blur-md transition-transform duration-300 hover:rotate-0 md:rotate-2">
                    <div className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-300">
                      Aktionspreis
                    </div>
                    <div className="mb-2 flex items-start justify-center gap-1">
                      <span className="text-6xl font-bold text-white">299</span>
                      <span className="mt-2 text-2xl font-bold text-white">€</span>
                    </div>
                    <div className="mb-6 text-lg font-bold text-[#4fd1c5]">Festpreis</div>
                    <div className="space-y-2 border-t border-white/10 pt-6 text-sm text-gray-300">
                      <p>Keine versteckten Kosten</p>
                      <p>Sofort verfügbar</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section id="services" className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#1e3a5f] md:text-4xl">
              Unsere KFZ-Services in Wien
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Von der klassischen Reparatur bis zur kompletten Fahrzeugpflege -{companyConfig.name}{' '}
              bietet Ihnen alle Automotive-Dienstleistungen unter einem Dach.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {workshopServices.map((service) => {
              const Icon = iconMap[service.icon] || Wrench

              return (
                <Card
                  key={service.id}
                  className="group overflow-hidden border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <CardHeader className="pb-4">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e6fffa] transition-colors duration-300 group-hover:bg-[#1e3a5f] group-hover:text-white">
                      <Icon className="h-7 w-7 text-[#1e3a5f] transition-colors duration-300 group-hover:text-[#4fd1c5]" />
                    </div>
                    <CardTitle className="text-xl font-bold text-[#1e3a5f]">
                      {service.name}
                    </CardTitle>
                    <CardDescription className="mt-3 text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between border-t border-gray-100 pt-6">
                      <span className="flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1 text-sm font-medium text-gray-500">
                        <Clock className="h-4 w-4" /> {service.duration}
                      </span>
                      <div className="text-right">
                        <span className="mb-0.5 block text-xs text-gray-400">ab</span>
                        <span className="text-2xl font-bold text-[#1e3a5f]">
                          {service.priceFrom.toFixed(2).replace('.', ',')} €
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50/50 pt-6">
                    <Button
                      className="h-12 w-full bg-[#1e3a5f] text-base font-bold text-white shadow-md transition-all hover:bg-[#2d4a6f] hover:shadow-lg"
                      onClick={() => {
                        setSelectedService(service)
                        setIsBookingOpen(true)
                      }}
                    >
                      Termin vereinbaren
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Why Us */}
        <section className="border-t border-gray-200 bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-[#1e3a5f]">
                Ihre Vorteile bei {companyConfig.name}
              </h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                Als Ihre KFZ-Fachwerkstatt in Wien bieten wir Ihnen erstklassigen Service mit vielen
                Zusatzleistungen.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#e6fffa]">
                  <MessageCircle className="h-8 w-8 text-[#1e3a5f]" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#1e3a5f]">WhatsApp Support</h3>
                <p className="text-gray-600">
                  Schnelle Kommunikation für Termine und Rückfragen. Immer erreichbar.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#e6fffa]">
                  <Zap className="h-8 w-8 text-[#1e3a5f]" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#1e3a5f]">Express-Service</h3>
                <p className="text-gray-600">
                  Schnelle Bearbeitung bei Eilaufträgen. Viele Reparaturen noch am selben Tag
                  möglich.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#e6fffa]">
                  <ShieldCheck className="h-8 w-8 text-[#1e3a5f]" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#1e3a5f]">Transparente Festpreise</h3>
                <p className="text-gray-600">
                  Keine versteckten Kosten - Sie wissen immer, was Sie bezahlen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-[#1e3a5f]">Was unsere Kunden sagen</h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                Über 1000 zufriedene Kunden vertrauen auf unsere Expertise seit 2020.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <div key={i} className="relative rounded-2xl border border-gray-100 bg-gray-50 p-8">
                  <div className="mb-4 flex items-center gap-1 text-yellow-400">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mb-6 italic text-gray-700">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e3a5f] font-bold text-white">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-[#1e3a5f]">{t.name}</div>
                      <div className="text-xs text-gray-500">{t.location}</div>
                    </div>
                  </div>
                  {t.verified && (
                    <div className="absolute right-8 top-8 flex items-center gap-1 text-xs font-medium text-green-600">
                      <CheckCircle2 className="h-3 w-3" /> Verifiziert
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Used Cars Teaser */}
        <section className="relative overflow-hidden bg-[#162d47] py-20 text-white">
          <div className="absolute right-0 top-0 h-full w-1/2 translate-x-20 skew-x-12 transform bg-[#1e3a5f]"></div>
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold md:text-4xl">Geprüfte Gebrauchtwagen</h2>
                <p className="mb-8 text-lg text-gray-300">
                  Entdecken Sie unsere Auswahl an hochwertigen Gebrauchtwagen. Jedes Fahrzeug wird
                  von unseren Experten gründlich geprüft und kommt mit Garantie.
                </p>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#4fd1c5]" />{' '}
                    <span>Umfassende technische Prüfung</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#4fd1c5]" />{' '}
                    <span>Transparente Fahrzeughistorie</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#4fd1c5]" />{' '}
                    <span>Finanzierungsmöglichkeiten verfügbar</span>
                  </li>
                </ul>
                <Link to="/fahrzeuge">
                  <Button className="h-12 bg-[#4fd1c5] px-8 font-bold text-[#1e3a5f] hover:bg-[#38b2ac]">
                    Fahrzeuge ansehen <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop"
                  alt="Used Cars"
                  className="transform rounded-2xl shadow-2xl transition-transform duration-500 hover:rotate-0 md:rotate-2"
                />
                <div className="absolute -bottom-6 -left-6 hidden rounded-xl bg-white p-6 text-[#1e3a5f] shadow-xl md:block">
                  <div className="flex items-center gap-3">
                    <Car className="h-8 w-8 text-[#4fd1c5]" />
                    <div>
                      <div className="text-xl font-bold">Top Auswahl</div>
                      <div className="text-sm text-gray-500">Sofort verfügbar</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Dialog */}
        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl text-[#1e3a5f]">Termin anfragen</DialogTitle>
              <DialogDescription>
                Für: <span className="font-semibold text-[#1e3a5f]">{selectedService?.name}</span>
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleBook} className="grid gap-5 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Max Mustermann"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="h-11"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">E-Mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="max@mail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="h-11"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+43 ..."
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="h-11"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Wunschtermin</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="h-11"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="vehicle">Fahrzeug (Marke/Modell)</Label>
                <Input
                  id="vehicle"
                  placeholder="z.B. VW Golf VII"
                  value={formData.vehicle}
                  onChange={handleInputChange}
                  required
                  className="h-11"
                />
              </div>
              <DialogFooter className="mt-4">
                <Button
                  type="submit"
                  className="h-12 w-full bg-[#4fd1c5] text-lg font-bold text-[#1e3a5f] hover:bg-[#38b2ac]"
                  disabled={loading}
                >
                  {loading ? <Loader className="h-5 w-5 animate-spin" /> : 'Kostenlos anfragen'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
    </div>
  )
}

export default WorkshopPage

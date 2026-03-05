"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

const origins = [
  {
    id: "ethiopia",
    image: "/images/origin-ethiopia.jpg",
    color: "from-amber-900/80",
    accent: "bg-amber-600",
  },
  {
    id: "colombia",
    image: "/images/origin-colombia.jpg",
    color: "from-emerald-900/80",
    accent: "bg-emerald-600",
  },
  {
    id: "uganda",
    image: "/images/origin-uganda.jpg",
    color: "from-orange-900/80",
    accent: "bg-orange-700",
  },
  {
    id: "india",
    image: "/images/origin-india.jpg",
    color: "from-teal-900/80",
    accent: "bg-teal-700",
  },
]

export function OriginsJourney() {
  const { t, locale } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isRTL = locale === "ar"

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Auto-rotate through origins
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % origins.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const originsData = t.origins?.items || {
    ethiopia: {
      country: "Éthiopie",
      title: "Le Berceau du Café",
      description: "Là où tout a commencé. Dans les hauts plateaux éthiopiens, nos grains d'Arabica hérité développent des notes florales et fruitées uniques, cultivés selon des traditions millénaires.",
      altitude: "1,500 - 2,200m",
      notes: "Floral, Fruité, Agrumes",
    },
    colombia: {
      country: "Colombie",
      title: "L'Excellence Andine",
      description: "Au cœur des Andes colombiennes, nos grains d'Arabica mûrissent lentement sous l'ombre des bananiers, développant une acidité brillante et un corps soyeux incomparable.",
      altitude: "1,200 - 1,800m",
      notes: "Caramel, Noisette, Chocolat",
    },
    uganda: {
      country: "Ouganda",
      title: "La Force Africaine",
      description: "Des montagnes Rwenzori, notre Robusta d'exception apporte une intensité profonde et une crema onctueuse. La puissance de l'Afrique dans chaque tasse.",
      altitude: "1,200 - 1,500m",
      notes: "Intense, Boisé, Cacao",
    },
    india: {
      country: "Inde",
      title: "Le Mystère Malabar",
      description: "Sous les pluies de mousson des Ghâts occidentaux, nos grains développent un caractère unique. Un voyage sensoriel entre épices et douceur tropicale.",
      altitude: "1,000 - 1,500m",
      notes: "Épicé, Terreux, Doux",
    },
  }

  const activeOrigin = origins[activeIndex]
  const activeData = originsData[activeOrigin.id as keyof typeof originsData]

  return (
    <section
      id="origins"
      ref={sectionRef}
      className="relative min-h-screen bg-off-black overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background Images - All loaded, only one visible */}
      {origins.map((origin, index) => (
        <div
          key={origin.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={origin.image}
            alt={originsData[origin.id as keyof typeof originsData]?.country || origin.id}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${origin.color} via-off-black/60 to-off-black/90`} />
        </div>
      ))}

      {/* Moroccan pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] bg-repeat pointer-events-none"
        style={{ backgroundImage: "url('/images/moroccan-pattern-gold.jpg')", backgroundSize: "400px" }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 lg:px-16 py-24">
        <div className="max-w-7xl mx-auto w-full">
          {/* Section Header */}
          <div
            className={`mb-16 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Moroccan star divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-gold/40" />
              <svg className="w-5 h-5 text-gold opacity-60" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8L12 2Z" stroke="currentColor" strokeWidth="1" />
              </svg>
              <div className="w-12 h-px bg-gold/40" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white tracking-tight">
              {t.origins?.title || "Notre Voyage"}
            </h2>
            <p className="mt-4 text-white/60 text-lg max-w-xl font-sans">
              {t.origins?.subtitle || "Quatre terroirs d'exception. Un mélange unique."}
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Left: Origin Info */}
            <div
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              {/* Country Badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-3 h-3 rounded-full ${activeOrigin.accent}`} />
                <span className="text-gold uppercase tracking-[0.3em] text-sm font-sans">
                  {activeData?.country}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                {activeData?.title}
              </h3>

              {/* Description */}
              <p className="text-white/70 text-lg leading-relaxed mb-8 font-sans">
                {activeData?.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8">
                <div>
                  <p className="text-gold text-sm uppercase tracking-wider mb-1 font-sans">
                    {t.origins?.altitude || "Altitude"}
                  </p>
                  <p className="text-white text-xl font-serif">{activeData?.altitude}</p>
                </div>
                <div>
                  <p className="text-gold text-sm uppercase tracking-wider mb-1 font-sans">
                    {t.origins?.notes || "Notes"}
                  </p>
                  <p className="text-white text-xl font-serif">{activeData?.notes}</p>
                </div>
              </div>
            </div>

            {/* Right: Navigation Dots & Map indicator */}
            <div
              className={`flex flex-col items-center lg:items-end transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              {/* Vertical Navigation */}
              <div className="flex flex-row lg:flex-col gap-6">
                {origins.map((origin, index) => {
                  const data = originsData[origin.id as keyof typeof originsData]
                  return (
                    <button
                      key={origin.id}
                      onClick={() => setActiveIndex(index)}
                      className={`group flex items-center gap-4 transition-all duration-300 ${
                        index === activeIndex ? "opacity-100" : "opacity-50 hover:opacity-80"
                      }`}
                    >
                      {/* Country name (hidden on mobile) */}
                      <span
                        className={`hidden lg:block text-sm font-sans transition-all duration-300 ${
                          index === activeIndex ? "text-gold" : "text-white/60"
                        }`}
                      >
                        {data?.country}
                      </span>
                      
                      {/* Indicator */}
                      <div className="relative">
                        <div
                          className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                            index === activeIndex
                              ? "border-gold bg-gold"
                              : "border-white/30 bg-transparent group-hover:border-gold/50"
                          }`}
                        />
                        {index === activeIndex && (
                          <div className="absolute inset-0 w-4 h-4 rounded-full bg-gold animate-ping opacity-30" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Decorative Line */}
              <div className="hidden lg:block w-px h-32 bg-gradient-to-b from-gold/30 to-transparent mt-8" />
            </div>
          </div>

          {/* Bottom: Bean type indicators */}
          <div
            className={`mt-16 pt-8 border-t border-white/10 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-8">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                  <span className="text-white/60 text-sm font-sans">Arabica</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-red" />
                  <span className="text-white/60 text-sm font-sans">Robusta</span>
                </div>
              </div>
              
              <p className="text-white/40 text-sm font-sans italic">
                {t.origins?.blendNote || "Le secret de nos mélanges: l'équilibre parfait entre ces quatre terroirs."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Moroccan corner accents */}
      <div className="absolute top-8 left-8 w-24 h-24 border-l border-t border-gold/20 pointer-events-none" />
      <div className="absolute top-8 right-8 w-24 h-24 border-r border-t border-gold/20 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-24 h-24 border-l border-b border-gold/20 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-r border-b border-gold/20 pointer-events-none" />
    </section>
  )
}

"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/language-context"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const { t, dir } = useLanguage()

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-off-black" dir={dir}>
      {/* Background with coffee beans image */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/coffee-beans-hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-off-black/70" />
        
        {/* Moroccan pattern overlay - subtle gold geometric */}
        <div 
          className="absolute inset-0 opacity-[0.03] bg-repeat"
          style={{ backgroundImage: "url('/images/moroccan-pattern-gold.jpg')", backgroundSize: "300px" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Moroccan star accent */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-px bg-gold/40" />
            <svg className="w-6 h-6 text-gold opacity-60" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8L12 2Z"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
            <div className="w-12 h-px bg-gold/40" />
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight tracking-tight text-balance">
            {(t.hero?.tagline || "Précision dans Chaque Infusion. Héritage dans Chaque Tasse.").split(".")[0]}.
            <br />
            <span className="text-gold">{(t.hero?.tagline || "Précision dans Chaque Infusion. Héritage dans Chaque Tasse.").split(".")[1]}.</span>
          </h1>
        </div>

        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mt-8 text-lg md:text-xl text-white/60 font-light tracking-wide max-w-2xl mx-auto">
            {t.hero.description}
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="#boutique"
            className="group inline-flex items-center mt-12 px-8 py-4 border border-gold text-gold text-sm tracking-widest uppercase transition-all duration-500 hover:bg-gold hover:text-off-black"
          >
            <span>{t.hero.cta}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${dir === "rtl" ? "mr-3 group-hover:-translate-x-1 rotate-180" : "ml-3 group-hover:translate-x-1"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-white/40 tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  )
}

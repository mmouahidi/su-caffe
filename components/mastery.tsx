"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export function Mastery() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { t, dir } = useLanguage()

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

  return (
    <section
      id="mastery"
      ref={sectionRef}
      className="py-24 md:py-32 bg-off-black relative overflow-hidden"
      dir={dir}
    >
      {/* Subtle Moroccan pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] bg-repeat"
        style={{ backgroundImage: "url('/images/moroccan-pattern-gold.jpg')", backgroundSize: "400px" }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 ltr:-translate-x-12 rtl:translate-x-12"
            }`}
          >
            <div className="aspect-[4/5] relative overflow-hidden">
              {/* Real coffee pour image with warm dark filter */}
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VERT_download-LSvKEgihs34nzBwiSKXsMAEWqEqZx5.webp"
                alt="Artisanal espresso extraction"
                fill
                className="object-cover brightness-75 contrast-110 saturate-110 sepia-[0.15]"
              />
              
              {/* Warm dark overlay for moody atmosphere */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-off-black/40" />
              
              {/* Moroccan corner decorations */}
              <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-gold/30 z-10" />
              <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-gold/30 z-10" />
              <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-gold/30 z-10" />
              <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-gold/30 z-10" />
            </div>
          </div>

          {/* Text Side */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 ltr:translate-x-12 rtl:-translate-x-12"
            }`}
          >
            <div className="w-12 h-px bg-gold mb-8" />
            
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              {t.mastery.title}
              <br />
              <span className="text-gold">{t.mastery.subtitle}</span>
            </h2>

            <div className="mt-8 space-y-6">
              <p className="text-white/70 leading-relaxed">
                {t.mastery.description}
              </p>

              <div className="w-8 h-px bg-gold/40" />

              <p className="text-white/60 leading-relaxed">
                {t.mastery.philosophy}
              </p>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <div className="font-serif text-3xl text-gold">25+</div>
                <div className="mt-1 text-xs text-white/40 tracking-widest uppercase">{t.mastery.stats.years}</div>
              </div>
              <div>
                <div className="font-serif text-3xl text-gold">12</div>
                <div className="mt-1 text-xs text-white/40 tracking-widest uppercase">{t.mastery.stats.countries}</div>
              </div>
              <div>
                <div className="font-serif text-3xl text-gold">8</div>
                <div className="mt-1 text-xs text-white/40 tracking-widest uppercase">{t.mastery.stats.blends}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

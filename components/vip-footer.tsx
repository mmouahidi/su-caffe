"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export function VIPFooter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail("")
    }
  }

  return (
    <footer id="vip" ref={sectionRef} className="bg-off-black" dir={dir}>
      {/* Moroccan border decoration */}
      <div 
        className="h-6 opacity-10 bg-repeat-x"
        style={{ backgroundImage: "url('/images/moroccan-border.jpg')", backgroundSize: "auto 100%" }}
      />
      
      {/* Newsletter Section */}
      <div className="py-24 md:py-32 border-t border-white/5 relative">
        {/* Subtle Moroccan pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015] bg-repeat"
          style={{ backgroundImage: "url('/images/moroccan-pattern-gold.jpg')", backgroundSize: "350px" }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div
            className={`max-w-2xl mx-auto text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="w-12 h-px bg-gold mx-auto mb-8" />
            
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white tracking-tight">
              {t.footer.newsletter.title}
            </h2>
            
            <p className="mt-6 text-white/50 tracking-wide leading-relaxed">
              {t.footer.newsletter.description}
            </p>

            {/* Newsletter Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="mt-10">
                <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto">
                  <div className="relative w-full">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.footer.newsletter.placeholder}
                      className="w-full bg-transparent border-b border-gold/40 focus:border-gold pb-3 text-white placeholder:text-white/30 text-sm tracking-wide outline-none transition-colors duration-300"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="text-gold text-sm tracking-widest uppercase hover:text-white transition-colors duration-300 whitespace-nowrap"
                  >
                    {t.footer.newsletter.button}
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-10 text-gold text-sm tracking-widest uppercase animate-fade-in">
                {t.footer.newsletter.success}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo */}
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-MsII991RHahBoDHjPVCFbfMzbiuuZN.png"
              alt="Sú Caffè"
              width={120}
              height={40}
              className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
            />

            {/* Links */}
            <nav className="flex items-center gap-8">
              <a
                href="#boutique"
                className="text-xs text-white/40 hover:text-gold tracking-widest uppercase transition-colors duration-300"
              >
                {t.footer.links.boutique}
              </a>
              <a
                href="#mastery"
                className="text-xs text-white/40 hover:text-gold tracking-widest uppercase transition-colors duration-300"
              >
                {t.footer.links.about}
              </a>
              <a
                href="#vip"
                className="text-xs text-white/40 hover:text-gold tracking-widest uppercase transition-colors duration-300"
              >
                {t.footer.links.contact}
              </a>
            </nav>

            {/* Copyright */}
            <p className="text-xs text-white/30 tracking-wide">
              &copy; {new Date().getFullYear()} Sú Caffè. {t.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

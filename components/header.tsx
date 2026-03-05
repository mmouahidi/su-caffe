"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Menu, X } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "./language-switcher"

export function Header() {
  const { itemCount, setIsCartOpen } = useCart()
  const { t, dir } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-off-black/95 backdrop-blur-sm"
          : "bg-transparent"
      }`}
      dir={dir}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Left Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#origins"
              className="text-sm tracking-widest text-white/80 hover:text-gold transition-colors duration-300 uppercase"
            >
              {t.nav.origins}
            </Link>
            <Link
              href="#boutique"
              className="text-sm tracking-widest text-white/80 hover:text-gold transition-colors duration-300 uppercase"
            >
              {t.nav.boutique}
            </Link>
          </div>

          {/* Centered Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-MsII991RHahBoDHjPVCFbfMzbiuuZN.png"
              alt="Sú Caffè"
              width={140}
              height={50}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Right Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="#vip"
              className="text-sm tracking-widest text-white/80 hover:text-gold transition-colors duration-300 uppercase"
            >
              {t.nav.contact}
            </Link>
            <LanguageSwitcher />
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-white/80 hover:text-gold transition-colors duration-300 relative"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 rtl:-top-2 rtl:-left-2 rtl:right-auto w-5 h-5 bg-gold text-off-black text-xs font-sans font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Shopping cart</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white/80 hover:text-gold transition-colors duration-300 ltr:ml-auto rtl:mr-auto"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-off-black/95 backdrop-blur-sm transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? "max-h-screen py-8" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 px-6">
          <Link
            href="#origins"
            className="text-sm tracking-widest text-white/80 hover:text-gold transition-colors duration-300 uppercase"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t.nav.origins}
          </Link>
          <Link
            href="#boutique"
            className="text-sm tracking-widest text-white/80 hover:text-gold transition-colors duration-300 uppercase"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t.nav.boutique}
          </Link>
          <Link
            href="#mastery"
            className="text-sm tracking-widest text-white/80 hover:text-gold transition-colors duration-300 uppercase"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t.nav.mastery}
          </Link>
          <Link
            href="#vip"
            className="text-sm tracking-widest text-white/80 hover:text-gold transition-colors duration-300 uppercase"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t.nav.contact}
          </Link>
          <div className="pt-4 border-t border-white/10 w-full flex justify-center">
            <LanguageSwitcher />
          </div>
          <button 
            onClick={() => {
              setIsCartOpen(true)
              setIsMobileMenuOpen(false)
            }}
            className="flex items-center gap-2 text-white/80 hover:text-gold transition-colors duration-300"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="text-gold font-sans">({itemCount})</span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

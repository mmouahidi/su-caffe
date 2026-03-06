"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"
import { useLanguage } from "@/lib/language-context"
import { nhost } from "@/lib/nhost"
import { useLocalData } from "@/lib/app-config"
import { ShoppingBag, MapPin, Flame, Coffee } from "lucide-react"

interface Product {
  id: string
  name: string
  name_ar?: string
  name_en?: string
  description: string
  description_ar?: string
  description_en?: string
  short_description: string
  short_description_ar?: string
  short_description_en?: string
  price: number
  weight: string
  image_url: string
  color_class: string
  origin: string
  origin_ar?: string
  origin_en?: string
  roast_level: string
  roast_level_ar?: string
  roast_level_en?: string
  flavor_notes: string
  flavor_notes_ar?: string
  flavor_notes_en?: string
  is_active: boolean
  category?: string
  is_highlighted?: boolean
}

// Brewing method icons
function DripperIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
      <path d="M12 2v4M12 6c-3 0-6 3-6 6v1h12v-1c0-3-3-6-6-6zM6 13v3c0 3 2.5 6 6 6s6-3 6-6v-3" />
    </svg>
  )
}

function EspressoIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
      <rect x="3" y="8" width="14" height="10" rx="1" />
      <path d="M17 11h2a2 2 0 012 2v0a2 2 0 01-2 2h-2" />
      <path d="M6 8V6a2 2 0 012-2h4a2 2 0 012 2v2" />
      <path d="M6 18v2h8v-2" />
    </svg>
  )
}

function MokaIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
      <path d="M8 22h8l2-10H6l2 10z" />
      <path d="M6 12V8a2 2 0 012-2h8a2 2 0 012 2v4" />
      <path d="M10 6V4a2 2 0 012-2v0a2 2 0 012 2v2" />
    </svg>
  )
}

function FrenchPressIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
      <rect x="6" y="6" width="12" height="14" rx="1" />
      <path d="M12 2v4M9 6h6" />
      <path d="M12 6v14M8 12h8" />
    </svg>
  )
}

// Fetch products from API instead of hardcoded default
const filterOptions = [
  { id: 'all', label: 'All Coffees' },
  { id: 'blend', label: 'Blends' },
  { id: 'single-origin', label: 'Single Origins' },
  { id: 'espresso', label: 'Espresso' },
  { id: 'decaf', label: 'Decaf' },
]

export function Boutique() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [activeFilter, setActiveFilter] = useState('all')
  const { addItem } = useCart()
  const { t, locale, dir } = useLanguage()

  // Helper to get localized content
  const getLocalized = (product: Product, field: keyof Product) => {
    if (locale === "ar") {
      const arField = `${String(field)}_ar` as keyof Product
      return (product[arField as keyof Product] as string) || (product[field] as string)
    }
    if (locale === "en") {
      const enField = `${String(field)}_en` as keyof Product
      return (product[enField as keyof Product] as string) || (product[field] as string)
    }
    return product[field] as string
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await nhost.graphql.request(`
        query {
          products(where: {is_active: {_eq: true}}, order_by: {created_at: asc}) {
            id name name_ar name_en description description_ar description_en short_description short_description_ar short_description_en price weight image_url color_class origin origin_ar origin_en roast_level roast_level_ar roast_level_en flavor_notes flavor_notes_ar flavor_notes_en is_active category is_highlighted
          }
        }
      `)
      if (!error && data?.products) {
        setProducts(data.products)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        if (response.ok) {
          const data = await response.json()
          setProducts(data)
        }
      } catch (error) {
        console.error("Failed to fetch products:", error)
      }
    }
    fetchProducts()
  }, [])

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

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: getLocalized(product, "name"),
      price: product.price,
      image_url: product.image_url,
      weight: product.weight,
    })
  }

  return (
    <section
      id="boutique"
      ref={sectionRef}
      className="py-24 md:py-32 bg-background relative"
      dir={dir}
    >
      {/* Moroccan border decoration at top */}
      <div
        className="absolute top-0 left-0 right-0 h-8 opacity-20 bg-repeat-x"
        style={{ backgroundImage: "url('/images/moroccan-border.jpg')", backgroundSize: "auto 100%" }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {/* Moroccan star divider */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-gold/40" />
            <svg className="w-5 h-5 text-gold opacity-50" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8L12 2Z" stroke="currentColor" strokeWidth="1" />
            </svg>
            <div className="w-8 h-px bg-gold/40" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground tracking-tight">
            {t.boutique.title}
          </h2>
        </div>

        {/* Filters */}
        <div className={`flex flex-wrap items-center justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full text-sm font-sans tracking-wide transition-all ${activeFilter === filter.id
                ? "bg-gold text-white shadow-md shadow-gold/20"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {products
            .filter((product) => activeFilter === "all" || product.category === activeFilter)
            .map((product, index) => (
              <div
                key={product.id}
                className={`group relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  } ${product.is_highlighted ? "md:col-span-2 shadow-xl shadow-gold/5 border border-gold/20 p-2 rounded transform scale-[1.01]" : ""}`}
                style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              >
                {product.is_highlighted && (
                  <div className="absolute top-4 right-4 z-20 bg-gold text-white px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-sm shadow-sm flex items-center gap-1">
                    <Flame className="w-3 h-3" /> {t.boutique?.bestseller || "Bestseller"}
                  </div>
                )}
                <div
                  className={`relative aspect-[4/5] ${product.color_class} overflow-hidden rounded-sm`}
                >
                  {/* Moroccan corner accents */}
                  <div className="absolute top-3 left-3 w-8 h-8 border-l border-t border-gold/30 z-10" />
                  <div className="absolute top-3 right-3 w-8 h-8 border-r border-t border-gold/30 z-10" />
                  <div className="absolute bottom-3 left-3 w-8 h-8 border-l border-b border-gold/30 z-10" />
                  <div className="absolute bottom-3 right-3 w-8 h-8 border-r border-b border-gold/30 z-10" />

                  {/* Product Image */}
                  <div className="absolute inset-0 flex items-center justify-center p-8 transition-transform duration-700 group-hover:scale-105">
                    <Image
                      src={product.image_url}
                      alt={getLocalized(product, "name")}
                      width={400}
                      height={500}
                      className="object-contain max-h-full drop-shadow-2xl"
                    />
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />

                  {/* Add to Cart Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-6 py-3 bg-gold text-off-black font-sans text-sm tracking-widest uppercase flex items-center gap-2 hover:bg-gold/90 transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      {t.boutique.addToCart}
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="mt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-xl md:text-2xl text-foreground tracking-wide">
                        {getLocalized(product, "name")}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground tracking-wide">
                        {getLocalized(product, "short_description")}
                      </p>
                    </div>
                    <div className="text-right rtl:text-left">
                      <p className="font-serif text-xl text-gold">{product.price.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">MAD</p>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="mt-4 p-4 bg-neutral-100 border border-neutral-200">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {getLocalized(product, "description")}
                    </p>

                    {/* Product Attributes */}
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3 text-gold flex-shrink-0" />
                        <span>{t.boutique.origin}: {getLocalized(product, "origin")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Flame className="w-3 h-3 text-gold flex-shrink-0" />
                        <span>{t.boutique.roast}: {getLocalized(product, "roast_level")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Coffee className="w-3 h-3 text-gold flex-shrink-0" />
                        <span>{t.boutique.weight}: {product.weight}</span>
                      </div>
                    </div>

                    {/* Flavor Notes */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(getLocalized(product, "flavor_notes") || "").split(", ").filter(Boolean).map((note) => (
                        <span
                          key={note}
                          className="px-2 py-1 bg-gold/10 text-gold text-xs font-sans"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Brewing Method Icons */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 text-gold/60">
                      <DripperIcon />
                      <EspressoIcon />
                      <MokaIcon />
                      <FrenchPressIcon />
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="md:hidden px-4 py-2 bg-gold text-off-black font-sans text-xs tracking-wider uppercase flex items-center gap-2"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      {t.boutique.addToCart}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

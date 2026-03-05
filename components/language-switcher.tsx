"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Locale } from "@/lib/translations"
import { Globe, Check } from "lucide-react"

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "fr", label: "Français", flag: "FR" },
  { code: "ar", label: "العربية", flag: "AR" },
  { code: "en", label: "English", flag: "EN" },
]

export function LanguageSwitcher({ variant = "default" }: { variant?: "default" | "compact" }) {
  const { locale, setLocale } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages.find((l) => l.code === locale)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 transition-colors duration-300 ${
          variant === "compact"
            ? "text-white/60 hover:text-white text-sm"
            : "text-white/80 hover:text-gold"
        }`}
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" strokeWidth={1.5} />
        <span className="font-sans text-sm">{currentLanguage?.flag}</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full mt-2 right-0 rtl:right-auto rtl:left-0 bg-off-black border border-white/10 shadow-xl z-50 min-w-[140px] overflow-hidden">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  setLocale(language.code)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-sm font-sans transition-colors ${
                  locale === language.code
                    ? "bg-gold/10 text-gold"
                    : "text-white/80 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{language.label}</span>
                {locale === language.code && (
                  <Check className="h-4 w-4" strokeWidth={2} />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

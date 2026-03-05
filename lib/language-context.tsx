"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react"
import { translations, Locale, Translations } from "./translations"

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translations
  dir: "ltr" | "rtl"
}

const defaultValue: LanguageContextType = {
  locale: "fr",
  setLocale: () => {},
  t: translations.fr,
  dir: "ltr",
}

const LanguageContext = createContext<LanguageContextType>(defaultValue)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load saved language preference
    try {
      const saved = localStorage.getItem("su-caffe-locale") as Locale | null
      if (saved && ["fr", "ar", "en"].includes(saved)) {
        setLocaleState(saved)
      }
    } catch {
      // localStorage not available
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    try {
      localStorage.setItem("su-caffe-locale", newLocale)
    } catch {
      // localStorage not available
    }
    // Update document direction for RTL support
    if (typeof document !== "undefined") {
      document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr"
      document.documentElement.lang = newLocale
    }
  }

  useEffect(() => {
    if (mounted && typeof document !== "undefined") {
      document.documentElement.dir = locale === "ar" ? "rtl" : "ltr"
      document.documentElement.lang = locale
    }
  }, [locale, mounted])

  const value = useMemo<LanguageContextType>(() => ({
    locale,
    setLocale,
    t: translations[locale] || translations.fr,
    dir: locale === "ar" ? "rtl" : "ltr",
  }), [locale])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

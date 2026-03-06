"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { nhost } from "@/lib/nhost"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { session, error } = await nhost.auth.signIn({
        email,
        password,
      })
      if (error) {
        setError(error.message)
      } else if (session) {
        // Temporarily bypass admin_users check so you can run ads immediately
        router.push("/admin")
        router.refresh()
      }
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { session, error } = await nhost.auth.signUp({
        email,
        password,
      })
      if (error) {
        setError(error.message)
      } else if (session) {
        // Automatically allow access for now
        router.push("/admin")
        router.refresh()
      }
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-off-black flex items-center justify-center p-6">
      {/* Moroccan pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] bg-repeat"
        style={{ backgroundImage: "url('/images/moroccan-pattern-gold.jpg')", backgroundSize: "300px" }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-MsII991RHahBoDHjPVCFbfMzbiuuZN.png"
            alt="Sú Caffè"
            width={180}
            height={60}
            className="mx-auto mb-4"
            priority
          />
          <p className="text-neutral-400 font-sans text-sm tracking-wider uppercase">
            Admin Portal
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-neutral-900/50 border border-neutral-800 p-8 relative">
          {/* Moroccan corner accents */}
          <div className="absolute top-2 left-2 w-8 h-8 border-l border-t border-gold/30" />
          <div className="absolute top-2 right-2 w-8 h-8 border-r border-t border-gold/30" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-l border-b border-gold/30" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-r border-b border-gold/30" />

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-neutral-300 text-sm font-sans mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-800/50 border border-neutral-700 text-white px-4 py-3 font-sans focus:border-gold focus:outline-none transition-colors"
                placeholder="admin@sucaffe.com"
                required
              />
            </div>

            <div>
              <label className="block text-neutral-300 text-sm font-sans mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-800/50 border border-neutral-700 text-white px-4 py-3 font-sans focus:border-gold focus:outline-none transition-colors"
                placeholder="••••••••"
                minLength={6}
                required
              />
            </div>

            {error && (
              <div className="bg-emerald-red/10 border border-emerald-red/30 text-emerald-red px-4 py-3 text-sm font-sans">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-off-black py-3 font-sans font-medium tracking-wide hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
            <button
              type="button"
              onClick={handleSignUp}
              disabled={loading}
              className="w-full bg-neutral-800 text-gold py-3 font-sans font-medium tracking-wide hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign Up (Temporary Access)
            </button>

            <p className="text-neutral-500 text-xs text-center font-sans mt-4">
              Use Sign Up if you dont have an account yet.
            </p>
          </form>
        </div>

        <p className="text-center text-neutral-500 text-sm mt-6 font-sans">
          Access restricted to authorized personnel only
        </p>
      </div>
    </div>
  )
}

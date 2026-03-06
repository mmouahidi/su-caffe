"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { nhost } from "@/lib/nhost"
import { useLocalData } from "@/lib/app-config"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  LogOut,
  Users
} from "lucide-react"

interface AdminSidebarProps {
  role: string
  userEmail: string
}

export function AdminSidebar({ role, userEmail }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    if (!useLocalData) {
      await nhost.auth.signOut()
    }
    router.push("/admin/login")
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { href: "/admin/products", label: "Products", icon: Package },
  ]

  // Only show users for admin role
  if (role === "admin") {
    navItems.push({ href: "/admin/users", label: "Users", icon: Users })
  }

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-off-black border-r border-neutral-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-neutral-800">
        <Link href="/admin">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-MsII991RHahBoDHjPVCFbfMzbiuuZN.png"
            alt="Sú Caffè"
            width={140}
            height={45}
            className="mx-auto"
          />
        </Link>
        <p className="text-center text-gold text-xs tracking-wider uppercase mt-2 font-sans">
          {role === "admin" ? "Admin" : "Commercial"}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href))
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded transition-colors font-sans text-sm ${isActive
                      ? "bg-gold/10 text-gold border-l-2 border-gold"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-neutral-800">
        <p className="text-neutral-500 text-xs font-sans truncate mb-3">
          {userEmail}
        </p>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-3 w-full text-neutral-400 hover:text-emerald-red hover:bg-emerald-red/10 rounded transition-colors font-sans text-sm"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  )
}

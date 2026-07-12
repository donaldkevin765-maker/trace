"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Shop" },
  { href: "/cart", label: "Carrello" },
]

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Don't show header on admin/supplier pages
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/supplier")) return null

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080808]/90 backdrop-blur-md border-b border-[#1a1a1a]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-white font-[family-name:var(--font-display)] text-lg tracking-[0.15em] uppercase hover:text-[#a09a8a] transition-colors"
        >
          TRACE
        </Link>

        <nav className="flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-xs tracking-[0.15em] uppercase transition-colors ${
                pathname === item.href
                  ? "text-white"
                  : "text-[#6b6558] hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="text-xs tracking-[0.15em] uppercase text-[#6b6558] hover:text-white transition-colors"
          >
            Accedi
          </Link>
        </nav>
      </div>
    </header>
  )
}

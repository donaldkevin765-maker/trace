"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useCart } from "@/lib/store"

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Shop" },
  { href: "/cart", label: "Carrello" },
]

export function Header() {
  const pathname = usePathname()
  const { count } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Don't show header on admin/supplier pages
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/supplier")) return null

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080808]/90 backdrop-blur-md border-b border-[#1a1a1a]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* TRACE Logo — #30 Outlined Stencil animato */}
        <Link href="/" className="relative group">
          <svg width="100" height="32" viewBox="0 0 100 32" className="block">
            {/* Stencil border */}
            <rect
              x="2" y="2" width="96" height="28" rx="3"
              fill="none" stroke="#ffffff" strokeWidth="1.2"
              strokeDasharray="240" strokeDashoffset={mounted ? "0" : "240"}
              style={{ transition: "stroke-dashoffset 1.2s ease-out", transitionDelay: "0.3s" }}
            />
            {/* Outlined text — stencil draw */}
            <text
              x="50" y="20" textAnchor="middle" dominantBaseline="central"
              fontFamily="'Space Grotesk','Arial Black',sans-serif"
              fontSize="14" fontWeight="900" letterSpacing="3"
              fill="none" stroke="#ffffff" strokeWidth="1"
              strokeDasharray="200" strokeDashoffset={mounted ? "0" : "200"}
              style={{ transition: "stroke-dashoffset 1.5s ease-out", transitionDelay: "0.6s" }}
            >
              TRACE
            </text>
            {/* Fill layer — appears after stroke draws */}
            <text
              x="50" y="20" textAnchor="middle" dominantBaseline="central"
              fontFamily="'Space Grotesk','Arial Black',sans-serif"
              fontSize="14" fontWeight="900" letterSpacing="3"
              fill="#ffffff" opacity={mounted ? 1 : 0}
              style={{ transition: "opacity 0.4s ease-out", transitionDelay: "1.6s" }}
              className="group-hover:opacity-60 transition-opacity duration-300"
            >
              TRACE
            </text>
          </svg>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-xs tracking-[0.15em] uppercase transition-all duration-300 py-1 ${
                  isActive
                    ? "text-white"
                    : "text-[#6b6558] hover:text-white"
                }`}
              >
                {item.label}
                {/* Stencil underline */}
                <span
                  className={`absolute -bottom-0.5 left-0 h-[1px] bg-white transition-transform duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                  style={{ transformOrigin: "left" }}
                />
              </Link>
            )
          })}

          {/* Cart link with count */}
          <Link
            href="/cart"
            className={`relative text-xs tracking-[0.15em] uppercase transition-all duration-300 py-1 ${
              pathname === "/cart" ? "text-white" : "text-[#6b6558] hover:text-white"
            }`}
          >
            <span className="flex items-center gap-1.5">
              Carrello
              {mounted && count > 0 && (
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-white text-black text-[9px] font-medium font-[family-name:var(--font-mono)]">
                  {count}
                </span>
              )}
            </span>
          </Link>

          <Link
            href="/login"
            className="text-xs tracking-[0.15em] uppercase text-[#6b6558] hover:text-white transition-colors duration-300"
          >
            Accedi
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span className={`block w-5 h-px bg-white transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
          <span className={`block w-5 h-px bg-white transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-white transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#080808]/98 backdrop-blur-md border-b border-[#1a1a1a]">
          <div className="px-6 py-6 flex flex-col gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm tracking-[0.15em] uppercase transition-colors ${
                  pathname === item.href ? "text-white" : "text-[#6b6558]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/cart"
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-[0.15em] uppercase text-[#6b6558] flex items-center gap-2"
            >
              Carrello {count > 0 && `(${count})`}
            </Link>
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-[0.15em] uppercase text-[#6b6558]"
            >
              Accedi
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

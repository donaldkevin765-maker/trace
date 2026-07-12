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
        {/* TRACE Logo — stencil style */}
        <Link href="/" className="relative group">
          <div className="flex items-center gap-3">
            {/* Stencil border box */}
            <svg width="56" height="28" viewBox="0 0 56 28" className="absolute -left-1 -top-0.5">
              <rect
                x="2" y="2" width="52" height="24" rx="3"
                fill="none" stroke="#ffffff" strokeWidth="1.5"
                className="transition-all duration-500"
                style={{
                  strokeDasharray: "148",
                  strokeDashoffset: scrolled ? "0" : "148",
                }}
              />
            </svg>
            <span className="text-white font-[family-name:var(--font-display)] text-lg tracking-[0.15em] uppercase relative z-10 transition-colors duration-300 group-hover:text-[#a09a8a]">
              TRACE
            </span>
          </div>
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

"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

export function Footer() {
  const pathname = usePathname()

  // Don't show footer on admin/supplier pages
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/supplier")) return null

  return (
    <footer className="border-t border-[#1a1a1a] bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-white font-[family-name:var(--font-display)] text-lg tracking-[0.15em] uppercase mb-3">
              TRACE
            </div>
            <p className="text-[#6b6558] text-xs leading-relaxed max-w-xs">
              Basic curato. Vestibilità collaudate, materiali migliori, logo discreto.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white text-xs tracking-[0.15em] uppercase mb-3">Info</h4>
            <div className="flex flex-col gap-2">
              <Link href="/privacy" className="text-[#6b6558] text-xs hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/termini" className="text-[#6b6558] text-xs hover:text-white transition-colors">
                Termini
              </Link>
              <Link href="/returns" className="text-[#6b6558] text-xs hover:text-white transition-colors">
                Resi
              </Link>
              <Link href="/track" className="text-[#6b6558] text-xs hover:text-white transition-colors">
                Traccia ordine
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs tracking-[0.15em] uppercase mb-3">Contatti</h4>
            <div className="flex flex-col gap-2">
              <a href="mailto:info@trace-clothing.com" className="text-[#6b6558] text-xs hover:text-white transition-colors">
                info@trace-clothing.com
              </a>
              <p className="text-[#4a4538] text-xs">Italia — EU</p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1a1a1a] pt-6 text-center">
          <p className="text-[#3a3538] text-xs tracking-wider">
            TRACE &copy; {new Date().getFullYear()} &middot; Lascia la tua traccia
          </p>
        </div>
      </div>
    </footer>
  )
}

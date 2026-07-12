"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

export function Footer() {
  const pathname = usePathname()

  // Don't show footer on admin/supplier pages
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/supplier")) return null

  return (
    <footer className="bg-[#080808] relative">
      {/* Stencil border separator */}
      <div className="relative h-8 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 32">
          <line
            x1="40" y1="16" x2="1160" y2="16"
            stroke="#1a1a1a" strokeWidth="1"
            strokeDasharray="4 8"
          />
          <rect
            x="20" y="8" width="1160" height="16" rx="2"
            fill="none" stroke="#1a1a1a" strokeWidth="1"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand — prominent */}
          <div className="md:col-span-1">
            <div className="text-white font-[family-name:var(--font-display)] text-xl tracking-[0.15em] uppercase mb-4 relative inline-block">
              TRACE
              <span className="block w-8 h-[1px] bg-[#4a4538] mt-2" />
            </div>
            <p className="text-[#6b6558] text-xs font-[family-name:var(--font-mono)] leading-relaxed max-w-xs">
              Basic curato. Vestibilit&agrave; collaudate, materiali migliori, logo discreto.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white text-[10px] tracking-[0.2em] uppercase font-[family-name:var(--font-display)] mb-4">
              Info
            </h4>
            <div className="flex flex-col gap-2.5">
              {[
                { href: "/privacy", label: "Privacy" },
                { href: "/termini", label: "Termini" },
                { href: "/returns", label: "Resi" },
                { href: "/track", label: "Traccia ordine" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#4a4538] text-xs font-[family-name:var(--font-mono)] hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contatti */}
          <div>
            <h4 className="text-white text-[10px] tracking-[0.2em] uppercase font-[family-name:var(--font-display)] mb-4">
              Contatti
            </h4>
            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:info@trace-clothing.com"
                className="text-[#4a4538] text-xs font-[family-name:var(--font-mono)] hover:text-white transition-colors duration-300"
              >
                info@trace-clothing.com
              </a>
              <p className="text-[#3a3538] text-xs font-[family-name:var(--font-mono)]">Italia — EU</p>
            </div>
          </div>

          {/* Social / Brand statement */}
          <div>
            <h4 className="text-white text-[10px] tracking-[0.2em] uppercase font-[family-name:var(--font-display)] mb-4">
              Seguici
            </h4>
            <div className="flex flex-col gap-2.5">
              <a
                href="https://instagram.com/trace.clothing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4a4538] text-xs font-[family-name:var(--font-mono)] hover:text-white transition-colors duration-300"
              >
                Instagram
              </a>
              <a
                href="https://tiktok.com/@trace.clothing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4a4538] text-xs font-[family-name:var(--font-mono)] hover:text-white transition-colors duration-300"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1a1a1a] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#3a3538] text-[10px] font-[family-name:var(--font-mono)] tracking-wider">
            TRACE &copy; {new Date().getFullYear()}
          </p>
          <p className="text-[#4a4538] text-[10px] font-[family-name:var(--font-mono)] tracking-wider uppercase">
            Lascia la tua traccia
          </p>
        </div>
      </div>
    </footer>
  )
}

"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const PRODUCTS = [
  { id: "trace-set-001", name: "Hoodie + Pants Set", price: 89, category: "Set" },
  { id: "trace-hoodie-001", name: "Heavy Cotton Hoodie", price: 65, category: "Hoodie" },
  { id: "trace-pants-001", name: "Cargo Pants", price: 55, category: "Pants" },
  { id: "trace-tee-001", name: "Stencil Tee", price: 35, category: "T-Shirt" },
]

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="min-h-screen flex items-center justify-center bg-[#080808] relative overflow-hidden">
        {/* Noise texture */}
        {mounted && <div className="absolute inset-0 opacity-[0.015] trace-noise" />}

        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-[2px] bg-white/5 absolute top-0 animate-[scanline-sweep_4s_linear_infinite]" />
        </div>

        {/* Static noise dots */}
        {mounted && (
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute bg-white"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 4 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                }}
              />
            ))}
          </div>
        )}

        <div className="text-center px-6 relative z-10">
          {/* Stencil Border */}
          <svg className="mx-auto mb-6" width="360" height="120" viewBox="0 0 380 130">
            <rect
              x="10" y="10" width="360" height="110" rx="6"
              fill="none" stroke="#ffffff" strokeWidth="2.5"
              strokeDasharray="940" strokeDashoffset={mounted ? 0 : 940}
              style={{ transition: "stroke-dashoffset 2s ease-out" }}
            />
          </svg>

          {/* TRACE Letters */}
          <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl tracking-[0.15em] text-white uppercase leading-none mb-4">
            {"TRACE".split("").map((letter, i) => (
              <span
                key={i}
                className="inline-block"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(8px)",
                  transition: `opacity 0.4s ease-out ${1.6 + i * 0.2}s, transform 0.4s ease-out ${1.6 + i * 0.2}s`,
                }}
              >
                {letter}
              </span>
            ))}
          </h1>

          {/* Glitch overlays */}
          <div
            className="text-5xl md:text-7xl lg:text-8xl font-[family-name:var(--font-display)] tracking-[0.15em] uppercase absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ color: "#a03a3a", opacity: mounted ? 0 : 0, animation: mounted ? "glitch-flash 3s ease-in-out infinite" : "none", animationDelay: "1.5s" }}
            aria-hidden
          >
            TRACE
          </div>
          <div
            className="text-5xl md:text-7xl lg:text-8xl font-[family-name:var(--font-display)] tracking-[0.15em] uppercase absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ color: "#3a5a8a", opacity: mounted ? 0 : 0, animation: mounted ? "glitch-flash 2.5s ease-in-out infinite" : "none", animationDelay: "2s" }}
            aria-hidden
          >
            TRACE
          </div>

          {/* Tagline */}
          <p
            className="text-[#a09a8a] text-sm md:text-base tracking-[0.3em] uppercase mt-6 font-[family-name:var(--font-mono)]"
            style={{ opacity: mounted ? 1 : 0, transition: "opacity 1s ease-out 3s" }}
          >
            Lascia la tua traccia
          </p>

          <Link
            href="/product"
            className="inline-block mt-10 px-8 py-3 border border-[#1a1a1a] text-white text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-display)] hover:bg-white hover:text-black transition-all duration-300"
            style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease-out 3.5s" }}
          >
            Scopri il primo drop
          </Link>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-4 mb-4">
            <span className="w-6 h-px bg-[#4a4538]" />
            <span className="text-[#6b6558] text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-display)]">
              Il primo drop
            </span>
            <span className="w-6 h-px bg-[#4a4538]" />
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl tracking-[0.15em] uppercase text-white">
            Set coordinato. Due colori.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group trace-card p-4 hover:border-[#303030] transition-all duration-500"
            >
              <div className="aspect-[3/4] bg-[#0a0a0a] mb-4 flex items-center justify-center overflow-hidden relative">
                {/* Stencil border hover */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <rect x="8" y="8" width="calc(100% - 16px)" height="calc(100% - 16px)" rx="4"
                    fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 4"
                    className="opacity-30"
                  />
                </svg>
                <div className="text-[#1a1a1a] font-[family-name:var(--font-display)] text-5xl tracking-[0.15em] uppercase group-hover:text-[#303030] transition-colors duration-300">
                  T
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[#6b6558] text-[10px] tracking-[0.2em] uppercase font-[family-name:var(--font-mono)]">
                  {product.category}
                </p>
                <h3 className="text-white text-sm font-[family-name:var(--font-display)] tracking-[0.05em]">{product.name}</h3>
                <p className="text-[#a09a8a] text-sm font-[family-name:var(--font-mono)]">&euro; {product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section className="py-24 px-6 border-t border-[#1a1a1a] relative">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-4 mb-8">
            <span className="w-6 h-px bg-[#4a4538]" />
            <span className="text-[#6b6558] text-[10px] tracking-[0.3em] uppercase font-[family-name:var(--font-display)]">
              Filosofia
            </span>
            <span className="w-6 h-px bg-[#4a4538]" />
          </div>

          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-[0.1em] uppercase text-white mb-8 leading-tight">
            Basic curato
          </h2>

          <div className="space-y-4 font-[family-name:var(--font-mono)]">
            <p className="text-[#8a8578] text-sm leading-relaxed">
              Vestibilit&agrave; collaudate. Materiali migliori del mercato. Logo discreto.
            </p>
            <p className="text-[#6b6558] text-xs tracking-wider uppercase">
              Non urliamo. Entriamo, lasciamo il segno.
            </p>
          </div>

          {/* Divider */}
          <div className="mt-10 flex justify-center gap-2">
            {[1, 2, 3].map((i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]" />
            ))}
          </div>
        </div>
      </section>

      {/* ─── INSTAGRAM ─── */}
      <section className="py-20 px-6 border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <a
              href="https://instagram.com/trace.clothing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[#6b6558] text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-display)] hover:text-white transition-colors"
            >
              <span className="w-6 h-px bg-[#4a4538]" />
              @trace.clothing
              <span className="w-6 h-px bg-[#4a4538]" />
            </a>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 max-w-2xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-[#0a0a0a] flex items-center justify-center border border-[#1a1a1a] hover:border-[#303030] transition-colors">
                <span className="text-[#1a1a1a] text-xs font-[family-name:var(--font-display)]">T</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

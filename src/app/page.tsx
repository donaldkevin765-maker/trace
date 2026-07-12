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
        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-[2px] bg-white/5 absolute top-0 animate-[scanline-sweep_4s_linear_infinite]" />
        </div>

        {mounted && (
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
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

        <div className="text-center px-6">
          {/* Stencil Border */}
          <svg className="mx-auto mb-6" width="420" height="140" viewBox="0 0 420 140">
            <rect
              x="10" y="10" width="400" height="120" rx="6"
              fill="none" stroke="#ffffff" strokeWidth="3"
              strokeDasharray="800" strokeDashoffset={mounted ? 0 : 800}
              style={{ transition: "stroke-dashoffset 2s ease-out" }}
            />
          </svg>

          {/* TRACE Letters */}
          <h1 className="font-[family-name:var(--font-display)] text-6xl md:text-8xl tracking-[0.15em] text-white uppercase leading-none mb-4">
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

          {/* Glitch flash */}
          <div
            className="text-6xl md:text-8xl font-[family-name:var(--font-display)] tracking-[0.15em] uppercase absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ color: "#a03a3a", opacity: mounted ? 0 : 0, animation: mounted ? "glitch-flash 3s ease-in-out infinite" : "none", animationDelay: "1.5s" }}
            aria-hidden
          >
            TRACE
          </div>
          <div
            className="text-6xl md:text-8xl font-[family-name:var(--font-display)] tracking-[0.15em] uppercase absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ color: "#3a5a8a", opacity: mounted ? 0 : 0, animation: mounted ? "glitch-flash 2.5s ease-in-out infinite" : "none", animationDelay: "2s" }}
            aria-hidden
          >
            TRACE
          </div>

          {/* Tagline */}
          <p
            className="text-[#a09a8a] text-sm md:text-base tracking-[0.3em] uppercase mt-6"
            style={{ opacity: mounted ? 1 : 0, transition: "opacity 1s ease-out 3s" }}
          >
            Lascia la tua traccia
          </p>

          <Link
            href="/product"
            className="inline-block mt-10 px-8 py-3 border border-[#1a1a1a] text-white text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300"
            style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease-out 3.5s" }}
          >
            Scopri il primo drop
          </Link>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="font-[family-name:var(--font-display)] text-sm tracking-[0.2em] uppercase text-[#6b6558] mb-12 text-center">
          Il primo drop
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group trace-card p-4 hover:border-[#303030] transition-all duration-300"
            >
              <div className="aspect-[3/4] bg-[#0a0a0a] mb-4 flex items-center justify-center overflow-hidden">
                <div className="text-[#1a1a1a] font-[family-name:var(--font-display)] text-4xl tracking-[0.15em] uppercase group-hover:text-[#303030] transition-colors">
                  T
                </div>
              </div>
              <h3 className="text-white text-sm font-medium mb-1">{product.name}</h3>
              <p className="text-[#a09a8a] text-xs tracking-wider">&euro; {product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section className="py-24 px-6 border-t border-[#1a1a1a]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl tracking-[0.1em] uppercase text-white mb-6">
            Basic curato
          </h2>
          <p className="text-[#8a8578] text-sm leading-relaxed mb-4">
            Vestibilit&agrave; collaudate. Materiali migliori del mercato. Logo discreto.
          </p>
          <p className="text-[#6b6558] text-xs tracking-wider uppercase">
            Non urliamo. Entriamo, lasciamo il segno.
          </p>
        </div>
      </section>

      {/* ─── INSTAGRAM ─── */}
      <section className="py-24 px-6 border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-sm tracking-[0.2em] uppercase text-[#6b6558] mb-8 text-center">
            @trace.clothing
          </h2>
          <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-square bg-[#0a0a0a] flex items-center justify-center border border-[#1a1a1a]">
                <span className="text-[#1a1a1a] text-xs">T</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

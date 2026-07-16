"use client"

import { useState } from "react"

type LogoVariant = {
  id: number
  name: string
  desc: string
  render: (anim: boolean) => React.ReactNode
  renderFavicon: () => React.ReactNode
}

const LOGOS: LogoVariant[] = [
  // ─── 20 — Glitch skew ───
  {
    id: 20, name: "Glitch Skew", desc: "RGB split con skew, animazione glitch",
    render: (anim) => (
      <div className={`flex items-center justify-center gap-0 ${anim ? "logo-vhs" : ""}`}>
        <div className="relative">
          <span className="text-4xl md:text-5xl font-[family-name:var(--font-display)] font-black tracking-[0.08em] uppercase text-white block"
            style={{ transform: "skewX(-3deg)", opacity: 0.4, color: "#a03a3a", position: "absolute", top: 0, left: anim ? "-2px" : 0 }}>
            TRACE
          </span>
          <span className="text-4xl md:text-5xl font-[family-name:var(--font-display)] font-black tracking-[0.08em] uppercase text-white block"
            style={{ transform: "skewX(2deg)", opacity: 0.4, color: "#3a5a8a", position: "absolute", top: 0, left: anim ? "2px" : 0 }}>
            TRACE
          </span>
          <span className="text-4xl md:text-5xl font-[family-name:var(--font-display)] font-black tracking-[0.08em] uppercase text-white block relative z-10">
            TRACE
          </span>
        </div>
      </div>
    ),
    renderFavicon: () => (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <rect width="32" height="32" fill="#080808"/>
        <text x="16" y="22" font-family="'Space Grotesk','Arial Black',sans-serif" font-size="20" font-weight="900" fill="#fff" text-anchor="middle">T</text>
      </svg>
    ),
  },
  // ─── 21 — Stacked vertical ───
  {
    id: 21, name: "Stacked Vertical", desc: "T grande + RACE allineati, verticale",
    render: (anim) => (
      <div className="flex items-center gap-3">
        <span className="text-6xl md:text-7xl font-[family-name:var(--font-display)] font-black text-white leading-none">T</span>
        <div className="flex flex-col gap-0.5">
          {["R","A","C","E"].map((l, i) => (
            <span key={i} className="text-xl md:text-2xl font-[family-name:var(--font-display)] font-medium text-[#a09a8a] leading-none tracking-[0.15em]"
              style={anim ? { animation: `letter-fade-in 0.4s ease-out forwards`, animationDelay: `${1.6 + i * 0.15}s`, opacity: 0 } : {}}>
              {l}
            </span>
          ))}
        </div>
      </div>
    ),
    renderFavicon: () => (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <rect width="32" height="32" fill="#080808"/>
        <text x="16" y="22" font-family="'Space Grotesk','Arial Black',sans-serif" font-size="20" font-weight="900" fill="#fff" text-anchor="middle">T</text>
      </svg>
    ),
  },
  // ─── 22 — Orizzontale con separatore + EST 2026 ───
  {
    id: 22, name: "Orizzontale + EST 2026", desc: "TRACE orizzontale con separatore e anno",
    render: (anim) => (
      <div className="flex items-center gap-4">
        <span className="text-4xl md:text-5xl font-[family-name:var(--font-display)] font-black tracking-[0.08em] uppercase text-white">TRACE</span>
        <div className="h-10 w-px bg-[#303030]" />
        <span className={`text-[0.6rem] md:text-xs font-[family-name:var(--font-mono)] tracking-[0.3em] text-[#6b6558] ${anim ? "logo-tagline" : ""}`}
          style={anim ? { animationDelay: "0.5s" } : {}}>
          EST 2026
        </span>
      </div>
    ),
    renderFavicon: () => (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <rect width="32" height="32" fill="#080808"/>
        <text x="16" y="22" font-family="'Space Grotesk','Arial Black',sans-serif" font-size="20" font-weight="900" fill="#fff" text-anchor="middle">T</text>
      </svg>
    ),
  },
  // ─── 24 — T monogramma grande ───
  {
    id: 24, name: "T Monogram", desc: "T grande iconico + TRACE piccolo sotto",
    render: (anim) => (
      <div className="flex flex-col items-center">
        <span className="text-7xl md:text-8xl font-[family-name:var(--font-display)] font-black text-white leading-none">T</span>
        <span className={`text-[0.5rem] md:text-xs font-[family-name:var(--font-mono)] tracking-[0.3em] text-[#6b6558] mt-1 ${anim ? "logo-tagline" : ""}`}
          style={anim ? { animationDelay: "1s" } : {}}>
          TRACE
        </span>
      </div>
    ),
    renderFavicon: () => (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <rect width="32" height="32" fill="#080808"/>
        <text x="16" y="24" font-family="'Space Grotesk','Arial Black',sans-serif" font-size="24" font-weight="900" fill="#fff" text-anchor="middle">T</text>
      </svg>
    ),
  },
  // ─── 25 — T + RACE stacked ───
  {
    id: 25, name: "T + RACE Stacked", desc: "T a sinistra, RACE orizzontale a destra",
    render: (anim) => (
      <div className="flex items-center gap-3">
        <span className="text-6xl md:text-7xl font-[family-name:var(--font-display)] font-black text-white leading-none">T</span>
        <div className="h-14 w-px bg-[#303030]" />
        <div className="flex flex-col">
          <span className="text-2xl md:text-3xl font-[family-name:var(--font-display)] font-medium text-[#a09a8a] leading-tight tracking-[0.15em]">RACE</span>
          <span className={`text-[0.4rem] md:text-[0.5rem] font-[family-name:var(--font-mono)] tracking-[0.3em] text-[#4a4538] ${anim ? "logo-tagline" : ""}`}
            style={anim ? { animationDelay: "0.5s" } : {}}>
            STREETWEAR
          </span>
        </div>
      </div>
    ),
    renderFavicon: () => (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <rect width="32" height="32" fill="#080808"/>
        <text x="16" y="22" font-family="'Space Grotesk','Arial Black',sans-serif" font-size="20" font-weight="900" fill="#fff" text-anchor="middle">T</text>
      </svg>
    ),
  },
  // ─── 26 — Thin refined ───
  {
    id: 26, name: "Thin Refined", desc: "Lettering leggero, spaziato, elegante",
    render: (anim) => (
      <span className={`text-3xl md:text-4xl font-[family-name:var(--font-display)] font-light tracking-[0.25em] uppercase text-white ${anim ? "logo-vhs" : ""}`}>
        TRACE
      </span>
    ),
    renderFavicon: () => (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <rect width="32" height="32" fill="#080808"/>
        <text x="16" y="22" font-family="'Space Grotesk','Arial Black',sans-serif" font-size="18" font-weight="300" fill="#fff" text-anchor="middle" letter-spacing="2">T</text>
      </svg>
    ),
  },
  // ─── 30 — Outlined (stencil draw) ───
  {
    id: 30, name: "Outlined Stencil", desc: "Testo con bordo, perfetto per animazione stencil-draw",
    render: (anim) => (
      <div className="relative">
        {/* Stroke layer for stencil draw */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 60" preserveAspectRatio="xMidYMid meet">
          <text x="120" y="42" font-family="'Space Grotesk','Arial Black',sans-serif" font-size="38" font-weight="900"
            fill="none" stroke="#fff" strokeWidth="1.5" textAnchor="middle" dominantBaseline="central" letterSpacing="4"
            strokeDasharray="400" strokeDashoffset={anim ? 0 : 400}
            style={{ transition: "stroke-dashoffset 2s ease-out" }}>
            TRACE
          </text>
        </svg>
        {/* Fill layer (invisible if anim to show stroke first) */}
        <span className={`text-4xl md:text-5xl font-[family-name:var(--font-display)] font-black tracking-[0.12em] uppercase ${anim ? "text-transparent" : "text-white"}`}>
          TRACE
        </span>
      </div>
    ),
    renderFavicon: () => (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <rect width="32" height="32" fill="#080808"/>
        <text x="16" y="22" font-family="'Space Grotesk','Arial Black',sans-serif" font-size="20" font-weight="900" fill="none" stroke="#fff" stroke-width="1.5" text-anchor="middle">T</text>
      </svg>
    ),
  },
  // ─── 50 — Concrete texture ───
  {
    id: 50, name: "Concrete", desc: "Texture cemento grezzo con testo bianco",
    render: (anim) => (
      <div className="relative px-6 py-4">
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
          <filter id="conc50">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" />
            <feColorMatrix type="matrix" values="0.1 0 0 0 0.05 0 0.1 0 0 0.05 0 0 0.1 0 0.05 0 0 0 1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#conc50)" />
        </svg>
        <span className={`relative z-10 text-4xl md:text-5xl font-[family-name:var(--font-display)] font-black tracking-[0.08em] uppercase text-white ${anim ? "logo-vhs" : ""}`}>
          TRACE
        </span>
      </div>
    ),
    renderFavicon: () => (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <rect width="32" height="32" fill="#080808"/>
        <text x="16" y="22" font-family="'Space Grotesk','Arial Black',sans-serif" font-size="20" font-weight="900" fill="#fff" text-anchor="middle">T</text>
      </svg>
    ),
  },
]

export default function LogoTestPage() {
  const [anim, setAnim] = useState(true)
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[#080808] text-[#e0dcd5]">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8 border-b border-[#1a1a1a] pb-4">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-lg tracking-[0.2em] uppercase text-white">
              TRACE Logo Test
            </h1>
            <p className="text-xs font-[family-name:var(--font-mono)] text-[#6b6558] mt-1">
              Seleziona il tuo preferito — vedi come appare in header, loading screen e favicon
            </p>
          </div>
          <button
            onClick={() => setAnim(!anim)}
            className="text-xs tracking-[0.15em] uppercase font-[family-name:var(--font-display)] px-4 py-2 border border-[#1a1a1a] text-[#6b6558] hover:text-white hover:border-[#303030] transition-all"
          >
            ANIM: {anim ? "ON" : "OFF"}
          </button>
        </div>

        {/* Grid of logo candidates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {LOGOS.map((logo) => (
            <div
              key={logo.id}
              onClick={() => setSelected(logo.id)}
              className={`relative bg-[#0d0d0d] border rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] cursor-pointer transition-all ${
                selected === logo.id
                  ? "border-[#a09a8a] bg-[#141414]"
                  : "border-[#1a1a1a] hover:border-[#303030]"
              }`}
            >
              {/* Preview badge */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="text-[0.6rem] font-[family-name:var(--font-mono)] text-[#4a4538]">
                  #{logo.id}
                </span>
                {selected === logo.id && (
                  <span className="text-[0.5rem] font-[family-name:var(--font-mono)] tracking-[0.15em] text-[#a09a8a] uppercase">
                    ✓ Selected
                  </span>
                )}
              </div>

              {/* Logo render */}
              <div className="flex items-center justify-center min-h-[100px] w-full">
                {logo.render(anim)}
              </div>

              {/* Name & desc */}
              <div className="text-center mt-4">
                <div className="text-sm font-[family-name:var(--font-display)] tracking-[0.15em] uppercase text-white">
                  {logo.name}
                </div>
                <div className="text-[0.6rem] font-[family-name:var(--font-mono)] text-[#4a4538] mt-0.5">
                  {logo.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected logo previews */}
        {selected && (
          <div className="border-t border-[#1a1a1a] pt-8 mt-8">
            <h2 className="font-[family-name:var(--font-display)] text-sm tracking-[0.2em] uppercase text-[#a09a8a] mb-6">
              Preview #{selected} — come appare nel sito
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Header preview */}
              <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg p-4">
                <div className="text-[0.5rem] font-[family-name:var(--font-mono)] tracking-[0.2em] text-[#4a4538] uppercase mb-3">
                  Header
                </div>
                <div className="bg-[#080808] rounded p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {LOGOS.find(l => l.id === selected)?.render(false)}
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-2 bg-[#1a1a1a] rounded" />
                    <div className="w-6 h-2 bg-[#1a1a1a] rounded" />
                  </div>
                </div>
              </div>

              {/* Loading screen preview */}
              <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg p-4">
                <div className="text-[0.5rem] font-[family-name:var(--font-mono)] tracking-[0.2em] text-[#4a4538] uppercase mb-3">
                  Loading Screen
                </div>
                <div className="bg-[#080808] rounded p-4 flex flex-col items-center justify-center min-h-[120px] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: "128px 128px",
                  }} />
                  {LOGOS.find(l => l.id === selected)?.render(false)}
                  <div className="mt-3 h-0.5 w-16 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div className="h-full w-full bg-[#303030] rounded-full animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Favicon preview */}
              <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg p-4">
                <div className="text-[0.5rem] font-[family-name:var(--font-mono)] tracking-[0.2em] text-[#4a4538] uppercase mb-3">
                  Favicon
                </div>
                <div className="bg-[#080808] rounded p-4 flex items-center justify-center min-h-[120px]">
                  <div className="bg-[#0d0d0d] rounded-lg border border-[#1a1a1a] p-4 flex items-center justify-center">
                    {LOGOS.find(l => l.id === selected)?.renderFavicon()}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs font-[family-name:var(--font-mono)] text-[#6b6558]">
                {selected === 20 && "⭐ Glitch skew — effetto VHS + RGB split, molto streetwear"}
                {selected === 21 && "⭐ Stacked vertical — iconico, verticale, presence"}
                {selected === 22 && "⭐ Orizzontale con EST 2026 — pulito, professionale, completo"}
                {selected === 24 && "⭐ T monogramma — minimal, iconico, perfetto per favicon"}
                {selected === 25 && "⭐ T + RACE + STREETWEAR — bilanciato, narrativo, forte"}
                {selected === 26 && "⭐ Thin refined — elegante, leggero, sofisticato"}
                {selected === 30 && "⭐ Outlined stencil — perfetto per animazione stencil-draw"}
                {selected === 50 && "⭐ Concrete texture — grezzo, industriale, unico"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Brief splash screen showing the stencil TRACE logo
    const timer = setTimeout(() => {
      setMounted(true)
      setLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080808] relative overflow-hidden">
        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.02] trace-noise" />

        {/* Scanline */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-[2px] bg-white/5 absolute top-0 animate-[scanline-sweep_4s_linear_infinite]" />
        </div>

        {/* #30 Outlined Stencil — logo loading animato */}
        <div className="text-center">
          <svg className="mx-auto" width="280" height="100" viewBox="0 0 280 100">
            {/* Stencil border — draws first */}
            <rect
              x="6" y="6" width="268" height="88" rx="5"
              fill="none" stroke="#ffffff" strokeWidth="2"
              strokeDasharray="700" strokeDashoffset="700"
              style={{ animation: "stencil-draw 1.5s ease-out forwards" }}
            />
            {/* TRACE outlined — stencil draw */}
            <text
              x="140" y="48" textAnchor="middle" dominantBaseline="central"
              fontFamily="'Space Grotesk','Arial Black',sans-serif"
              fontSize="42" fontWeight="900" letterSpacing="6"
              fill="none" stroke="#ffffff" strokeWidth="1.5"
              strokeDasharray="500" strokeDashoffset="500"
              style={{ animation: "stencil-draw 1.8s ease-out forwards", animationDelay: "0.6s" }}
            >
              TRACE
            </text>
            {/* TRACE fill — fades in after stroke */}
            <text
              x="140" y="48" textAnchor="middle" dominantBaseline="central"
              fontFamily="'Space Grotesk','Arial Black',sans-serif"
              fontSize="42" fontWeight="900" letterSpacing="6"
              fill="#ffffff" opacity="0"
              style={{ animation: "letter-fade-in 0.5s ease-out forwards", animationDelay: "2.2s" }}
            >
              TRACE
            </text>
            {/* Tagline */}
            <text
              x="140" y="72" textAnchor="middle" dominantBaseline="central"
              fontFamily="'DM Mono',monospace" fontSize="7"
              fill="#6b6558" letterSpacing="4" opacity="0"
              style={{ animation: "tagline-fade 0.8s ease-out forwards", animationDelay: "2.8s" }}
            >
              EST. 2026
            </text>
          </svg>

          {/* Glitch flash overlays */}
          <div
            className="text-3xl font-[family-name:var(--font-display)] tracking-[0.12em] uppercase absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ color: "#a03a3a", animation: "glitch-flash 3s ease-in-out infinite", animationDelay: "2.5s" }}
            aria-hidden
          >
            TRACE
          </div>
          <div
            className="text-3xl font-[family-name:var(--font-display)] tracking-[0.12em] uppercase absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ color: "#3a5a8a", animation: "glitch-flash 2.5s ease-in-out infinite", animationDelay: "3s" }}
            aria-hidden
          >
            TRACE
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

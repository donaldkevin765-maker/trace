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

        {/* Stencil logo loading */}
        <div className="text-center">
          <svg className="mx-auto mb-4" width="240" height="90" viewBox="0 0 240 90">
            <rect
              x="8" y="8" width="224" height="74" rx="5"
              fill="none" stroke="#ffffff" strokeWidth="2.5"
              className="logo-stencil-path"
            />
          </svg>

          <div className="flex justify-center gap-1.5">
            {"TRACE".split("").map((letter, i) => (
              <span
                key={i}
                className="inline-block text-white font-[family-name:var(--font-display)] text-3xl tracking-[0.12em] uppercase logo-letter"
                style={{
                  opacity: 0,
                  animation: `letter-fade-in 0.4s ease-out forwards`,
                  animationDelay: `${1.6 + i * 0.2}s`,
                }}
              >
                {letter}
              </span>
            ))}
          </div>

          {/* Glitch overlay */}
          <div
            className="text-3xl font-[family-name:var(--font-display)] tracking-[0.12em] uppercase absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ color: "#a03a3a", animation: "glitch-flash 3s ease-in-out infinite", animationDelay: "1.5s" }}
            aria-hidden
          >
            TRACE
          </div>
          <div
            className="text-3xl font-[family-name:var(--font-display)] tracking-[0.12em] uppercase absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ color: "#3a5a8a", animation: "glitch-flash 2.5s ease-in-out infinite", animationDelay: "2s" }}
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

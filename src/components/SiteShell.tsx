"use client"

import { useEffect, useState } from "react"

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080808]">
        <div className="text-[#a09a8a] text-sm font-[family-name:var(--font-body)] tracking-widest uppercase">
          TRACE
        </div>
      </div>
    )
  }

  return <>{children}</>
}

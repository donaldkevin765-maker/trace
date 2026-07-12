"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SupplierLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("trace_token")
    if (!token) { router.push("/login"); return }
    fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(u => {
        if (u.role !== "supplier") { router.push("/"); return }
        setAuthed(true)
      })
      .catch(() => router.push("/login"))
  }, [router])

  if (!authed) return null

  const handleLogout = () => {
    localStorage.removeItem("trace_token")
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-[#080808] flex">
      <aside className="w-56 border-r border-[#1a1a1a] flex flex-col">
        <div className="p-6 border-b border-[#1a1a1a]">
          <div className="text-white font-[family-name:var(--font-display)] text-lg tracking-[0.15em] uppercase">TRACE</div>
          <p className="text-[#4a4538] text-xs tracking-wider mt-1">Fornitore</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/supplier" className="block px-3 py-2 text-xs tracking-wider text-[#6b6558] hover:text-white hover:bg-[#0d0d0d] transition-colors rounded">
            Dashboard
          </Link>
          <Link href="/supplier/ordini" className="block px-3 py-2 text-xs tracking-wider text-[#6b6558] hover:text-white hover:bg-[#0d0d0d] transition-colors rounded">
            Ordini
          </Link>
        </nav>
        <div className="p-4 border-t border-[#1a1a1a]">
          <button onClick={handleLogout} className="text-xs text-[#4a4538] tracking-wider hover:text-white transition-colors">
            Esci
          </button>
        </div>
      </aside>
      <div className="flex-1 overflow-auto p-8">{children}</div>
    </div>
  )
}

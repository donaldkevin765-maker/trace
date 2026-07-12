"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "◇" },
  { href: "/admin/prodotti", label: "Prodotti", icon: "□" },
  { href: "/admin/ordini", label: "Ordini", icon: "○" },
  { href: "/admin/fornitori", label: "Fornitori", icon: "△" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("trace_token")
    if (!token) { router.push("/login"); return }
    fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(u => {
        if (u.role !== "admin") { router.push("/"); return }
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
      {/* Sidebar */}
      <aside className="w-56 border-r border-[#1a1a1a] flex flex-col">
        <div className="p-6 border-b border-[#1a1a1a]">
          <Link href="/admin" className="text-white font-[family-name:var(--font-display)] text-lg tracking-[0.15em] uppercase">
            TRACE
          </Link>
          <p className="text-[#4a4538] text-xs tracking-wider mt-1">Admin</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-xs tracking-wider text-[#6b6558] hover:text-white hover:bg-[#0d0d0d] transition-colors rounded"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-[#1a1a1a]">
          <button onClick={handleLogout} className="text-xs text-[#4a4538] tracking-wider hover:text-white transition-colors">
            Esci
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </div>
    </div>
  )
}

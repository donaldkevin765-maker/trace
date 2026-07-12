"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("trace_token")
    if (!token) {
      router.push("/login")
      return
    }

    Promise.all([
      fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch("/api/orders", { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
    ])
      .then(([userData, ordersData]) => {
        setUser(userData)
        setOrders(Array.isArray(ordersData) ? ordersData : [])
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("trace_token")
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-[#6b6558] text-xs tracking-[0.2em] uppercase">Caricamento...</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-[family-name:var(--font-display)] text-2xl tracking-[0.15em] uppercase text-white">
            Ciao, {user.name}
          </h1>
          <button
            onClick={handleLogout}
            className="text-xs text-[#6b6558] tracking-wider uppercase hover:text-white transition-colors"
          >
            Esci
          </button>
        </div>

        {user.role === "admin" && (
          <div className="mb-8">
            <Link
              href="/admin"
              className="inline-block px-4 py-2 border border-[#1a1a1a] text-xs tracking-[0.15em] uppercase text-white hover:bg-white hover:text-black transition-all mr-3"
            >
              Admin Dashboard
            </Link>
          </div>
        )}

        {user.role === "supplier" && (
          <div className="mb-8">
            <Link
              href="/supplier"
              className="inline-block px-4 py-2 border border-[#1a1a1a] text-xs tracking-[0.15em] uppercase text-white hover:bg-white hover:text-black transition-all"
            >
              Portale Fornitore
            </Link>
          </div>
        )}

        {/* Orders */}
        <h2 className="font-[family-name:var(--font-display)] text-sm tracking-[0.15em] uppercase text-[#6b6558] mb-4">
          I tuoi ordini
        </h2>

        {orders.length === 0 ? (
          <div className="trace-card p-8 text-center">
            <p className="text-[#6b6558] text-sm mb-4">Nessun ordine ancora.</p>
            <Link
              href="/product"
              className="inline-block px-6 py-2 border border-[#1a1a1a] text-xs tracking-[0.2em] uppercase text-white hover:bg-white hover:text-black transition-all"
            >
              Scopri i prodotti
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order: any) => (
              <div key={order.id} className="trace-card p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-[#6b6558] tracking-wider uppercase">{order.id.slice(0, 12)}</span>
                  <span className={`text-xs tracking-wider uppercase ${
                    order.status === "confirmed" ? "text-green-400" :
                    order.status === "shipped" ? "text-blue-400" :
                    "text-[#6b6558]"
                  }`}>{order.status}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white text-sm">&euro; {order.total?.toFixed(2)}</span>
                  <span className="text-[#4a4538] text-xs">{new Date(order.created_at).toLocaleDateString("it-IT")}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

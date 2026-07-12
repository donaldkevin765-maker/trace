"use client"

import { useState, useEffect } from "react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0, todayRevenue: 0, totalOrders: 0, avgOrderValue: 0,
  })
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("trace_token")
    if (!token) return

    Promise.all([
      fetch("/api/orders", { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch("/api/products").then(r => r.json()),
    ]).then(([orders]) => {
      const ordersArr = Array.isArray(orders) ? orders : []
      setRecentOrders(ordersArr.slice(0, 10))

      const totalRevenue = ordersArr.reduce((sum: number, o: any) => sum + (o.total || 0), 0)
      const todayRevenue = ordersArr
        .filter((o: any) => new Date(o.created_at).toDateString() === new Date().toDateString())
        .reduce((sum: number, o: any) => sum + (o.total || 0), 0)

      setStats({
        totalRevenue,
        todayRevenue,
        totalOrders: ordersArr.length,
        avgOrderValue: ordersArr.length > 0 ? totalRevenue / ordersArr.length : 0,
      })
    }).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-[#6b6558] text-xs tracking-wider uppercase">Caricamento...</div>

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-xl tracking-[0.15em] uppercase text-white mb-8">
        Dashboard
      </h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Ricavi totali", value: `€ ${stats.totalRevenue.toFixed(2)}` },
          { label: "Oggi", value: `€ ${stats.todayRevenue.toFixed(2)}` },
          { label: "Ordini totali", value: stats.totalOrders.toString() },
          { label: "Valore medio", value: `€ ${stats.avgOrderValue.toFixed(2)}` },
        ].map((stat) => (
          <div key={stat.label} className="trace-card p-4">
            <p className="text-[#6b6558] text-xs tracking-wider uppercase mb-1">{stat.label}</p>
            <p className="text-white text-xl font-medium">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <h2 className="font-[family-name:var(--font-display)] text-sm tracking-[0.15em] uppercase text-white mb-4">
        Ordini recenti
      </h2>

      {recentOrders.length === 0 ? (
        <div className="trace-card p-8 text-center">
          <p className="text-[#6b6558] text-sm">Nessun ordine ancora.</p>
        </div>
      ) : (
        <div className="trace-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1a1a1a]">
                <th className="text-left p-3 text-[#6b6558] text-xs tracking-wider uppercase">ID</th>
                <th className="text-left p-3 text-[#6b6558] text-xs tracking-wider uppercase">Cliente</th>
                <th className="text-left p-3 text-[#6b6558] text-xs tracking-wider uppercase">Totale</th>
                <th className="text-left p-3 text-[#6b6558] text-xs tracking-wider uppercase">Status</th>
                <th className="text-left p-3 text-[#6b6558] text-xs tracking-wider uppercase">Data</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order: any) => (
                <tr key={order.id} className="border-b border-[#0a0a0a] hover:bg-[#0a0a0a] transition-colors">
                  <td className="p-3 text-white font-mono text-xs">{order.id?.slice(0, 12)}</td>
                  <td className="p-3 text-white">{order.customer || order.email}</td>
                  <td className="p-3 text-white">€ {order.total?.toFixed(2)}</td>
                  <td className="p-3">
                    <span className={`text-xs tracking-wider uppercase ${
                      order.status === "confirmed" ? "text-green-400" :
                      order.status === "shipped" ? "text-blue-400" :
                      "text-[#6b6558]"
                    }`}>{order.status}</span>
                  </td>
                  <td className="p-3 text-[#6b6558] text-xs">{new Date(order.created_at).toLocaleDateString("it-IT")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

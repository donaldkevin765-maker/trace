"use client"

import { useState, useEffect } from "react"

export default function SupplierDashboard() {
  const [orders, setOrders] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("trace_token")
    if (!token) return

    Promise.all([
      fetch("/api/orders", { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch("/api/products").then(r => r.json()),
    ]).then(([ordersData, productsData]) => {
      setOrders(Array.isArray(ordersData) ? ordersData : [])
      setProducts(Array.isArray(productsData) ? productsData : [])
    }).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-[#6b6558] text-xs tracking-wider uppercase">Caricamento...</div>

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-xl tracking-[0.15em] uppercase text-white mb-8">
        Dashboard Fornitore
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="trace-card p-4">
          <p className="text-[#6b6558] text-xs tracking-wider uppercase mb-1">Ordini ricevuti</p>
          <p className="text-white text-xl font-medium">{orders.length}</p>
        </div>
        <div className="trace-card p-4">
          <p className="text-[#6b6558] text-xs tracking-wider uppercase mb-1">Prodotti</p>
          <p className="text-white text-xl font-medium">{products.length}</p>
        </div>
        <div className="trace-card p-4">
          <p className="text-[#6b6558] text-xs tracking-wider uppercase mb-1">Da spedire</p>
          <p className="text-white text-xl font-medium">{orders.filter((o: any) => o.status === "confirmed").length}</p>
        </div>
      </div>

      <h2 className="font-[family-name:var(--font-display)] text-sm tracking-[0.15em] uppercase text-white mb-4">Ordini recenti</h2>

      {orders.length === 0 ? (
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
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 10).map((order: any) => (
                <tr key={order.id} className="border-b border-[#0a0a0a]">
                  <td className="p-3 text-white font-mono text-xs">{order.id?.slice(0, 12)}</td>
                  <td className="p-3 text-white">{order.customer || order.email}</td>
                  <td className="p-3 text-white">&euro; {order.total?.toFixed(2)}</td>
                  <td className="p-3">
                    <span className={`text-xs tracking-wider uppercase ${
                      order.status === "confirmed" ? "text-green-400" :
                      order.status === "shipped" ? "text-blue-400" : "text-[#6b6558]"
                    }`}>{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

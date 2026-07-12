"use client"

import { useState, useEffect } from "react"

export default function SupplierOrdini() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    const token = localStorage.getItem("trace_token")
    const res = await fetch("/api/orders", { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    setOrders(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { fetchOrders() }, [])

  const updateStatus = async (id: string, status: string) => {
    const token = localStorage.getItem("trace_token")
    await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    })
    fetchOrders()
  }

  if (loading) return <div className="text-[#6b6558] text-xs tracking-wider uppercase">Caricamento...</div>

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-xl tracking-[0.15em] uppercase text-white mb-8">
        I tuoi ordini
      </h1>

      <div className="trace-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1a1a1a]">
              <th className="text-left p-3 text-[#6b6558] text-xs tracking-wider uppercase">ID</th>
              <th className="text-left p-3 text-[#6b6558] text-xs tracking-wider uppercase">Cliente</th>
              <th className="text-left p-3 text-[#6b6558] text-xs tracking-wider uppercase">Prodotti</th>
              <th className="text-left p-3 text-[#6b6558] text-xs tracking-wider uppercase">Totale</th>
              <th className="text-left p-3 text-[#6b6558] text-xs tracking-wider uppercase">Status</th>
              <th className="text-left p-3 text-[#6b6558] text-xs tracking-wider uppercase">Aggiorna</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order.id} className="border-b border-[#0a0a0a]">
                <td className="p-3 text-white font-mono text-xs">{order.id?.slice(0, 12)}</td>
                <td className="p-3 text-white">{order.customer || order.email}</td>
                <td className="p-3">
                  <div className="text-xs text-[#8a8578]">
                    {order.items?.map((item: any, i: number) => (
                      <div key={i}>{item.name} x{item.quantity}</div>
                    ))}
                  </div>
                </td>
                <td className="p-3 text-white">&euro; {order.total?.toFixed(2)}</td>
                <td className="p-3">
                  <span className={`text-xs tracking-wider uppercase ${
                    order.status === "confirmed" ? "text-green-400" :
                    order.status === "shipped" ? "text-blue-400" : "text-[#6b6558]"
                  }`}>{order.status}</span>
                </td>
                <td className="p-3">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="bg-[#0d0d0d] border border-[#1a1a1a] text-white text-xs px-2 py-1 rounded focus:outline-none"
                  >
                    <option value="pending">In attesa</option>
                    <option value="confirmed">In produzione</option>
                    <option value="shipped">Spedito</option>
                    <option value="delivered">Consegnato</option>
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-[#6b6558]">Nessun ordine.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

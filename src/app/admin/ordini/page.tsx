"use client"

import { useState, useEffect } from "react"

export default function AdminOrdini() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<any>(null)

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
    <div className="flex gap-6">
      {/* Orders list */}
      <div className="flex-1">
        <h1 className="font-[family-name:var(--font-display)] text-xl tracking-[0.15em] uppercase text-white mb-8">Ordini</h1>

        <div className="trace-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1a1a1a]">
                <th className="text-left p-3 text-[#6b6558] text-xs tracking-wider uppercase">ID</th>
                <th className="text-left p-3 text-[#6b6558] text-xs tracking-wider uppercase">Cliente</th>
                <th className="text-left p-3 text-[#6b6558] text-xs tracking-wider uppercase">Totale</th>
                <th className="text-left p-3 text-[#6b6558] text-xs tracking-wider uppercase">Pagamento</th>
                <th className="text-left p-3 text-[#6b6558] text-xs tracking-wider uppercase">Status</th>
                <th className="text-left p-3 text-[#6b6558] text-xs tracking-wider uppercase">Data</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr key={order.id}
                  onClick={() => setSelected(order)}
                  className="border-b border-[#0a0a0a] hover:bg-[#0a0a0a] transition-colors cursor-pointer">
                  <td className="p-3 text-white font-mono text-xs">{order.id?.slice(0, 12)}</td>
                  <td className="p-3 text-white">{order.customer || order.email}</td>
                  <td className="p-3 text-white">&euro; {order.total?.toFixed(2)}</td>
                  <td className="p-3 text-[#8a8578] text-xs">{order.payment_method || order.paymentMethod}</td>
                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={(e) => { e.stopPropagation(); updateStatus(order.id, e.target.value) }}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-[#0d0d0d] border border-[#1a1a1a] text-white text-xs px-2 py-1 rounded focus:outline-none">
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="p-3 text-[#6b6558] text-xs">{new Date(order.created_at).toLocaleDateString("it-IT")}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-[#6b6558]">Nessun ordine.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="w-80 trace-card p-4 self-start">
          <h3 className="text-white text-xs tracking-[0.15em] uppercase mb-4">Dettaglio ordine</h3>
          <div className="space-y-2 text-sm">
            <p className="text-[#6b6558] text-xs">ID: <span className="text-white font-mono">{selected.id?.slice(0, 12)}</span></p>
            <p className="text-[#6b6558] text-xs">Cliente: <span className="text-white">{selected.customer || selected.email}</span></p>
            <p className="text-[#6b6558] text-xs">Email: <span className="text-white">{selected.email}</span></p>
            <p className="text-[#6b6558] text-xs">Telefono: <span className="text-white">{selected.phone || "—"}</span></p>
            <p className="text-[#6b6558] text-xs">Indirizzo: <span className="text-white">{selected.shippingAddress?.address || selected.shipping_address?.address || "—"}</span></p>
            <p className="text-[#6b6558] text-xs">Totale: <span className="text-white">&euro; {selected.total?.toFixed(2)}</span></p>
            {selected.items?.map((item: any, i: number) => (
              <p key={i} className="text-[#6b6558] text-xs">
                Prodotto: <span className="text-white">{item.name} x{item.quantity} {item.size && `(${item.size})`}</span>
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

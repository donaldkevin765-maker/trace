"use client"

import { useState, useEffect } from "react"

export default function AdminProdotti() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: "", price: "", category: "", description: "", sizes: "", material: "", color: "" })

  const fetchProducts = async () => {
    const token = localStorage.getItem("trace_token")
    const res = await fetch("/api/products")
    const data = await res.json()
    setProducts(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { fetchProducts() }, [])

  const resetForm = () => {
    setForm({ name: "", price: "", category: "", description: "", sizes: "", material: "", color: "" })
    setEditingId(null)
  }

  const handleSave = async () => {
    const token = localStorage.getItem("trace_token")
    const body = {
      ...form,
      price: parseFloat(form.price),
      sizes: form.sizes.split(",").map((s: string) => s.trim()),
    }

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    })

    setShowModal(false)
    resetForm()
    fetchProducts()
  }

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("trace_token")
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    fetchProducts()
  }

  if (loading) return <div className="text-[#6b6558] text-xs tracking-wider uppercase">Caricamento...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-xl tracking-[0.15em] uppercase text-white">Prodotti</h1>
        <button onClick={() => { resetForm(); setShowModal(true) }}
          className="px-4 py-2 bg-white text-black text-xs tracking-[0.15em] uppercase hover:bg-[#a09a8a] transition-colors">
          + Nuovo prodotto
        </button>
      </div>

      {/* Products table */}
      <div className="trace-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1a1a1a]">
              <th className="text-left p-3 text-[#6b6558] text-xs tracking-wider uppercase">Nome</th>
              <th className="text-left p-3 text-[#6b6558] text-xs tracking-wider uppercase">Prezzo</th>
              <th className="text-left p-3 text-[#6b6558] text-xs tracking-wider uppercase">Categoria</th>
              <th className="text-left p-3 text-[#6b6558] text-xs tracking-wider uppercase">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p: any) => (
              <tr key={p.id} className="border-b border-[#0a0a0a] hover:bg-[#0a0a0a] transition-colors">
                <td className="p-3 text-white">{p.name}</td>
                <td className="p-3 text-white">€ {p.price}</td>
                <td className="p-3 text-[#8a8578] text-xs">{p.category}</td>
                <td className="p-3">
                  <button onClick={() => handleDelete(p.id)}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors">
                    Elimina
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-[#6b6558] text-sm">
                  Nessun prodotto. Aggiungine uno!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-white font-[family-name:var(--font-display)] text-lg tracking-[0.15em] uppercase mb-6">
              Nuovo prodotto
            </h2>
            <div className="space-y-4">
              {[
                { label: "Nome", key: "name" },
                { label: "Prezzo", key: "price", type: "number" },
                { label: "Categoria", key: "category" },
                { label: "Taglie (separate da virgola)", key: "sizes" },
                { label: "Materiale", key: "material" },
                { label: "Colore", key: "color" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs text-[#6b6558] tracking-wider mb-1">{field.label}</label>
                  <input
                    type={field.type || "text"}
                    value={(form as any)[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full bg-[#080808] border border-[#1a1a1a] px-3 py-2 text-white text-sm focus:outline-none focus:border-[#303030]"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs text-[#6b6558] tracking-wider mb-1">Descrizione</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full bg-[#080808] border border-[#1a1a1a] px-3 py-2 text-white text-sm focus:outline-none focus:border-[#303030]"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)}
                className="flex-1 py-2 border border-[#1a1a1a] text-xs tracking-wider text-white hover:bg-[#1a1a1a] transition-colors">
                Annulla
              </button>
              <button onClick={handleSave}
                className="flex-1 py-2 bg-white text-black text-xs tracking-wider uppercase hover:bg-[#a09a8a] transition-colors">
                Salva
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

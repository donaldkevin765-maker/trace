"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/store"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, count, loaded, clearCart } = useCart()

  const [mounted, setMounted] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal">("stripe")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", city: "", zip: "", province: "",
  })

  useEffect(() => setMounted(true), [])

  if (!mounted || !loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-[#6b6558] text-xs tracking-[0.2em] uppercase">Caricamento...</div>
      </div>
    )
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const token = localStorage.getItem("trace_token")
      if (!token) {
        router.push("/login")
        return
      }

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items,
          total,
          shipping: form,
          paymentMethod,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Errore checkout")

      clearCart()
      router.push(`/account?order=${data.orderId}`)
    } catch (err: any) {
      setError(err.message || "Errore durante il checkout")
    } finally {
      setLoading(false)
    }
  }

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Form */}
        <div className="md:col-span-3">
          <h1 className="font-[family-name:var(--font-display)] text-2xl tracking-[0.15em] uppercase text-white mb-8">Checkout</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#6b6558] tracking-wider mb-2">Nome completo</label>
                <input required value={form.name} onChange={(e) => updateField("name", e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-[#1a1a1a] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#303030]" />
              </div>
              <div>
                <label className="block text-xs text-[#6b6558] tracking-wider mb-2">Email</label>
                <input required type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-[#1a1a1a] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#303030]" />
              </div>
              <div>
                <label className="block text-xs text-[#6b6558] tracking-wider mb-2">Telefono</label>
                <input value={form.phone} onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-[#1a1a1a] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#303030]" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-[#6b6558] tracking-wider mb-2">Indirizzo</label>
                <input required value={form.address} onChange={(e) => updateField("address", e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-[#1a1a1a] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#303030]" />
              </div>
              <div>
                <label className="block text-xs text-[#6b6558] tracking-wider mb-2">Citt&agrave;</label>
                <input required value={form.city} onChange={(e) => updateField("city", e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-[#1a1a1a] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#303030]" />
              </div>
              <div>
                <label className="block text-xs text-[#6b6558] tracking-wider mb-2">CAP</label>
                <input required value={form.zip} onChange={(e) => updateField("zip", e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-[#1a1a1a] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#303030]" />
              </div>
              <div>
                <label className="block text-xs text-[#6b6558] tracking-wider mb-2">Provincia</label>
                <input value={form.province} onChange={(e) => updateField("province", e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-[#1a1a1a] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#303030]" />
              </div>
            </div>

            {/* Payment method */}
            <div className="pt-4">
              <p className="text-[#6b6558] text-xs tracking-wider uppercase mb-3">Metodo di pagamento</p>
              <div className="flex gap-4">
                <button type="button" onClick={() => setPaymentMethod("stripe")}
                  className={`flex-1 py-3 border text-xs tracking-[0.15em] uppercase transition-all ${
                    paymentMethod === "stripe" ? "border-white bg-white text-black" : "border-[#1a1a1a] text-white hover:border-[#303030]"
                  }`}>
                  Stripe
                </button>
                <button type="button" onClick={() => setPaymentMethod("paypal")}
                  className={`flex-1 py-3 border text-xs tracking-[0.15em] uppercase transition-all ${
                    paymentMethod === "paypal" ? "border-white bg-white text-black" : "border-[#1a1a1a] text-white hover:border-[#303030]"
                  }`}>
                  PayPal
                </button>
              </div>
            </div>

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full py-3 bg-white text-black text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#a09a8a] transition-colors disabled:opacity-50">
              {loading ? "Elaborazione..." : `Ordina — € ${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order summary */}
        <div className="md:col-span-2">
          <div className="trace-card p-6">
            <h3 className="text-white text-xs tracking-[0.15em] uppercase mb-4">Riepilogo ordine ({count})</h3>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                  <span className="text-[#8a8578] truncate mr-2">
                    {item.name} {item.size && `(${item.size})`} x{item.quantity}
                  </span>
                  <span className="text-white whitespace-nowrap">&euro; {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#1a1a1a] pt-3 flex justify-between">
              <span className="text-white text-sm font-medium">Totale</span>
              <span className="text-white text-sm font-medium">&euro; {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

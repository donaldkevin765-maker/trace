"use client"

import Link from "next/link"
import { useCart } from "@/lib/store"
import { useState, useEffect } from "react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, count, loaded } = useCart()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted || !loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-[#6b6558] text-xs tracking-[0.2em] uppercase">Caricamento...</div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center px-6">
          <div className="text-white font-[family-name:var(--font-display)] text-4xl tracking-[0.15em] uppercase mb-4">Carrello vuoto</div>
          <p className="text-[#6b6558] text-sm mb-8">Non hai ancora aggiunto nulla.</p>
          <Link
            href="/product"
            className="inline-block px-6 py-3 border border-[#1a1a1a] text-white text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all"
          >
            Scopri i prodotti
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-[family-name:var(--font-display)] text-2xl tracking-[0.15em] uppercase text-white mb-8">Carrello ({count})</h1>

        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="trace-card p-4 flex items-center gap-4"
            >
              <div className="w-16 h-16 bg-[#0a0a0a] flex items-center justify-center border border-[#1a1a1a]">
                <span className="text-[#1a1a1a] text-lg font-[family-name:var(--font-display)]">T</span>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-white text-sm font-medium truncate">{item.name}</h3>
                {item.size && <p className="text-[#6b6558] text-xs">Taglia: {item.size}</p>}
                <p className="text-[#a09a8a] text-sm">€ {item.price}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                  className="w-8 h-8 border border-[#1a1a1a] text-white text-xs hover:bg-white hover:text-black transition-all"
                >
                  -
                </button>
                <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                  className="w-8 h-8 border border-[#1a1a1a] text-white text-xs hover:bg-white hover:text-black transition-all"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeItem(item.id, item.size)}
                className="text-[#4a4538] hover:text-red-400 text-xs tracking-wider uppercase transition-colors"
              >
                Rimuovi
              </button>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="border-t border-[#1a1a1a] pt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#6b6558] text-sm">Subtotale</span>
            <span className="text-white">€ {total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-[#6b6558] text-sm">Spedizione</span>
            <span className="text-[#6b6558] text-sm">Calcolata al checkout</span>
          </div>

          <Link
            href="/checkout"
            className="block w-full py-3 bg-white text-black text-center text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#a09a8a] transition-colors"
          >
            Procedi al checkout
          </Link>
        </div>
      </div>
    </div>
  )
}

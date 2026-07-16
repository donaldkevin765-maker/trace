"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ProductImage } from "@/components/ProductImage"

const PRODUCTS = [
  { id: "trace-set-001", name: "Hoodie + Pants Set", price: 89, category: "Set" },
  { id: "trace-hoodie-001", name: "Heavy Cotton Hoodie", price: 65, category: "Hoodie" },
  { id: "trace-pants-001", name: "Cargo Pants", price: 55, category: "Pants" },
  { id: "trace-tee-001", name: "Stencil Tee", price: 35, category: "T-Shirt" },
]

export default function ProductListing() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="min-h-screen pt-28 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-4 h-px bg-[#4a4538]" />
            <span className="text-[#6b6558] text-[10px] tracking-[0.3em] uppercase font-[family-name:var(--font-display)]">Collezione</span>
            <span className="w-4 h-px bg-[#4a4538]" />
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-[0.15em] uppercase text-white mb-2">
            Il primo drop
          </h1>
          <p className="text-[#6b6558] text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-mono)]">
            Set coordinato. Due colori. Essenziale.
          </p>
        </div>

        <div className="flex items-center justify-between mb-10 border-b border-[#1a1a1a] pb-4">
          <div className="flex gap-6">
            {["Tutti", "Hoodie", "T-Shirt", "Pants", "Set"].map((cat) => (
              <button key={cat} className="text-[#4a4538] text-[10px] tracking-[0.2em] uppercase font-[family-name:var(--font-display)] hover:text-white transition-colors">
                {cat}
              </button>
            ))}
          </div>
          <span className="text-[#4a4538] text-[10px] font-[family-name:var(--font-mono)]">{PRODUCTS.length} prodotti</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group trace-card p-4 hover:border-[#303030] transition-all duration-500"
            >
              <div className="aspect-[3/4] bg-[#0a0a0a] mb-4 flex items-center justify-center overflow-hidden relative">
                <ProductImage category={product.category} className="w-full h-full p-6" />
              </div>
              <div className="space-y-1">
                <p className="text-[#6b6558] text-[10px] tracking-[0.2em] uppercase font-[family-name:var(--font-mono)]">{product.category}</p>
                <h3 className="text-white text-sm font-[family-name:var(--font-display)] tracking-[0.05em]">{product.name}</h3>
                <p className="text-[#a09a8a] text-sm font-[family-name:var(--font-mono)]">&euro; {product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

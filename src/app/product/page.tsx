"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

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
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-[family-name:var(--font-display)] text-2xl tracking-[0.15em] uppercase text-white mb-2">
          Il primo drop
        </h1>
        <p className="text-[#6b6558] text-sm mb-10">Set coordinato. Due colori. Essenziale.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group trace-card p-4 hover:border-[#303030] transition-all duration-300"
            >
              <div className="aspect-[3/4] bg-[#0a0a0a] mb-4 flex items-center justify-center overflow-hidden">
                <div className="text-[#1a1a1a] font-[family-name:var(--font-display)] text-4xl tracking-[0.15em] uppercase group-hover:text-[#303030] transition-colors">
                  T
                </div>
              </div>
              <h3 className="text-white text-sm font-medium mb-1">{product.name}</h3>
              <p className="text-[#a09a8a] text-xs tracking-wider">&euro; {product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useParams, notFound } from "next/navigation"
import Link from "next/link"
import { useCart } from "@/lib/store"
import { ProductImage } from "@/components/ProductImage"

const FALLBACK_PRODUCT = {
  id: "trace-set-001",
  name: "Hoodie + Pants Set",
  price: 89,
  category: "Set",
  description: "Set coordinato in cotone pesante 400g/m². Vestibilità oversize, polsini e fondo costina, cappuccio con coulisse. Disponibile in nero e sabbia.",
  sizes: ["S", "M", "L", "XL"],
  material: "100% Cotone Pesante 400g/m²",
  color: "Nero / Sabbia",
}

export default function ProductPage() {
  const params = useParams()
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState("")
  const [added, setAdded] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const product = FALLBACK_PRODUCT

  const handleAdd = () => {
    if (!selectedSize) return
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: selectedSize,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="aspect-[4/5] bg-[#0a0a0a] border border-[#1a1a1a] flex items-center justify-center">
          <ProductImage category={product.category} className="w-full h-full p-10" />
        </div>

        {/* Details */}
        <div>
          <p className="text-[#6b6558] text-xs tracking-[0.2em] uppercase mb-2">{product.category}</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-[0.08em] uppercase text-white mb-4">
            {product.name}
          </h1>
          <p className="text-[#a09a8a] text-xl mb-6">&euro; {product.price}</p>

          <p className="text-[#8a8578] text-sm leading-relaxed mb-8">{product.description}</p>

          <div className="mb-6">
            <p className="text-[#6b6558] text-xs tracking-wider uppercase mb-3">Materiale</p>
            <p className="text-white text-sm">{product.material}</p>
          </div>

          <div className="mb-8">
            <p className="text-[#6b6558] text-xs tracking-wider uppercase mb-3">Colore</p>
            <p className="text-white text-sm">{product.color}</p>
          </div>

          {/* Size selector */}
          <div className="mb-8">
            <p className="text-[#6b6558] text-xs tracking-wider uppercase mb-3">
              Taglia {selectedSize && <span className="text-white ml-2">{selectedSize}</span>}
            </p>
            <div className="flex gap-3">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 border text-sm transition-all ${
                    selectedSize === size
                      ? "border-white bg-white text-black"
                      : "border-[#1a1a1a] text-white hover:border-[#303030]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            disabled={!selectedSize}
            className={`w-full py-3 text-xs tracking-[0.2em] uppercase font-medium transition-all ${
              added
                ? "bg-[#a09a8a] text-black"
                : "bg-white text-black hover:bg-[#a09a8a]"
            } disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            {added ? "Aggiunto!" : "Aggiungi al carrello"}
          </button>
        </div>
      </div>
    </div>
  )
}

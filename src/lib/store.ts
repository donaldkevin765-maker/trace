// Client-side cart store
"use client"

import { useState, useEffect, useCallback } from 'react'
import type { CartItem } from './types'

const CART_KEY = 'trace_cart'

export function getStoredCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(CART_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function storeCart(items: CartItem[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setItems(getStoredCart())
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) storeCart(items)
  }, [items, loaded])

  const addItem = useCallback((item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id && i.size === item.size)
      if (existing) {
        return prev.map(i =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      }
      return [...prev, item]
    })
  }, [])

  const removeItem = useCallback((id: string, size?: string) => {
    setItems(prev => prev.filter(i => !(i.id === id && i.size === size)))
  }, [])

  const updateQuantity = useCallback((id: string, size: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id, size)
      return
    }
    setItems(prev =>
      prev.map(i =>
        i.id === id && i.size === size ? { ...i, quantity } : i
      )
    )
  }, [removeItem])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return { items, addItem, removeItem, updateQuantity, clearCart, total, count, loaded }
}

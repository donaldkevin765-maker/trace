import { getSupabaseClient } from './supabase'
import type { Product, Order, Cart, CartItem, User } from './types'

function generateId(prefix = ''): string {
  const r = Math.random().toString(36).slice(2, 10)
  const ts = Date.now().toString(36)
  return `${prefix}${prefix ? '_' : ''}${ts}${r}`
}

// ──── PRODUCTS ────

export async function getProducts(options?: {
  category?: string
  featured?: boolean
  approvedOnly?: boolean
  limit?: number
}): Promise<Product[]> {
  const supabase = await getSupabaseClient()
  if (supabase) {
    let query = supabase.from('products').select('*')
    if (options?.category) query = query.eq('category', options.category)
    if (options?.featured) query = query.eq('featured', true)
    if (options?.approvedOnly) query = query.eq('approved', true)
    if (options?.limit) query = query.limit(options.limit)
    const { data } = await query.order('created_at', { ascending: false })
    if (data) return data as Product[]
  }
  return []
}

export async function getProduct(id: string): Promise<Product | null> {
  const supabase = await getSupabaseClient()
  if (supabase) {
    const { data } = await supabase.from('products').select('*').eq('id', id).single()
    if (data) return data as Product
  }
  return null
}

export async function createProduct(product: Partial<Product>): Promise<Product | null> {
  const supabase = await getSupabaseClient()
  if (supabase) {
    const { data } = await supabase.from('products').insert({
      id: generateId('prod'),
      ...product,
      created_at: new Date().toISOString(),
    }).select().single()
    return data as Product | null
  }
  return null
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<boolean> {
  const supabase = await getSupabaseClient()
  if (supabase) {
    const { error } = await supabase.from('products').update(updates).eq('id', id)
    return !error
  }
  return false
}

export async function deleteProduct(id: string): Promise<boolean> {
  const supabase = await getSupabaseClient()
  if (supabase) {
    const { error } = await supabase.from('products').delete().eq('id', id)
    return !error
  }
  return false
}

// ──── ORDERS ────

export async function getOrders(options?: {
  userId?: string
  supplierId?: string
  status?: string
  limit?: number
}): Promise<Order[]> {
  const supabase = await getSupabaseClient()
  if (supabase) {
    let query = supabase.from('orders').select('*')
    if (options?.userId) query = query.eq('user_id', options.userId)
    if (options?.status) query = query.eq('status', options.status)
    if (options?.limit) query = query.limit(options.limit)
    const { data } = await query.order('created_at', { ascending: false })
    if (data) return data as Order[]
  }
  return []
}

export async function getOrder(id: string): Promise<Order | null> {
  const supabase = await getSupabaseClient()
  if (supabase) {
    const { data } = await supabase.from('orders').select('*').eq('id', id).single()
    return data as Order | null
  }
  return null
}

export async function createOrder(order: Partial<Order>): Promise<Order | null> {
  const supabase = await getSupabaseClient()
  if (supabase) {
    const { data } = await supabase.from('orders').insert({
      id: generateId('ord'),
      ...order,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }).select().single()
    return data as Order | null
  }
  return null
}

export async function updateOrder(id: string, updates: Partial<Order>): Promise<boolean> {
  const supabase = await getSupabaseClient()
  if (supabase) {
    const { error } = await supabase.from('orders').update({
      ...updates,
      updated_at: new Date().toISOString(),
    }).eq('id', id)
    return !error
  }
  return false
}

// ──── USERS ────

export async function getUsers(): Promise<User[]> {
  const supabase = await getSupabaseClient()
  if (supabase) {
    const { data } = await supabase.from('users').select('*')
    return (data || []) as User[]
  }
  return []
}

export async function getUser(id: string): Promise<User | null> {
  const supabase = await getSupabaseClient()
  if (supabase) {
    const { data } = await supabase.from('users').select('*').eq('id', id).single()
    return data as User | null
  }
  return null
}

// ──── CARTS ────

export async function getCart(userId: string): Promise<Cart | null> {
  const supabase = await getSupabaseClient()
  if (supabase) {
    const { data } = await supabase.from('carts').select('*').eq('user_id', userId).single()
    return data as Cart | null
  }
  return null
}

export async function saveCart(userId: string, items: CartItem[]): Promise<boolean> {
  const supabase = await getSupabaseClient()
  if (supabase) {
    const { error } = await supabase.from('carts').upsert({
      user_id: userId,
      items,
      updated_at: new Date().toISOString(),
    })
    return !error
  }
  return false
}

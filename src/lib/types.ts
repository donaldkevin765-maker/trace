// ============================================================
// TRACE — Tipi condivisi
// ============================================================

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  retailPrice?: number
  costPrice?: number
  category: string
  subcategory?: string
  description: string
  images: string[]
  sizes?: string[]
  stock?: Record<string, number>
  material?: string
  color?: string
  madeIn?: string
  featured?: boolean
  isNew?: boolean
  approved?: boolean
  season?: string
  year?: number
  sales?: number
  supplierId?: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  image?: string
  quantity: number
  size?: string
}

export interface Cart {
  id: string
  userId?: string
  items: CartItem[]
  updatedAt: string
  total?: number
  count?: number
  isEmpty?: boolean
}

export interface Order {
  id: string
  userId: string
  email?: string
  customer?: string
  phone?: string
  items: any[]
  itemsSummary?: string
  total: number
  status: string
  paymentStatus?: string
  paymentMethod?: string
  paymentId?: string
  shippingAddress?: any
  shippingMethod?: string
  shippingCost?: number
  trackingNumber?: string
  carrier?: string
  notes?: string
  promoCode?: string
  discount?: number
  tax?: number
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  email: string
  name: string
  role: 'customer' | 'admin' | 'supplier'
  phone?: string
  address?: string
  city?: string
  zip?: string
  province?: string
}

export interface Supplier {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  productCategories?: string[]
  approved?: boolean
}

export interface AdminAnalytics {
  totalRevenue?: number
  todayRevenue?: number
  totalOrders?: number
  avgOrderValue?: number
  ordersByStatus?: Record<string, number>
  topProducts?: { name: string; count: number }[]
  dailyRevenue?: { date: string; revenue: number }[]
}

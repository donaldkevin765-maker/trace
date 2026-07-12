import { NextRequest, NextResponse } from 'next/server'
import { getProducts, createProduct } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') || undefined
  const featured = searchParams.get('featured') === 'true' || undefined

  const products = await getProducts({ category, featured, approvedOnly: true })
  return NextResponse.json(products)
}

export async function POST(request: NextRequest) {
  const auth = request.headers.get('Authorization')?.replace('Bearer ', '')
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await verifyToken(auth)
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await request.json()
  const product = await createProduct(body)
  if (!product) return NextResponse.json({ error: 'Failed to create' }, { status: 500 })

  return NextResponse.json(product, { status: 201 })
}

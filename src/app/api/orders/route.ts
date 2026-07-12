import { NextRequest, NextResponse } from 'next/server'
import { getOrders, createOrder } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const auth = request.headers.get('Authorization')?.replace('Bearer ', '')
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await verifyToken(auth)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  if (user.role === 'admin') {
    const orders = await getOrders()
    return NextResponse.json(orders)
  }

  const orders = await getOrders({ userId: user.sub })
  return NextResponse.json(orders)
}

export async function POST(request: NextRequest) {
  const auth = request.headers.get('Authorization')?.replace('Bearer ', '')
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await verifyToken(auth)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const order = await createOrder({
    userId: user.sub,
    email: body.email,
    customer: body.customer,
    phone: body.phone,
    items: body.items,
    total: body.total,
    shippingAddress: body.shippingAddress,
    paymentMethod: body.paymentMethod,
    paymentId: body.paymentId,
  })

  if (!order) return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  return NextResponse.json(order, { status: 201 })
}

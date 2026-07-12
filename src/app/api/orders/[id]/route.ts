import { NextRequest, NextResponse } from 'next/server'
import { getOrder, updateOrder } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = request.headers.get('Authorization')?.replace('Bearer ', '')
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await verifyToken(auth)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const order = await getOrder(id)
  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  if (user.role !== 'admin' && order.userId !== user.sub) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  return NextResponse.json(order)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = request.headers.get('Authorization')?.replace('Bearer ', '')
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await verifyToken(auth)
  if (!user || (user.role !== 'admin' && user.role !== 'supplier')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await params
  const body = await request.json()
  const ok = await updateOrder(id, body)
  return ok ? NextResponse.json({ success: true }) : NextResponse.json({ error: 'Failed' }, { status: 500 })
}

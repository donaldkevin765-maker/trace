import { NextRequest, NextResponse } from 'next/server'
import { createOrder } from '@/lib/db'
import { createPaymentIntent, verifyPayPalOrder } from '@/lib/payments'
import { verifyToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const auth = request.headers.get('Authorization')?.replace('Bearer ', '')
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const user = await verifyToken(auth)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { items, shipping, paymentMethod, paymentId, total } = await request.json()

    if (paymentMethod === 'stripe') {
      const paymentIntent = await createPaymentIntent(total)
      const order = await createOrder({
        userId: user.sub,
        email: shipping.email,
        customer: shipping.name,
        phone: shipping.phone,
        items,
        total,
        paymentMethod: 'stripe',
        paymentId: paymentIntent.id,
        shippingAddress: shipping,
        status: 'pending',
        paymentStatus: 'pending',
      })
      return NextResponse.json({
        success: true,
        orderId: order?.id,
        clientSecret: paymentIntent.client_secret,
      })
    }

    if (paymentMethod === 'paypal') {
      const verified = await verifyPayPalOrder(paymentId)
      if (!verified) return NextResponse.json({ error: 'Payment not verified' }, { status: 400 })

      const order = await createOrder({
        userId: user.sub,
        email: shipping.email,
        customer: shipping.name,
        phone: shipping.phone,
        items,
        total,
        paymentMethod: 'paypal',
        paymentId,
        shippingAddress: shipping,
        status: 'confirmed',
        paymentStatus: 'paid',
      })
      return NextResponse.json({ success: true, orderId: order?.id })
    }

    return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

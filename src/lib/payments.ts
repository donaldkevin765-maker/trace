import Stripe from 'stripe'

let stripeClient: Stripe | null = null

export function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) throw new Error('STRIPE_SECRET_KEY not set')
    stripeClient = new Stripe(key, { apiVersion: '2026-06-24.dahlia' })
  }
  return stripeClient
}

export function getStripePublishableKey(): string {
  return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
}

export async function createPaymentIntent(amount: number, currency = 'eur') {
  const stripe = getStripe()
  return stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
    automatic_payment_methods: { enabled: true },
  })
}

// PayPal
const PAYPAL_API = process.env.PAYPAL_CLIENT_ID
  ? 'https://api-m.sandbox.paypal.com'
  : 'https://api-m.paypal.com'

export async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const secret = process.env.PAYPAL_CLIENT_SECRET
  if (!clientId || !secret) throw new Error('PayPal credentials not set')

  const auth = Buffer.from(`${clientId}:${secret}`).toString('base64')
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
  const data = await res.json()
  return data.access_token
}

export async function verifyPayPalOrder(orderId: string): Promise<boolean> {
  const token = await getPayPalAccessToken()
  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const order = await res.json()
  return order.status === 'COMPLETED'
}

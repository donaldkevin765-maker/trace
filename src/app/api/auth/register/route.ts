import { NextRequest, NextResponse } from 'next/server'
import { registerUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role } = await request.json()
    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Email, password, and name required' }, { status: 400 })
    }

    const result = await registerUser(email, password, name, role || 'customer')
    if (!result) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }

    return NextResponse.json({ user: result.user, token: result.token }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

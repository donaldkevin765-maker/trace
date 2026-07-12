import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { getUser } from '@/lib/db'

export async function GET(request: NextRequest) {
  const auth = request.headers.get('Authorization')?.replace('Bearer ', '')
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const decoded = await verifyToken(auth)
  if (!decoded) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

  const user = await getUser(decoded.sub)
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  return NextResponse.json({ id: user.id, email: user.email, name: user.name, role: user.role })
}

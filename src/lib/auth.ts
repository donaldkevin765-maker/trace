import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { getSupabaseClient } from './supabase'
import type { User } from './types'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'trace-dev-secret-change-in-production'
)

const SALT_ROUNDS = 10

function generateId(prefix = ''): string {
  const r = Math.random().toString(36).slice(2, 10)
  const ts = Date.now().toString(36)
  return `${prefix}${prefix ? '_' : ''}${ts}${r}`
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function createToken(user: { id: string; email: string; role: string }): Promise<string> {
  return new SignJWT({ sub: user.id, email: user.email, role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string): Promise<{ sub: string; email: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return {
      sub: payload.sub as string,
      email: payload.email as string,
      role: payload.role as string,
    }
  } catch {
    return null
  }
}

export async function registerUser(email: string, password: string, name: string, role: 'customer' | 'admin' | 'supplier' = 'customer'): Promise<{ user: User; token: string } | null> {
  const supabase = await getSupabaseClient()
  if (!supabase) return null

  const existing = await supabase.from('users').select('id').eq('email', email).single()
  if (existing.data) return null

  const passwordHash = await hashPassword(password)
  const id = generateId('usr')

  const { data } = await supabase.from('users').insert({
    id,
    email,
    password: passwordHash,
    name,
    role,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }).select().single()

  if (!data) return null

  const token = await createToken({ id, email, role })
  return {
    user: { id, email, name, role } as User,
    token,
  }
}

export async function loginUser(email: string, password: string): Promise<{ user: User; token: string } | null> {
  const supabase = await getSupabaseClient()
  if (!supabase) return null

  const { data } = await supabase.from('users').select('*').eq('email', email).single()
  if (!data) return null

  const valid = await verifyPassword(password, data.password)
  if (!valid) return null

  const token = await createToken({ id: data.id, email: data.email, role: data.role })
  return {
    user: { id: data.id, email: data.email, name: data.name, role: data.role } as User,
    token,
  }
}

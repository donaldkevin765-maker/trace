import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || ''

export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null

export async function getSupabaseClient() {
  if (supabase) return supabase

  const url = process.env.SUPABASE_URL
  let key = process.env.SUPABASE_SERVICE_KEY

  if (url && !key && process.env.SUPABASE_ACCESS_TOKEN) {
    const projectRef = url.match(/https:\/\/(.+)\.supabase\.co/)?.[1]
    if (projectRef) {
      try {
        const res = await fetch(
          `https://api.supabase.com/v1/projects/${projectRef}/api-keys`,
          { headers: { Authorization: `Bearer ${process.env.SUPABASE_ACCESS_TOKEN}` } }
        )
        if (res.ok) {
          const keys: Array<{ name: string; api_key: string }> = await res.json()
          const serviceKey = keys.find(k => k.name === 'service_role')
          if (serviceKey?.api_key) key = serviceKey.api_key
        }
      } catch {}
    }
  }

  if (url && key) return createClient(url, key)
  return null
}

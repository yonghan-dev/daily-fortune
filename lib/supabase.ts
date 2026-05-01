import 'server-only'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_KEY

if (!url) {
  throw new Error('Missing env NEXT_PUBLIC_SUPABASE_URL')
}
if (!serviceKey) {
  throw new Error('Missing env SUPABASE_SERVICE_KEY')
}

// service_role key bypasses RLS — never expose to the client.
export const supabaseAdmin: SupabaseClient = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const WALLET_RE = /^0x[a-fA-F0-9]{40}$/

export function isWalletAddress(value: unknown): value is string {
  return typeof value === 'string' && WALLET_RE.test(value)
}

export function normalizeWallet(addr: string): string {
  return addr.toLowerCase()
}

import type { NextRequest } from 'next/server'
import { isWalletAddress, normalizeWallet, supabaseAdmin } from '../../../../lib/supabase'

const DAILY_SHARE_LIMIT = 5

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get('wallet_address')
  if (!isWalletAddress(raw)) {
    return Response.json({ success: false, detail: 'Invalid wallet_address' }, { status: 400 })
  }
  const wallet = normalizeWallet(raw)

  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

  const [userRes, drawsRes, sharesTotalRes, sharesTodayRes] = await Promise.all([
    supabaseAdmin
      .from('users')
      .select('wallet_address, stardust, total_earned, created_at, last_login')
      .eq('wallet_address', wallet)
      .maybeSingle(),
    supabaseAdmin
      .from('card_draws')
      .select('id', { count: 'exact', head: true })
      .eq('wallet_address', wallet),
    supabaseAdmin
      .from('shares')
      .select('id', { count: 'exact', head: true })
      .eq('wallet_address', wallet),
    supabaseAdmin
      .from('shares')
      .select('id', { count: 'exact', head: true })
      .eq('wallet_address', wallet)
      .gte('created_at', since24h),
  ])

  const firstError = userRes.error ?? drawsRes.error ?? sharesTotalRes.error ?? sharesTodayRes.error
  if (firstError) {
    return Response.json({ success: false, detail: firstError.message }, { status: 500 })
  }

  if (!userRes.data) {
    return Response.json({ success: false, detail: 'User not found' }, { status: 404 })
  }

  const sharesToday = sharesTodayRes.count ?? 0

  return Response.json({
    success: true,
    stats: {
      stardust: userRes.data.stardust,
      total_earned: userRes.data.total_earned,
      created_at: userRes.data.created_at,
      last_login: userRes.data.last_login,
      total_draws: drawsRes.count ?? 0,
      total_shares: sharesTotalRes.count ?? 0,
      shares_today: sharesToday,
      shares_remaining_today: Math.max(0, DAILY_SHARE_LIMIT - sharesToday),
    },
  })
}

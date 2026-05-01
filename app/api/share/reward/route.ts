import { isWalletAddress, normalizeWallet, supabaseAdmin } from '../../../../lib/supabase'
import { REWARDS } from '../../../../lib/constants'

const DAILY_SHARE_LIMIT = 5

interface ShareRequest {
  wallet_address?: unknown
  platform?: unknown
}

async function getStardust(wallet: string): Promise<number | null> {
  const { data } = await supabaseAdmin
    .from('users')
    .select('stardust')
    .eq('wallet_address', wallet)
    .maybeSingle()
  return data?.stardust ?? null
}

export async function POST(request: Request) {
  let body: ShareRequest
  try {
    body = (await request.json()) as ShareRequest
  } catch {
    return Response.json({ success: false, detail: 'Invalid JSON' }, { status: 400 })
  }

  if (!isWalletAddress(body.wallet_address)) {
    return Response.json({ success: false, detail: 'Invalid wallet_address' }, { status: 400 })
  }
  if (typeof body.platform !== 'string' || body.platform.length === 0) {
    return Response.json({ success: false, detail: 'Invalid platform' }, { status: 400 })
  }

  const wallet = normalizeWallet(body.wallet_address)
  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

  const { count: sharesToday, error: countErr } = await supabaseAdmin
    .from('shares')
    .select('id', { count: 'exact', head: true })
    .eq('wallet_address', wallet)
    .gte('created_at', since24h)

  if (countErr) {
    return Response.json({ success: false, detail: countErr.message }, { status: 500 })
  }

  const used = sharesToday ?? 0
  if (used >= DAILY_SHARE_LIMIT) {
    const current = await getStardust(wallet)
    return Response.json({
      success: false,
      reason: 'daily_limit_reached',
      new_stardust: current ?? 0,
      remaining_today: 0,
    })
  }

  const { error: insertErr } = await supabaseAdmin.from('shares').insert({
    wallet_address: wallet,
    platform: body.platform,
  })

  if (insertErr) {
    return Response.json({ success: false, detail: insertErr.message }, { status: 500 })
  }

  const { data: rpcData, error: rpcErr } = await supabaseAdmin.rpc('increment_stardust', {
    user_id: wallet,
    amount: REWARDS.SHARE,
  })

  if (rpcErr) {
    return Response.json({ success: false, detail: rpcErr.message }, { status: 500 })
  }

  const newBalance =
    typeof rpcData === 'number' ? rpcData : ((await getStardust(wallet)) ?? 0)

  return Response.json({
    success: true,
    new_stardust: newBalance,
    reward: REWARDS.SHARE,
    remaining_today: Math.max(0, DAILY_SHARE_LIMIT - (used + 1)),
  })
}

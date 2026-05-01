import { isWalletAddress, normalizeWallet, supabaseAdmin } from '../../../../lib/supabase'
import { REWARDS } from '../../../../lib/constants'

interface DrawRequest {
  wallet_address?: unknown
  card_id?: unknown
  card_name?: unknown
}

function utcDateStr(): string {
  const d = new Date()
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`
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
  let body: DrawRequest
  try {
    body = (await request.json()) as DrawRequest
  } catch {
    return Response.json({ success: false, detail: 'Invalid JSON' }, { status: 400 })
  }

  if (!isWalletAddress(body.wallet_address)) {
    return Response.json({ success: false, detail: 'Invalid wallet_address' }, { status: 400 })
  }
  if (typeof body.card_id !== 'number' && typeof body.card_id !== 'string') {
    return Response.json({ success: false, detail: 'Invalid card_id' }, { status: 400 })
  }
  if (typeof body.card_name !== 'string' || body.card_name.length === 0) {
    return Response.json({ success: false, detail: 'Invalid card_name' }, { status: 400 })
  }

  const wallet = normalizeWallet(body.wallet_address)
  const today = utcDateStr()

  const { data: existing, error: existingErr } = await supabaseAdmin
    .from('card_draws')
    .select('id')
    .eq('wallet_address', wallet)
    .eq('draw_date', today)
    .maybeSingle()

  if (existingErr) {
    return Response.json({ success: false, detail: existingErr.message }, { status: 500 })
  }

  if (existing) {
    const current = await getStardust(wallet)
    return Response.json({
      success: false,
      reason: 'already_drawn_today',
      new_stardust: current ?? 0,
    })
  }

  const { error: insertErr } = await supabaseAdmin.from('card_draws').insert({
    wallet_address: wallet,
    card_id: body.card_id,
    card_name: body.card_name,
    draw_date: today,
  })

  if (insertErr) {
    return Response.json({ success: false, detail: insertErr.message }, { status: 500 })
  }

  const { data: rpcData, error: rpcErr } = await supabaseAdmin.rpc('increment_stardust', {
    user_id: wallet,
    amount: REWARDS.DRAW,
  })

  if (rpcErr) {
    return Response.json({ success: false, detail: rpcErr.message }, { status: 500 })
  }

  const newBalance =
    typeof rpcData === 'number' ? rpcData : ((await getStardust(wallet)) ?? 0)

  return Response.json({
    success: true,
    new_stardust: newBalance,
    reward: REWARDS.DRAW,
  })
}

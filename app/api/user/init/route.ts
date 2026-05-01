import { isWalletAddress, normalizeWallet, supabaseAdmin } from '../../../../lib/supabase'

const WELCOME_BONUS = 100

interface InitRequest {
  wallet_address?: unknown
}

export async function POST(request: Request) {
  let body: InitRequest
  try {
    body = (await request.json()) as InitRequest
  } catch {
    return Response.json({ success: false, detail: 'Invalid JSON' }, { status: 400 })
  }

  if (!isWalletAddress(body.wallet_address)) {
    return Response.json({ success: false, detail: 'Invalid wallet_address' }, { status: 400 })
  }

  const wallet = normalizeWallet(body.wallet_address)

  const { data: existing, error: selectErr } = await supabaseAdmin
    .from('users')
    .select('wallet_address, stardust, total_earned, created_at, last_login')
    .eq('wallet_address', wallet)
    .maybeSingle()

  if (selectErr) {
    return Response.json({ success: false, detail: selectErr.message }, { status: 500 })
  }

  if (!existing) {
    const { data: created, error: insertErr } = await supabaseAdmin
      .from('users')
      .insert({
        wallet_address: wallet,
        stardust: WELCOME_BONUS,
        total_earned: WELCOME_BONUS,
      })
      .select('wallet_address, stardust, total_earned, created_at, last_login')
      .single()

    if (insertErr || !created) {
      return Response.json({ success: false, detail: insertErr?.message ?? 'insert failed' }, { status: 500 })
    }

    return Response.json({ success: true, user: { ...created, is_new: true } })
  }

  const { data: updated, error: updateErr } = await supabaseAdmin
    .from('users')
    .update({ last_login: new Date().toISOString() })
    .eq('wallet_address', wallet)
    .select('wallet_address, stardust, total_earned, created_at, last_login')
    .single()

  if (updateErr || !updated) {
    return Response.json({ success: false, detail: updateErr?.message ?? 'update failed' }, { status: 500 })
  }

  return Response.json({ success: true, user: { ...updated, is_new: false } })
}

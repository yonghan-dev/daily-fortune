import { verifySiweMessage } from '@worldcoin/minikit-js/siwe'
import type { WalletAuthResult } from '@worldcoin/minikit-js/commands'

interface VerifyRequest {
  payload: WalletAuthResult
  nonce: string
}

export async function POST(request: Request) {
  let body: VerifyRequest
  try {
    body = (await request.json()) as VerifyRequest
  } catch {
    return Response.json({ success: false, detail: 'Invalid JSON' }, { status: 400 })
  }

  const { payload, nonce } = body
  if (!payload?.address || !payload?.message || !payload?.signature || !nonce) {
    return Response.json({ success: false, detail: 'Missing fields' }, { status: 400 })
  }

  const { isValid } = await verifySiweMessage(payload, nonce)
  if (!isValid) {
    return Response.json({ success: false, detail: 'Invalid signature' }, { status: 400 })
  }

  // Wallet address is the per-user seed for daily card determinism.
  return Response.json({ success: true, userId: payload.address.toLowerCase() })
}

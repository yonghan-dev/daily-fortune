import {
  verifyCloudProof,
  type IVerifyResponse,
} from '@worldcoin/idkit-core/backend'
import type { ISuccessResult } from '@worldcoin/idkit-core'

export async function POST(request: Request) {
  const proof = (await request.json()) as ISuccessResult
  const app_id = process.env.NEXT_PUBLIC_APP_ID as `app_${string}`
  const action = process.env.NEXT_PUBLIC_ACTION as string

  const verifyRes: IVerifyResponse = await verifyCloudProof(proof, app_id, action)

  if (verifyRes.success) {
    // nullifier_hash is the stable, action-scoped, anonymous user ID
    return Response.json({ success: true, userId: proof.nullifier_hash })
  }

  return Response.json(verifyRes, { status: 400 })
}

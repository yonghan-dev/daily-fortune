'use client'

import {
  IDKitWidget,
  VerificationLevel,
  type ISuccessResult,
} from '@worldcoin/idkit'

interface WorldIDButtonProps {
  isVerified: boolean
  onSuccess: (userId: string) => void
}

/**
 * World ID verification button styled to match Daily Fortune's gold/cosmic palette.
 * Falls back to a "Verified Human" badge once authentication completes.
 */
export function WorldIDButton({ isVerified, onSuccess }: WorldIDButtonProps) {
  const handleVerify = async (proof: ISuccessResult) => {
    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(proof),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.detail ?? 'Verification failed')
    }
  }

  const handleSuccess = (result: ISuccessResult) => {
    onSuccess(result.nullifier_hash)
  }

  if (isVerified) {
    return (
      <div
        className="text-[10px] tracking-[0.3em] uppercase"
        style={{ color: '#d4af37', opacity: 0.85 }}
      >
        ✓ Verified
      </div>
    )
  }

  return (
    <IDKitWidget
      app_id={process.env.NEXT_PUBLIC_APP_ID as `app_${string}`}
      action={process.env.NEXT_PUBLIC_ACTION as string}
      verification_level={VerificationLevel.Device}
      handleVerify={handleVerify}
      onSuccess={handleSuccess}
    >
      {({ open }: { open: () => void }) => (
        <button
          onClick={open}
          className="px-3 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase transition-opacity hover:opacity-90"
          style={{
            background:
              'linear-gradient(135deg, rgba(212,175,55,0.25), rgba(212,175,55,0.1))',
            border: '1px solid rgba(212,175,55,0.4)',
            color: '#d4af37',
          }}
        >
          Verify ID
        </button>
      )}
    </IDKitWidget>
  )
}

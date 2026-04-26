'use client'

import { useEffect, type ReactNode } from 'react'
import { MiniKit } from '@worldcoin/minikit-js'

/**
 * Initializes MiniKit on mount so the app can detect when running inside World App.
 * Wraps children unchanged.
 */
export function MiniKitProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    MiniKit.install(process.env.NEXT_PUBLIC_APP_ID)
  }, [])

  return <>{children}</>
}

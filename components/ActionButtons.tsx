'use client'

import { motion } from 'framer-motion'
import { CONVERSION } from '../lib/constants'

interface ActionButtonsProps {
  shared: boolean
  canConvert: boolean
  stardust: number
  onShare: () => void
  onConvert: () => void
}

/**
 * Share & Convert action buttons
 */
export function ActionButtons({
  shared,
  canConvert,
  stardust,
  onShare,
  onConvert
}: ActionButtonsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="space-y-3"
    >
      {/* Share Button */}
      <ShareButton shared={shared} onShare={onShare} />

      {/* Convert Button */}
      <ConvertButton 
        canConvert={canConvert} 
        stardust={stardust} 
        onConvert={onConvert} 
      />
    </motion.div>
  )
}

/**
 * Share & Earn button
 */
function ShareButton({ shared, onShare }: { shared: boolean; onShare: () => void }) {
  return (
    <button
      onClick={onShare}
      disabled={shared}
      className="w-full py-4 rounded-2xl transition-all disabled:opacity-50 relative overflow-hidden"
      style={{
        background: shared 
          ? 'rgba(255, 255, 255, 0.05)' 
          : 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.1))',
        border: `1px solid ${shared ? 'rgba(255, 255, 255, 0.1)' : 'rgba(212, 175, 55, 0.4)'}`
      }}
    >
      <div className="flex items-center justify-center gap-3">
        <span className="text-lg">{shared ? '✓' : '🔗'}</span>
        <span 
          className="text-sm tracking-wider" 
          style={{ color: shared ? '#c9bdd6' : '#d4af37' }}
        >
          {shared ? 'Shared Today' : 'Share & Earn'}
        </span>
        {!shared && (
          <span 
            className="text-xs px-2 py-1 rounded-full"
            style={{
              background: 'rgba(212, 175, 55, 0.2)',
              color: '#d4af37'
            }}
          >
            +15 ✨
          </span>
        )}
      </div>
    </button>
  )
}

/**
 * Convert to WLD button
 */
function ConvertButton({ 
  canConvert, 
  stardust, 
  onConvert 
}: { 
  canConvert: boolean
  stardust: number
  onConvert: () => void 
}) {
  return (
    <button
      onClick={onConvert}
      disabled={!canConvert}
      className="w-full py-4 rounded-2xl transition-all disabled:opacity-40"
      style={{
        background: canConvert
          ? 'linear-gradient(135deg, rgba(155, 89, 182, 0.25), rgba(155, 89, 182, 0.1))'
          : 'rgba(255, 255, 255, 0.03)',
        border: `1px solid ${canConvert ? 'rgba(155, 89, 182, 0.5)' : 'rgba(255, 255, 255, 0.08)'}`
      }}
    >
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <span className="text-lg">💎</span>
          <div className="text-left">
            <div 
              className="text-sm tracking-wider" 
              style={{ color: canConvert ? '#e8b4f7' : '#c9bdd6' }}
            >
              Convert to WLD
            </div>
            <div className="text-[10px] opacity-60 mt-0.5">
              {CONVERSION.RATE} ✨ = {CONVERSION.WLD_PER_UNIT} WLD
            </div>
          </div>
        </div>
        
        {!canConvert && (
          <div className="text-right">
            <div className="text-xs opacity-60">
              {stardust} / {CONVERSION.RATE}
            </div>
          </div>
        )}
      </div>
    </button>
  )
}

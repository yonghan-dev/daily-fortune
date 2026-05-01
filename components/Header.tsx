'use client'

import { motion } from 'framer-motion'
import { formatDate } from '../lib/utils'

interface HeaderProps {
  stardust: number
  counterPulse: boolean
}

export function Header({ stardust, counterPulse }: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-6">
      {/* Date + Title */}
      <div>
        <div className="text-[10px] tracking-[0.3em] opacity-50 uppercase">
          {formatDate()}
        </div>
        <div
          className="text-2xl font-light mt-1 shimmer-text"
          style={{ fontWeight: 400 }}
        >
          Daily Fortune
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        {/* Stardust counter */}
        <motion.div
          className="relative"
          animate={counterPulse ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          <div
            className="px-4 py-2 rounded-full flex items-center gap-2"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.05))',
              border: '1px solid rgba(212, 175, 55, 0.3)'
            }}
          >
            <span className="text-base">✨</span>
            <motion.span
              className="text-sm font-medium"
              key={stardust}
              initial={{ scale: 1 }}
              animate={counterPulse ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.4 }}
              style={{ color: '#d4af37' }}
            >
              {stardust}
            </motion.span>
          </div>
        </motion.div>
      </div>
    </header>
  )
}

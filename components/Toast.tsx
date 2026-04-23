'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface ToastProps {
  message: string | null
}

/**
 * Bottom toast notification
 */
export function Toast({ message }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div 
            className="px-5 py-3 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(26, 15, 46, 0.95), rgba(26, 15, 46, 0.85))',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div className="text-sm" style={{ color: '#d4af37' }}>
              {message}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

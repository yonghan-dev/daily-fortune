'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CONVERSION } from '../lib/constants'

export interface ValidationIssue {
  type: string
  ok: boolean
  text: string
  progress?: string
}

interface ConvertModalProps {
  isOpen: boolean
  canConvert: boolean
  issues: ValidationIssue[]
  onClose: () => void
  onConfirm: () => void
}

/**
 * WLD conversion modal with validation
 */
export function ConvertModal({
  isOpen,
  canConvert,
  issues,
  onClose,
  onConfirm
}: ConvertModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center p-4"
          style={{ 
            background: 'rgba(0, 0, 0, 0.7)', 
            backdropFilter: 'blur(8px)' 
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl p-6"
            style={{
              background: 'linear-gradient(180deg, #1a0e3d 0%, #0f0820 100%)',
              border: '1px solid rgba(212, 175, 55, 0.3)'
            }}
          >
            <ModalHeader />
            <IssuesList issues={issues} />
            <ModalActions 
              canConvert={canConvert}
              onClose={onClose}
              onConfirm={onConfirm}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ModalHeader() {
  return (
    <div className="text-center mb-6">
      <div className="text-4xl mb-3">💎</div>
      <div 
        className="text-xl mb-2 shimmer-text" 
        style={{ fontWeight: 400 }}
      >
        Convert Stardust
      </div>
      <div className="text-xs opacity-60 tracking-wider">
        {CONVERSION.RATE} ✨ → {CONVERSION.WLD_PER_UNIT} WLD
      </div>
    </div>
  )
}

function IssuesList({ issues }: { issues: ValidationIssue[] }) {
  return (
    <div className="space-y-2 mb-6">
      {issues.map((issue, idx) => (
        <div 
          key={idx}
          className="flex items-center justify-between p-3 rounded-xl"
          style={{
            background: issue.ok 
              ? 'rgba(76, 175, 80, 0.1)' 
              : 'rgba(244, 67, 54, 0.1)',
            border: `1px solid ${issue.ok ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)'}`
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">{issue.ok ? '✓' : '✕'}</span>
            <span 
              className="text-sm" 
              style={{ color: issue.ok ? '#81c784' : '#e57373' }}
            >
              {issue.text}
            </span>
          </div>
          {issue.progress && (
            <span className="text-xs opacity-60">{issue.progress}</span>
          )}
        </div>
      ))}
    </div>
  )
}

function ModalActions({ 
  canConvert, 
  onClose, 
  onConfirm 
}: { 
  canConvert: boolean
  onClose: () => void
  onConfirm: () => void 
}) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onClose}
        className="flex-1 py-3 rounded-xl text-sm tracking-wider"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#c9bdd6'
        }}
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        disabled={!canConvert}
        className="flex-1 py-3 rounded-xl text-sm tracking-wider disabled:opacity-40"
        style={{
          background: canConvert
            ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(212, 175, 55, 0.15))'
            : 'rgba(255, 255, 255, 0.05)',
          border: `1px solid ${canConvert ? 'rgba(212, 175, 55, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
          color: canConvert ? '#d4af37' : '#c9bdd6'
        }}
      >
        Convert
      </button>
    </div>
  )
}

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { TarotCard } from '../lib/cards'
import { TABS, TabKey } from '../lib/constants'

interface CardMessageProps {
  card: TarotCard
  showDetails: TabKey | null
  onTabClick: (tab: TabKey) => void
}

/**
 * Main message + tab system (Love/Work/Money/Lucky)
 */
export function CardMessage({ card, showDetails, onTabClick }: CardMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="mb-6"
    >
      {/* Main Message */}
      <MainMessage message={card.message} />

      {/* Tab Buttons */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {TABS.map(tab => (
          <TabButton
            key={tab.key}
            emoji={tab.emoji}
            label={tab.label}
            active={showDetails === tab.key}
            onClick={() => onTabClick(tab.key as TabKey)}
          />
        ))}
      </div>

      {/* Tab Details */}
      <AnimatePresence mode="wait">
        {showDetails && <TabDetails card={card} tabKey={showDetails} />}
      </AnimatePresence>
    </motion.div>
  )
}

/**
 * Main message with decorative quotes
 */
function MainMessage({ message }: { message: string }) {
  return (
    <div 
      className="relative p-6 rounded-2xl mb-4"
      style={{
        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(212, 175, 55, 0.02))',
        border: '1px solid rgba(212, 175, 55, 0.2)'
      }}
    >
      <div 
        className="absolute -top-2 left-4 text-5xl leading-none opacity-30"
        style={{ color: '#d4af37' }}
      >
        "
      </div>
      <p 
        className="text-base leading-relaxed italic text-center px-4" 
        style={{ color: '#e8dfc7' }}
      >
        {message}
      </p>
      <div 
        className="absolute -bottom-6 right-4 text-5xl leading-none opacity-30"
        style={{ color: '#d4af37' }}
      >
        "
      </div>
    </div>
  )
}

/**
 * Individual tab button
 */
function TabButton({ 
  emoji, 
  label, 
  active, 
  onClick 
}: { 
  emoji: string
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="py-3 rounded-xl transition-all"
      style={{
        background: active 
          ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(212, 175, 55, 0.1))'
          : 'rgba(255, 255, 255, 0.03)',
        border: `1px solid ${active ? 'rgba(212, 175, 55, 0.5)' : 'rgba(255, 255, 255, 0.08)'}`
      }}
    >
      <div className="text-lg mb-1">{emoji}</div>
      <div 
        className="text-[10px] tracking-wider uppercase"
        style={{ color: active ? '#d4af37' : '#c9bdd6', opacity: 0.8 }}
      >
        {label}
      </div>
    </button>
  )
}

/**
 * Tab detail content
 */
function TabDetails({ card, tabKey }: { card: TarotCard; tabKey: TabKey }) {
  return (
    <motion.div
      key={tabKey}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div 
        className="p-5 rounded-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        {tabKey === 'lucky' ? (
          <LuckyDetails lucky={card.lucky} />
        ) : (
          <p className="text-sm leading-relaxed" style={{ color: '#e8dfc7' }}>
            {card[tabKey]}
          </p>
        )}
      </div>
    </motion.div>
  )
}

/**
 * Lucky tab special content (color/number/item)
 */
function LuckyDetails({ lucky }: { lucky: TarotCard['lucky'] }) {
  return (
    <div className="space-y-3">
      <DetailRow label="Color" value={lucky.color} />
      <DetailRow label="Number" value={lucky.number.toString()} />
      <DetailRow label="Item" value={lucky.item} isLast />
    </div>
  )
}

function DetailRow({ 
  label, 
  value, 
  isLast = false 
}: { 
  label: string
  value: string
  isLast?: boolean 
}) {
  return (
    <div className={`flex justify-between items-center ${!isLast ? 'pb-2 border-b border-white/10' : ''}`}>
      <span className="text-xs opacity-60 uppercase tracking-wider">{label}</span>
      <span className="text-sm text-right" style={{ color: '#d4af37' }}>{value}</span>
    </div>
  )
}

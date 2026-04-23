'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { TarotCard as TarotCardType } from '../lib/cards'

interface TarotCardProps {
  card: TarotCardType
  flipped: boolean
  onFlip: () => void
  bigReward: number | false
}

/**
 * 3D flippable tarot card with animations
 */
export function TarotCard({ card, flipped, onFlip, bigReward }: TarotCardProps) {
  return (
    <div 
      className="relative flex justify-center mb-8" 
      style={{ perspective: '1500px' }}
    >
      <motion.div
        className="relative cursor-pointer select-none"
        style={{
          width: '280px',
          height: '420px',
          transformStyle: 'preserve-3d'
        }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 1, type: 'spring', stiffness: 60 }}
        onClick={onFlip}
      >
        {/* Card Back */}
        <CardBack />
        
        {/* Card Front */}
        <CardFront card={card} flipped={flipped} />
      </motion.div>

      {/* Reward Badge Animation */}
      <AnimatePresence>
        {bigReward && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1.3, 1, 0.8],
              y: [0, -20, -60, -100]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
          >
            <div 
              className="text-4xl font-bold"
              style={{
                color: '#d4af37',
                textShadow: '0 0 30px rgba(212, 175, 55, 0.8), 0 0 60px rgba(212, 175, 55, 0.4)'
              }}
            >
              +{bigReward} ✨
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Card back design with rotating celestial symbol
 */
function CardBack() {
  return (
    <div 
      className="absolute inset-0 rounded-3xl overflow-hidden"
      style={{
        backfaceVisibility: 'hidden',
        background: `
          radial-gradient(circle at 30% 30%, rgba(212, 175, 55, 0.15) 0%, transparent 60%),
          radial-gradient(circle at 70% 70%, rgba(212, 175, 55, 0.1) 0%, transparent 60%),
          linear-gradient(135deg, #1a0f2e 0%, #2d1b4e 50%, #1a0f2e 100%)
        `,
        border: '2px solid rgba(212, 175, 55, 0.3)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(212, 175, 55, 0.2)',
        animation: 'pulse-glow 3s ease-in-out infinite'
      }}
    >
      {/* Decorative borders */}
      <div className="absolute inset-4 border border-[#d4af37]/40 rounded-2xl" />
      <div className="absolute inset-6 border border-[#d4af37]/20 rounded-xl" />
      
      {/* Central symbol */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="relative mb-6"
        >
          <div 
            className="w-36 h-36 rounded-full flex items-center justify-center"
            style={{ border: '1px solid rgba(212, 175, 55, 0.4)' }}
          >
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ border: '1px solid rgba(212, 175, 55, 0.3)' }}
            >
              <div className="text-5xl" style={{ color: '#d4af37' }}>✦</div>
            </div>
          </div>
          
          {/* Star points */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <div
              key={deg}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `translate(-50%, -50%) rotate(${deg}deg) translateX(90px)`,
              }}
            >
              <div 
                className="w-1 h-1 rounded-full"
                style={{
                  background: '#d4af37',
                  boxShadow: '0 0 8px rgba(212, 175, 55, 0.8)'
                }}
              />
            </div>
          ))}
        </motion.div>
        
        <div className="text-center">
          <div 
            className="text-xs tracking-[0.4em] mb-2 opacity-80"
            style={{ color: '#d4af37' }}
          >
            TAP TO REVEAL
          </div>
          <div className="text-[10px] tracking-[0.2em] opacity-40 uppercase">
            Your destiny awaits
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Card front with revealed card details
 */
function CardFront({ card, flipped }: { card: TarotCardType; flipped: boolean }) {
  return (
    <div 
      className="absolute inset-0 rounded-3xl overflow-hidden"
      style={{
        backfaceVisibility: 'hidden',
        transform: 'rotateY(180deg)',
        background: `
          linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(249, 231, 159, 0.05) 50%, rgba(212, 175, 55, 0.08) 100%),
          linear-gradient(180deg, #0f0820 0%, #1a0e3d 50%, #0f0820 100%)
        `,
        border: '2px solid rgba(212, 175, 55, 0.5)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 50px rgba(212, 175, 55, 0.3)'
      }}
    >
      <div className="absolute inset-4 border border-[#d4af37]/30 rounded-2xl" />
      
      {/* Top decoration */}
      <div className="absolute top-8 left-0 right-0 flex items-center justify-center gap-3 px-10">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
        <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: '#d4af37' }}>
          Arcana
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <motion.div 
          className="text-8xl mb-6"
          initial={{ scale: 0, rotate: -30 }}
          animate={flipped ? { scale: 1, rotate: 0 } : { scale: 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
          style={{ filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.5))' }}
        >
          {card.emoji}
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={flipped ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.7 }}
          className="text-3xl mb-2 text-center shimmer-text"
          style={{ fontWeight: 400 }}
        >
          {card.name}
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={flipped ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.9 }}
          className="flex items-center gap-2"
        >
          <div className="h-px w-8 bg-[#d4af37]/40" />
          <div className="w-1 h-1 rounded-full bg-[#d4af37]" />
          <div className="h-px w-8 bg-[#d4af37]/40" />
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={flipped ? { opacity: 0.8 } : { opacity: 0 }}
          transition={{ delay: 1 }}
          className="text-sm italic text-center mt-3 px-4"
          style={{ color: '#c9bdd6' }}
        >
          {card.summary}
        </motion.p>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-3 px-10">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
        <div className="text-[10px]" style={{ color: '#d4af37' }}>✦</div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
      </div>
    </div>
  )
}

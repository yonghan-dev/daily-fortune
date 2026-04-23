'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

// Libs
import { getTodaysCard, getLocalDateStr } from '../lib/utils'
import { CONVERSION, TabKey } from '../lib/constants'

// Hooks
import { useCountdown } from '../hooks/useCountdown'

// Components
import { StarField } from '../components/StarField'
import { Header } from '../components/Header'
import { TarotCard } from '../components/TarotCard'
import { CardMessage } from '../components/CardMessage'
import { ActionButtons } from '../components/ActionButtons'
import { ConvertModal, ValidationIssue } from '../components/ConvertModal'
import { Toast } from '../components/Toast'

export default function DailyFortune() {
  // User state (in production: World ID)
  const [userId, setUserId] = useState('user_demo_guest')
  
  // Card interaction state
  const [flipped, setFlipped] = useState(false)
  const [shared, setShared] = useState(false)
  const [showDetails, setShowDetails] = useState<TabKey | null>(null)
  
  // Rewards state
  const [stardust, setStardust] = useState(147)
  const [bigReward, setBigReward] = useState<number | false>(false)
  const [counterPulse, setCounterPulse] = useState(false)
  
  // UI state
  const [showToast, setShowToast] = useState<string | null>(null)
  const [showConvertModal, setShowConvertModal] = useState(false)
  
  // Conversion stats
  const [conversionStats, setConversionStats] = useState({
    dailyConvertedWld: 0,
    weeklyConvertedWld: 0,
    lifetimeConvertedWld: 0
  })

  useEffect(() => {
  setUserId('user_demo_' + Math.floor(Math.random() * 1000))
}, [])
  
  // Derived state
  const countdown = useCountdown()
  const today = getLocalDateStr()
  const card = getTodaysCard(userId, today)
  
  // ===========================
  // Handlers
  // ===========================
  
  const handleFlip = () => {
    if (flipped) return
    setFlipped(true)
    
    setTimeout(() => {
      setBigReward(10)
      setCounterPulse(true)
    }, 700)
    
    setTimeout(() => {
      setBigReward(false)
      setStardust(s => s + 10)
    }, 1300)
    
    setTimeout(() => setCounterPulse(false), 2000)
  }
  
const handleShare = async () => {
  if (shared) return
  
  // 모바일 감지
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
  
  // 데스크톱은 Web Share API 사용 안 함 (부정확한 결과)
  if (!isMobile) {
    // 데스크톱: 클립보드 복사만
    const shareData = {
      text: `I got "${card.name}" today on Daily Fortune! ${card.emoji}\n"${card.summary}"\n\n${window.location.href}`
    }
    
    try {
      await navigator.clipboard.writeText(shareData.text)
      setShowToast('📱 Share on mobile to earn Stardust')
      setTimeout(() => setShowToast(null), 3000)
    } catch (error) {
      setShowToast('📱 Use mobile device to share')
      setTimeout(() => setShowToast(null), 3000)
    }
    
    return // 리워드 없음
  }
  
  // 모바일에서만 Web Share API 사용
  if (!navigator.share) {
    setShowToast('⚠️ Share not supported')
    setTimeout(() => setShowToast(null), 3000)
    return
  }
  
  const shareData = {
    title: 'Daily Fortune',
    text: `I got "${card.name}" today! ${card.emoji}\n\n"${card.summary}"\n\nDiscover yours:`,
    url: window.location.href
  }
  
  // 공유 시작 시간 기록
  const startTime = Date.now()
  
  try {
    await navigator.share(shareData)
    
    // 공유 시간 체크 (500ms 미만 = 의심스러움)
    const duration = Date.now() - startTime
    if (duration < 500) {
      console.warn('⚠️ Share too fast - likely cancelled')
      return // 리워드 없음
    }
    
    // 공유 완료 → 리워드
    setShared(true)
    
    setTimeout(() => {
      setBigReward(15)
      setCounterPulse(true)
    }, 200)
    
    setTimeout(() => {
      setBigReward(false)
      setStardust(s => s + 15)
    }, 800)
    
    setTimeout(() => {
      setCounterPulse(false)
      setShowToast('✨ Shared! +15 Stardust earned')
      setTimeout(() => setShowToast(null), 3000)
    }, 1500)
    
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return // 취소 - 리워드 없음
    }
    
    console.error('Share error:', error)
    setShowToast('⚠️ Share failed')
    setTimeout(() => setShowToast(null), 3000)
  }
}
  
  const handleTabClick = (tab: TabKey) => {
    setShowDetails(showDetails === tab ? null : tab)
  }
  
  const handleConvertClick = () => {
    setShowConvertModal(true)
  }
  
  const handleConvertConfirm = () => {
    if (!validation.canConvert) return
    
    setStardust(s => s - CONVERSION.RATE)
    setConversionStats(prev => ({
      dailyConvertedWld: prev.dailyConvertedWld + CONVERSION.WLD_PER_UNIT,
      weeklyConvertedWld: prev.weeklyConvertedWld + CONVERSION.WLD_PER_UNIT,
      lifetimeConvertedWld: prev.lifetimeConvertedWld + CONVERSION.WLD_PER_UNIT
    }))
    setShowConvertModal(false)
    setShowToast(`+${CONVERSION.WLD_PER_UNIT} WLD received! 💎`)
    setTimeout(() => setShowToast(null), 3000)
  }
  
  // ===========================
  // Validation
  // ===========================
  
  const getValidation = () => {
    const issues: ValidationIssue[] = []
    
    if (stardust < CONVERSION.RATE) {
      issues.push({
        type: 'stardust',
        ok: false,
        text: `Need ${CONVERSION.RATE} ✨ minimum`,
        progress: `${stardust} / ${CONVERSION.RATE} ✨`
      })
    } else {
      issues.push({
        type: 'stardust',
        ok: true,
        text: `${CONVERSION.RATE} ✨ available`
      })
    }
    
    if (conversionStats.dailyConvertedWld >= CONVERSION.DAILY_LIMIT_WLD) {
      issues.push({
        type: 'daily',
        ok: false,
        text: `Daily limit reached (${CONVERSION.DAILY_LIMIT_WLD} WLD)`
      })
    }
    
    if (conversionStats.weeklyConvertedWld >= CONVERSION.WEEKLY_LIMIT_WLD) {
      issues.push({
        type: 'weekly',
        ok: false,
        text: `Weekly limit reached (${CONVERSION.WEEKLY_LIMIT_WLD} WLD)`
      })
    }
    
    return {
      canConvert: issues.every(i => i.ok !== false),
      issues
    }
  }
  
  const validation = getValidation()
  
  // ===========================
  // Render
  // ===========================
  
  return (
    <div 
      className="min-h-screen" 
      style={{
        background: 'linear-gradient(180deg, #0a0619 0%, #1a0e3d 50%, #0a0619 100%)',
        fontFamily: "'Fraunces', Georgia, serif",
        color: '#f0ead6'
      }}
    >
      <StarField />
      
      <div className="relative max-w-md mx-auto px-5 py-6 min-h-screen">
        
        <Header stardust={stardust} counterPulse={counterPulse} />

        {/* Countdown */}
        <div className="text-center mb-8">
          <div className="text-[10px] tracking-[0.3em] opacity-40 uppercase mb-1">
            Next card in
          </div>
          <div className="text-sm opacity-60 font-mono tracking-wider">
            {countdown}
          </div>
        </div>

        <TarotCard 
          card={card}
          flipped={flipped}
          onFlip={handleFlip}
          bigReward={bigReward}
        />

        {/* Show after card is flipped */}
        <AnimatePresence>
          {flipped && (
            <>
              <CardMessage
                card={card}
                showDetails={showDetails}
                onTabClick={handleTabClick}
              />
              
              <ActionButtons
                shared={shared}
                canConvert={validation.canConvert}
                stardust={stardust}
                onShare={handleShare}
                onConvert={handleConvertClick}
              />
            </>
          )}
        </AnimatePresence>
      </div>

      <Toast message={showToast} />
      
      <ConvertModal
        isOpen={showConvertModal}
        canConvert={validation.canConvert}
        issues={validation.issues}
        onClose={() => setShowConvertModal(false)}
        onConfirm={handleConvertConfirm}
      />
    </div>
  )
}

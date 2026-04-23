import { TAROT_CARDS, TarotCard } from './cards'

/**
 * Get today's card based on user ID + date (deterministic)
 * Same user + same day = same card (regulation-safe)
 */
export function getTodaysCard(userId: string, dateStr: string): TarotCard {
  let hash = 0
  const input = userId + dateStr
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) - hash) + input.charCodeAt(i)
    hash |= 0
  }
  const cardId = Math.abs(hash) % 22
  return TAROT_CARDS[cardId]
}

/**
 * Get local date string (user's timezone)
 */
export function getLocalDateStr(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

/**
 * Format date for display
 */
export function formatDate(): string {
  return new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  })
}

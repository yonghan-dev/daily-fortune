// Conversion system settings

export const CONVERSION = {
  RATE: 300,                // 300 ✨ = 0.1 WLD
  WLD_PER_UNIT: 0.1,
  DAILY_LIMIT_WLD: 0.1,     // Max 0.1 WLD per day
  WEEKLY_LIMIT_WLD: 0.5,    // Max 0.5 WLD per week
  WLD_USD_RATE: 0.27        // Current WLD price
} as const

// Reward amounts
export const REWARDS = {
  DRAW: 10,
  SHARE: 15
} as const

// Tab configurations
export const TABS = [
  { key: 'love', emoji: '💝', label: 'Love' },
  { key: 'work', emoji: '💼', label: 'Work' },
  { key: 'money', emoji: '💰', label: 'Money' },
  { key: 'lucky', emoji: '🎲', label: 'Lucky' }
] as const

export type TabKey = typeof TABS[number]['key']

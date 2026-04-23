'use client'

import { useState, useEffect } from 'react'

interface Star {
  id: number
  size: number
  left: number
  top: number
  opacity: number
  duration: number
  delay: number
}

/**
 * Twinkling star background (client-only to avoid hydration)
 */
export function StarField() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    // Generate stars only on client side
    const generatedStars: Star[] = [...Array(40)].map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.6 + 0.2,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 3
    }))
    setStars(generatedStars)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: '#fff',
            left: `${star.left}%`,
            top: `${star.top}%`,
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`
          }}
        />
      ))}
    </div>
  )
}
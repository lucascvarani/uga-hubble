import { useState, useEffect } from 'react'

interface FadeOutProps {
  onNext: () => void
  duration: number // in seconds
}

export default function FadeOut({ onNext, duration }: FadeOutProps) {
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    // Small delay to ensure the component renders with opacity: 0 first
    const fadeStart = setTimeout(() => {
      setIsFading(true)
    }, 50) // 50ms delay to allow initial render

    // Wait for fade duration, then wait additional duration, then call onNext
    const timeout = setTimeout(() => {
      onNext()
    }, duration * 2000 + 50) // Add the initial delay

    return () => {
      clearTimeout(fadeStart)
      clearTimeout(timeout)
    }
  }, [duration, onNext])

  return (
    <div
      className={`fade-out ${isFading ? 'fade-out-active' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        transition: `opacity ${duration}s ease`,
        opacity: isFading ? 1 : 0, // Start at 0 and fade to 1 (black)
        zIndex: 9999,
      }}
    ></div>
  )
}

import React, { useState, useEffect, useRef } from 'react'
import DiamondLine from '../../structure/DiamondLine'
import SmokeText from '../../SmokeText'
import MusicManager from '../../../utils/MusicManager'
import type { AladinInstance } from '../../Aladin'

interface DialogUIProps {
  text: string[]
  audios: string[]
  title?: string
  onFinish: () => void
  typingSpeed?: number
  aladinInstance: AladinInstance | null
  shouldAnimate?: boolean
}

const Dialog: React.FC<DialogUIProps> = ({
  text,
  title,
  onFinish,
  aladinInstance,
  typingSpeed = 50,
  audios = [],
  shouldAnimate = true,
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [showDiamond, setShowDiamond] = useState(false)
  const [startTyping, setStartTyping] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const typingIntervalRef = useRef<any>(null)
  let completed = false

  useEffect(() => {
    // Reset all states when text changes
    setDisplayedText('')
    setIsTypingComplete(false)

    // Reset animations
    setIsVisible(false)
    setShowDiamond(false)
    setStartTyping(false)

    const visibilityTimer = setTimeout(() => setIsVisible(true), 50)
    const diamondTimer = setTimeout(() => setShowDiamond(true), 350)
    const typingStartTimer = setTimeout(() => setStartTyping(true), 650)

    return () => {
      clearTimeout(visibilityTimer)
      clearTimeout(diamondTimer)
      clearTimeout(typingStartTimer)
    }
  }, [text])

  // Typing animation
  useEffect(() => {
    if (!startTyping) return

    let currentIndex = 0
    typingIntervalRef.current = setInterval(() => {
      if (currentIndex <= text[currentTextIndex].length) {
        setDisplayedText(text[currentTextIndex].slice(0, currentIndex))
        currentIndex++
      } else {
        setIsTypingComplete(true)
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current)
      }
    }, typingSpeed)

    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current)
    }
  }, [currentTextIndex, startTyping, text, typingSpeed])

  useEffect(() => {
    console.log('Audio effect for text index:', currentTextIndex)
    console.log('Available audios:', audios)
    if (currentTextIndex < 0 || currentTextIndex >= audios.length) return
    MusicManager.getInstance().playSoundEffect(
      audios[currentTextIndex],
      3.0,
      false,
      currentTextIndex !== 0,
      1
    )
  }, [currentTextIndex, audios])

  const handleClick = () => {
    if (isTypingComplete) {
      // Move to next text
      if (currentTextIndex < text.length - 1) {
        console.log('moving to next text. CurrentIndex:', currentTextIndex)
        setCurrentTextIndex((prev) => prev + 1)
        setDisplayedText('')
        setIsTypingComplete(false)
        setStartTyping(false)

        // Restart typing after a small delay
        setTimeout(() => setStartTyping(true), 100)
      } else {
        MusicManager.getInstance().stopAllSoundEffects()
        completed = true
        onFinish()
        setCurrentTextIndex(0)
      }
    } else if (startTyping) {
      // Instantly complete text if clicked during typing
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current)
      setDisplayedText(text[currentTextIndex])
      setIsTypingComplete(true)
    }
  }

  useEffect(() => {
    // Dynamically inject CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/Dialog.css'
    link.id = 'dialog-css'
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  // inside useEffect
  useEffect(() => {
    if (!shouldAnimate) return

    if (!aladinInstance || completed) return

    const originCoords = aladinInstance.getRaDec()
    if (!originCoords) return

    const [originRa, originDec] = originCoords

    let frameId: number
    const startTime = performance.now()

    const animate = (time: number) => {
      const elapsed = (time - startTime) / 1000 // seconds

      // Get zoom (field of view in degrees)
      const fov = aladinInstance.getFov()
      // Default fallback if fov is null or weird
      const zoom = fov ? fov[0] : 60

      // Scale offsets proportionally to zoom
      // At larger zoom (small FOV), movements feel slower
      const scale = zoom / 60 // 60 chosen as "baseline" FOV

      // Independent sine waves with slightly different frequencies
      const offsetRa =
        (Math.sin(elapsed * 0.3) * 1.2 + Math.sin(elapsed * 0.07) * 0.6) * scale
      const offsetDec =
        (Math.cos(elapsed * 0.2) * 0.8 + Math.sin(elapsed * 0.11) * 0.4) * scale

      aladinInstance.gotoRaDec(originRa + offsetRa, originDec + offsetDec)

      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frameId)
  }, [aladinInstance, completed, shouldAnimate])

  return (
    <div className="dialog-wrapper w-full h-screen" onClick={handleClick}>
      <div className="flex justify-center text-white mt-5 text-3xl font-medium">
        <SmokeText>{title}</SmokeText>
      </div>

      <div
        className="
          dialog-container
          fixed bottom-0 left-1/2 -translate-x-1/2 
          w-1/2
          p-10 pt-8 pb-12
           text-white text-center
          cursor-pointer
          z-[1000]
          box-border
        "
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? 'translateX(0%) scaleX(1)'
            : 'translateX(-50%) scaleX(0)',
          transformOrigin: 'center',
          transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          clipPath: isVisible
            ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
            : 'polygon(45% 0, 55% 0, 55% 100%, 45% 100%)',
        }}
      >
        <SmokeText>
          <div
            style={{
              opacity: showDiamond ? 1 : 0,
              transform: showDiamond ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              transformOrigin: 'center',
            }}
          >
            <DiamondLine />
          </div>

          <span
            style={{
              display: 'inline-block',
              opacity: startTyping ? 1 : 0,
              transform: startTyping
                ? 'scaleX(1) scaleY(1)'
                : 'scaleX(0.3) scaleY(0.8)',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transformOrigin: 'center',
              fontSize: '21px',
              fontWeight: 100,
            }}
          >
            {displayedText}
            {!isTypingComplete && startTyping && (
              <span
                style={{
                  animation: 'blink 1s infinite',
                  marginLeft: '2px',
                  fontSize: '21px',
                  fontWeight: 100,
                }}
              >
                |
              </span>
            )}
          </span>
        </SmokeText>

        <style>
          {`
            @keyframes blink {
              0%, 50% { opacity: 1; }
              51%, 100% { opacity: 0; }
            }
          `}
        </style>
      </div>
    </div>
  )
}

export default Dialog

import React, { useState, useEffect, useRef } from 'react'
import DiamondLine from '../../structure/DiamondLine'
import SmokeText from '../../SmokeText'
import MusicManager from '../../../utils/MusicManager'

interface DialogUIProps {
  text: string[]
  audios: string[]
  title?: string
  onFinish: () => void
  typingSpeed?: number
}

const Dialog: React.FC<DialogUIProps> = ({
  text,
  title,
  onFinish,
  typingSpeed = 50,
  audios = [],
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [showDiamond, setShowDiamond] = useState(false)
  const [startTyping, setStartTyping] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const typingIntervalRef = useRef<any>(null)

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
    MusicManager.getInstance().playSoundEffect(audios[currentTextIndex], 3.0)
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

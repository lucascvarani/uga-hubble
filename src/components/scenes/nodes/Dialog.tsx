import React, { useState, useEffect } from 'react'
import DiamondLine from '../../structure/DiamondLine'

interface DialogUIProps {
  text: string[]
  onFinish: () => void
  typingSpeed?: number
}

const Dialog: React.FC<DialogUIProps> = ({
  text,
  onFinish,
  typingSpeed = 50,
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [showDiamond, setShowDiamond] = useState(false)
  const [startTyping, setStartTyping] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    // Reset all states when text changes
    setDisplayedText('')
    setIsTypingComplete(false)

    // Animation sequence for new dialogs
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

  // Separate effect for typing animation
  useEffect(() => {
    if (!startTyping) return

    let currentIndex = 0
    const timer = setInterval(() => {
      if (currentIndex <= text[currentTextIndex].length) {
        setDisplayedText(text[currentTextIndex].slice(0, currentIndex))
        currentIndex++
      } else {
        setIsTypingComplete(true)
        clearInterval(timer)
      }
    }, typingSpeed)

    return () => clearInterval(timer)
  }, [currentTextIndex, startTyping, text, typingSpeed])

  const handleClick = () => {
    if (isTypingComplete) {
      if (currentTextIndex < text.length - 1) {
        setCurrentTextIndex(currentTextIndex + 1)
        setDisplayedText('')
        setIsTypingComplete(false)
        setStartTyping(false)

        // Restart the typing animation for the next text
        setTimeout(() => setStartTyping(true), 100) // Small delay before starting next text
      } else {
        onFinish()
        setCurrentTextIndex(0)
      }
    } else if (startTyping) {
      // Instantly complete the text if clicked during typing
      setDisplayedText(text[currentTextIndex])
      setIsTypingComplete(true)
    }
  }

  useEffect(() => {
    // cria o <link> para o CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/Dialog.css' // caminho para o seu arquivo CSS
    link.id = 'dialog-css' // opcional, para identificar depois
    document.head.appendChild(link)

    // cleanup: remove o CSS quando o componente desmonta
    return () => {
      document.head.removeChild(link)
    }
  }, [])

  return (
    // We add a className to target this element reliably with CSS
    <div className="dialog-wrapper">
      <div
        className="dialog-container"
        onClick={handleClick}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          padding: '40px',
          paddingTop: '30px', // Less padding on top to make room for the line
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          color: 'white',
          textAlign: 'center',
          fontSize: '1.1rem',
          zIndex: 1000,
          cursor: 'pointer',
          boxSizing: 'border-box',
          // Opening animation styles
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'center',
          transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          clipPath: isVisible
            ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
            : 'polygon(45% 0, 55% 0, 55% 100%, 45% 100%)',
        }}
      >
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
          }}
        >
          {displayedText}
          {!isTypingComplete && startTyping && (
            <span
              style={{
                animation: 'blink 1s infinite',
                marginLeft: '2px',
              }}
            >
              |
            </span>
          )}
        </span>

        <style>
          {`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        /* The dialog needs a relative position for its pseudo-elements */
        .dialog-container {
          position: relative;
        }
        `}
        </style>
      </div>
    </div>
  )
}

export default Dialog

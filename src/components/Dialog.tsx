import React, { useState, useEffect } from 'react'
import DiamondLine from './structure/DiamondLine'

interface DialogUIProps {
  text: string
  onNext: () => void
  typingSpeed?: number
  newDialog?: boolean
}

const Dialog: React.FC<DialogUIProps> = ({
  text,
  onNext,
  typingSpeed = 50,
  newDialog = false,
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [showDiamond, setShowDiamond] = useState(false)
  const [startTyping, setStartTyping] = useState(false)

  useEffect(() => {
    // Reset all states when text changes
    setDisplayedText('')
    setIsTypingComplete(false)

    if (newDialog) {
      // Animation sequence for new dialogs
      setIsVisible(false)
      setShowDiamond(false)
      setStartTyping(false)

      const visibilityTimer = setTimeout(() => setIsVisible(true), 50)
      const diamondTimer = setTimeout(() => setShowDiamond(true), 200)
      const typingStartTimer = setTimeout(() => setStartTyping(true), 400)

      return () => {
        clearTimeout(visibilityTimer)
        clearTimeout(diamondTimer)
        clearTimeout(typingStartTimer)
      }
    } else {
      // No animation - show everything immediately
      setIsVisible(true)
      setShowDiamond(true)
      setStartTyping(true)
    }
  }, [text, newDialog])

  // Separate effect for typing animation
  useEffect(() => {
    if (!startTyping) return

    let currentIndex = 0
    const timer = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex))
        currentIndex++
      } else {
        setIsTypingComplete(true)
        clearInterval(timer)
      }
    }, typingSpeed)

    return () => clearInterval(timer)
  }, [startTyping, text, typingSpeed])

  const handleClick = () => {
    if (isTypingComplete) {
      onNext()
    } else if (startTyping) {
      // Instantly complete the text if clicked during typing
      setDisplayedText(text)
      setIsTypingComplete(true)
    }
  }

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
          transform: isVisible
            ? 'scaleY(1) scaleX(1)'
            : 'scaleY(0.1) scaleX(0.8)',
          transformOrigin: 'bottom center',
          transition: newDialog
            ? 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            : 'none',
          clipPath: isVisible
            ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
            : 'polygon(0 90%, 100% 90%, 100% 100%, 0 100%)',
        }}
      >
        <div
          style={{
            opacity: showDiamond ? 1 : 0,
            transform: showDiamond
              ? 'scaleX(1) translateY(0)'
              : 'scaleX(0) translateY(-10px)',
            transition: newDialog
              ? 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
              : 'none',
            transformOrigin: 'center',
          }}
        >
          <DiamondLine />
        </div>
        <span
          style={{
            display: 'inline-block',
            opacity: startTyping ? 1 : 0,
            transform: startTyping ? 'scale(1)' : 'scale(0.9)',
            transition: newDialog
              ? 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              : 'none',
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

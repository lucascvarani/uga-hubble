import React, { useState, useEffect } from 'react'
import SmokeText from './SmokeText'

interface QuestDisplayProps {
  title: string
  description: string
}

const QuestDisplay: React.FC<QuestDisplayProps> = ({ title, description }) => {
  const [showTitle, setShowTitle] = useState(false)
  const [showDivider, setShowDivider] = useState(false)
  const [showDescription, setShowDescription] = useState(false)

  useEffect(() => {
    const titleTimer = setTimeout(() => setShowTitle(true), 200)
    const dividerTimer = setTimeout(() => setShowDivider(true), 400)
    const descriptionTimer = setTimeout(() => setShowDescription(true), 600)

    return () => {
      clearTimeout(titleTimer)
      clearTimeout(dividerTimer)
      clearTimeout(descriptionTimer)
    }
  }, [])

  return (
    <div style={styles.questContainer}>
      <SmokeText>
        <h2
          style={{
            ...styles.questTitle,
            opacity: showTitle ? 1 : 0,
            transform: showTitle ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 0.6s ease-out',
          }}
        >
          {title}
        </h2>
        <div
          style={{
            ...styles.divider,
            width: showDivider ? '100%' : '0%',
            transition: 'width 0.8s ease-out',
          }}
        ></div>
        <p
          style={{
            ...styles.questDescription,
            opacity: showDescription ? 1 : 0,
            transform: showDescription ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.6s ease-out',
          }}
        >
          {description}
        </p>
      </SmokeText>
    </div>
  )
}

// Exemplo de como usar o componente com props
const MissionTracker: React.FC<QuestDisplayProps> = ({
  title,
  description,
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100) // Small delay for smoother animation

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      style={{
        ...styles.missionContainer,
        ...styles.animationContainer,
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translateY(0) scale(1)'
          : 'translateY(-20px) scale(0.95)',
      }}
    >
      {/* <div className="bg-black w-fit opacity-50 rounded-lg blur-lg"> */}
      <QuestDisplay title={title} description={description} />
      {/* </div> */}
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  missionContainer: {
    padding: '20px',
    backgroundColor: 'transparent',
    borderRadius: '0',
    border: 'none',
    backdropFilter: 'none',
    boxShadow: 'none',
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.6)',
  },
  animationContainer: {
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    transformOrigin: 'top left',
  },
  appContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: '40px',
    minHeight: '100vh',
    backgroundColor: '#0a0a1a',
    backgroundImage: `
      radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 2%),
      radial-gradient(circle at 80% 30%, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 2%),
      radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 1%)
    `,
    backgroundSize: '100px 100px',
  },
  questContainer: {
    maxWidth: '350px',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  questTitle: {
    fontSize: '1.5rem', // 24px
    fontWeight: '600',
    margin: '0 0 8px 0',
    color: '#ffffff',
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.7)',
  },
  divider: {
    width: '100%',
    height: '1px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '12px',
    boxShadow: '0 0 8px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)',
  },
  questDescription: {
    fontSize: '1rem', // 16px
    lineHeight: 1.6,
    margin: 0,
    color: 'rgba(255, 255, 255, 0.9)',
    textShadow: '1px 1px 6px rgba(0, 0, 0, 0.8), 0 0 12px rgba(0, 0, 0, 0.6)',
  },
}

export default MissionTracker

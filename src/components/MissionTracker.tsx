import React from 'react'

interface QuestDisplayProps {
  title: string
  description: string
}

const QuestDisplay: React.FC<QuestDisplayProps> = ({ title, description }) => {
  return (
    <div style={styles.questContainer}>
      <h2 style={styles.questTitle}>{title}</h2>
      {/* This div creates the line underneath the title */}
      <div style={styles.divider}></div>
      <p style={styles.questDescription}>{description}</p>
    </div>
  )
}

// Exemplo de como usar o componente com props
const MissionTracker: React.FC<QuestDisplayProps> = ({
  title,
  description,
}) => {
  return (
    <div style={styles.missionContainer}>
      <QuestDisplay title={title} description={description} />
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

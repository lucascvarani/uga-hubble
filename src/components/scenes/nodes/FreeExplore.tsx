import React, { useEffect, useState } from 'react'
import type { SceneNodeType } from './SceneNode'
import type { AladinInstance } from '../../Aladin'
import './EyeOpen.css' // CSS com keyframes

interface FreeExploreProps {
  aladinInstance: AladinInstance | null
  onClose: () => void
}

const title = 'Catalog'
const catalogList = ['Andromeda']

const FreeExplore: React.FC<FreeExploreProps> = () => {
  const [showTitle, setShowTitle] = useState(false)
  const [showDivider, setShowDivider] = useState(false)
  const [showButtons, setShowButtons] = useState(false)

  useEffect(() => {
    const titleTimer = setTimeout(() => setShowTitle(true), 200)
    const dividerTimer = setTimeout(() => setShowDivider(true), 400)
    const buttonsTimer = setTimeout(() => setShowButtons(true), 600)

    return () => {
      clearTimeout(titleTimer)
      clearTimeout(dividerTimer)
      clearTimeout(buttonsTimer)
    }
  }, [])

  return (
    <div style={styles.questContainer}>
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          opacity: showButtons ? 1 : 0,
          transform: showButtons ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.6s ease-out',
        }}
      >
        {catalogList.map((item, index) => (
          <button
            key={index}
            style={styles.catalogButton}
            onClick={() => console.log(`Clicked on: ${item}`)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  questContainer: {
    maxWidth: '350px',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  questTitle: {
    fontSize: '1.5rem',
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
  catalogButton: {
    padding: '10px 15px',
    fontSize: '1rem',
    color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '6px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background-color 0.3s, transform 0.2s',
  },
}

export default FreeExplore

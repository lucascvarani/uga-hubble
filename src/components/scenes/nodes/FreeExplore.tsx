import React, { useEffect, useState } from 'react'
import type { SceneNode, SceneNodeType, ZoomTutorialNode } from './SceneNode'
import type { AladinInstance } from '../../Aladin'
import './EyeOpen.css' // CSS com keyframes
import { a } from 'framer-motion/client'
import MissionTracker from '../../MissionTracker'

interface FreeExploreProps {
  node: SceneNode
  aladinInstance: AladinInstance | null
  onClose: () => void
}

const title = 'Catalog'

const catalogList = [
  { name: 'Andromeda', coords: [10.6847083, 41.2690659], fov: 80 },
  { name: 'Sombrero Galaxy', coords: [10.4107, -11.6608], fov: 80 },
  { name: 'Whirlpool Galaxy', coords: [13.2286, 47.1955], fov: 80 },
  { name: 'Pinwheel Galaxy', coords: [14.0372, 54.3482], fov: 80 },
  { name: 'Centaurus A', coords: [13.211, -43.0205], fov: 80 },
  { name: 'Messier 87', coords: [12.3912, 12.3912], fov: 80 },
  { name: 'Triangulum Galaxy', coords: [23.4622, 30.6602], fov: 80 },
  { name: 'Black Eye Galaxy', coords: [13.625, 42.5], fov: 80 },
  { name: 'Cigar Galaxy', coords: [14.0372, 54.3482], fov: 80 },
  { name: 'Sculptor Galaxy', coords: [23.4622, -25.295], fov: 80 },
]

const FreeExplore: React.FC<FreeExploreProps> = ({ aladinInstance, node }) => {
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

  useEffect(() => {
    // Dynamically inject CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/FreeExplore.css'
    link.id = 'free-explore-css'
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  useEffect(() => {
    if (aladinInstance && node.fovRange) {
      aladinInstance.setFoVRange(node.fovRange[0], node.fovRange[1])
    }
  }, [aladinInstance])

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 1000,
        }}
      >
        <MissionTracker
          title={title}
          catalogList={catalogList}
          gotoRaDec={(ra: number, dec: number) =>
            aladinInstance && aladinInstance?.gotoRaDec(ra, dec)
          }
          description={''}
        />
      </div>
    </div>
  )

  // return (
  // <div style={styles.questContainer}>
  //   <h2
  //     style={{
  //       ...styles.questTitle,
  //       opacity: showTitle ? 1 : 0,
  //       transform: showTitle ? 'translateX(0)' : 'translateX(-30px)',
  //       transition: 'all 0.6s ease-out',
  //     }}
  //   >
  //     {title}
  //   </h2>
  //   <div
  //     style={{
  //       ...styles.divider,
  //       width: showDivider ? '100%' : '0%',
  //       transition: 'width 0.8s ease-out',
  //     }}
  //   ></div>
  //   <div
  //     style={{
  //       display: 'flex',
  //       flexDirection: 'column',
  //       gap: '10px',
  //       opacity: showButtons ? 1 : 0,
  //       transform: showButtons ? 'translateY(0)' : 'translateY(10px)',
  //       transition: 'all 0.6s ease-out',
  //     }}
  //   >
  //     {catalogList.map((item, index) => (
  //       <button
  //         key={index}
  //         style={styles.catalogButton}
  //         onClick={() =>
  //           aladinInstance &&
  //           aladinInstance?.gotoRaDec(item.coords[0], item.coords[1])
  //         }
  //       >
  //         {item.name}
  //       </button>
  //     ))}
  //   </div>
  // </div>
  // )
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

import React, { useEffect, useState } from 'react'
import type { EyeNode, ZoomTutorialNode } from './SceneNode'
import type { AladinInstance } from '../../Aladin'
import './EyeOpen.css' // CSS com keyframes
import MissionTracker from '../../MissionTracker'
import Fireworks from '../../Fireworks/Fireworks'

interface ZoomTutorialProps {
  node: ZoomTutorialNode
  aladinInstance: AladinInstance | null
  onNext: () => void
}

const ZoomTutorial: React.FC<ZoomTutorialProps> = ({
  node,
  aladinInstance,
  onNext,
}) => {
  const [zoomIn, setZoomIn] = useState(true)
  const [missionCompleted, setMissionCompleted] = useState(false)
  useEffect(() => {
    // cria o <link> para o CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/ZoomTutorial.css' // caminho para o seu arquivo CSS
    link.id = 'zoom-tutorial-css' // opcional, para identificar depois
    document.head.appendChild(link)

    // cleanup: remove o CSS quando o componente desmonta
    return () => {
      document.head.removeChild(link)
    }
  }, [])

  useEffect(() => {
    if (aladinInstance && node.startingCoords) {
      aladinInstance.gotoRaDec(node.startingCoords.ra, node.startingCoords.dec)
    }
  }, [aladinInstance, node.startingCoords])

  useEffect(() => {
    if (!aladinInstance) return
    const checkFov = () => {
      const currentFov = aladinInstance.getFov()
      if (currentFov && currentFov[0] < 10) {
        setZoomIn(false)
      }

      if (!zoomIn && currentFov && currentFov[0] > 30) {
        console.log('Should call onNext')
        onNext()
      }
    }

    const interval = setInterval(checkFov, 500)

    return () => clearInterval(interval)
  }, [aladinInstance, zoomIn])

  return (
    <div>
      <div className="absolute bottom-auto top-10 right-10 left-auto flex flex-col items-center animate-pulse z-50 scroll-hint">
        <img
          src="/scroll-zoom2.gif"
          alt="Scroll to zoom"
          className="w-20 h-20"
        />
        {/* <p className="text-base text-white mt-3">
          Use the scroll or the buttons <br /> to zoom in and out to continue
        </p> */}
      </div>

      <MissionTracker
        title={zoomIn ? 'Zoom In' : 'Zoom Out'}
        description={`Use the scroll or the buttons to ${
          zoomIn ? 'zoom in' : 'zoom out'
        }`}
      />
      {missionCompleted && <Fireworks />}
    </div>
  )
}

export default ZoomTutorial

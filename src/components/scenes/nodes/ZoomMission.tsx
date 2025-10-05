import React, { useEffect } from 'react'
import type { ZoomMissionNode } from './SceneNode'
import type { AladinInstance } from '../../Aladin'
import './EyeOpen.css' // CSS com keyframes
import MissionTracker from '../../MissionTracker'

interface ZoomMissionProps {
  node: ZoomMissionNode
  aladinInstance: AladinInstance | null
  onNext: () => void
}

const ZoomMission: React.FC<ZoomMissionProps> = ({
  node,
  aladinInstance,
  onNext,
}) => {
  useEffect(() => {
    if (aladinInstance && node.fovRange) {
      aladinInstance.setFoVRange(node.fovRange[0], node.fovRange[1])
    }
    if (aladinInstance && node.startingCoords) {
      aladinInstance.gotoRaDec(node.startingCoords.ra, node.startingCoords.dec)
    }
  }, [aladinInstance, node.startingCoords])

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
    if (!aladinInstance) return

    const checkFov = () => {
      const currentFov = aladinInstance.getFov()

      if (currentFov && currentFov[0] < node.fovThreshold) {
        onNext()
      }
    }

    const interval = setInterval(checkFov, 500)

    return () => clearInterval(interval)
  }, [aladinInstance])

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
        title={'Zoom In'}
        description={'Use the scroll or the buttons to zoom in'}
      />
    </div>
  )
}

export default ZoomMission

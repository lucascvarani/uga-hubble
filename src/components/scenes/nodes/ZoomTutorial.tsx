import React, { useEffect, useState } from 'react'
import type { EyeNode, ZoomTutorialNode } from './SceneNode'
import type { AladinInstance } from '../../Aladin'
import './EyeOpen.css' // CSS com keyframes

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

  return (
    <div>
      <div className="absolute bottom-10 right-10 flex flex-col items-center animate-pulse z-50">
        <img
          src="/scroll-zoom.gif"
          alt="Scroll to zoom"
          className="w-16 h-16 opacity-90"
        />
        <p className="text-sm text-white mt-2">Use o scroll para dar zoom</p>
      </div>
    </div>
  )
}

export default ZoomTutorial

import React, { useEffect, useState } from 'react'
import type { EyeNode } from './SceneNode'
import type { AladinInstance } from '../../Aladin'
import './EyeOpen.css' // CSS com keyframes
import MusicManager from '../../../utils/MusicManager'

interface EyeProps {
  node: EyeNode
  aladinInstance: AladinInstance | null
  onNext: () => void
}

const Eye: React.FC<EyeProps> = ({ onNext, node }) => {
  const [animationFinished] = useState(false)

  const [showingTitleEra, setShowingTitleEra] = useState(false)

  useEffect(() => {
    // cria o <link> para o CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/Eye.css' // caminho para o seu arquivo CSS
    link.id = 'eye-css' // opcional, para identificar depois
    document.head.appendChild(link)

    MusicManager.getInstance().playSoundEffect('/audio/yawn.mp3', 0.7)

    // cleanup: remove o CSS quando o componente desmonta
    return () => {
      document.head.removeChild(link)
    }
  }, [])

  function showTitleEra() {
    setShowingTitleEra(true)
    setTimeout(() => {
      setShowingTitleEra(false)
      onNext()
    }, 3000)
  }

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden">
      {/* Conteúdo por trás */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          animationFinished ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>

      {/* Pálpebras */}
      {!animationFinished && (
        <>
          <div
            className="absolute top-0 left-0 w-full h-1/2 bg-gray-700/80 backdrop-blur-sm rounded-b-none animate-top-lid z-50"
            onAnimationEnd={() => showTitleEra()}
          ></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gray-700/80 backdrop-blur-sm rounded-tr-none animate-bottom-lid z-50"></div>
        </>
      )}
      {showingTitleEra && (
        <div className="text-white absolute items-center justify-center flex w-full h-full flex-col">
          <p className="text-8xl mb-12">{node.title}</p>
          <p className="text-7xl">{node.time}</p>
        </div>
      )}
    </div>
  )
}

export default Eye

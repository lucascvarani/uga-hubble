import React, { useEffect } from 'react'
import type { EyeNode } from './SceneNode'
import type { AladinInstance } from '../../Aladin'

interface EyeProps {
  node: EyeNode
  aladinInstance: AladinInstance | null
  onNext: () => void
}

const Eye: React.FC<EyeProps> = ({ node, aladinInstance, onNext }) => {
  useEffect(() => {
    // cria o <link> para o CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/Eye.css' // caminho para o seu arquivo CSS
    link.id = 'eye-css' // opcional, para identificar depois
    document.head.appendChild(link)

    // cleanup: remove o CSS quando o componente desmonta
    return () => {
      document.head.removeChild(link)
    }
  }, [])

  return (
    <div className="bg-white" onClick={onNext}>
      Click to go to next
    </div>
  )
}

export default Eye

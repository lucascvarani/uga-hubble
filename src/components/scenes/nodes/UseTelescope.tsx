import { useEffect } from 'react'
import MusicManager from '../../../utils/MusicManager'

interface UseTelescopeUIProps {
  onNext: () => void
}

const UseTelescope: React.FC<UseTelescopeUIProps> = ({ onNext }) => {
  useEffect(() => {
    // cria o <link> para o CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/UseTelescope.css' // caminho para o seu arquivo CSS
    link.id = 'use-telescope-css' // opcional, para identificar depois
    document.head.appendChild(link)

    // cleanup: remove o CSS quando o componente desmonta
    return () => {
      document.head.removeChild(link)
    }
  }, [])

  return (
    <div
      onClick={() => {
        MusicManager.getInstance().playSoundEffect('/audio/equip.mp3', 1.0)
        onNext()
      }}
      className="absolute inset-0 m-auto w-32 h-12 bg-white rounded-lg flex items-center justify-center cursor-pointer shadow-md"
    >
      Use Telescope
    </div>
  )
}

export default UseTelescope

import { useEffect, useRef } from 'react'
import MusicManager from '../../../utils/MusicManager'
import type { PlayMusicNode } from './SceneNode'

interface PlayMusicProps {
  node: PlayMusicNode
  onNext: () => void
}

const PlayMusic: React.FC<PlayMusicProps> = ({ node, onNext }) => {
  const hasExecuted = useRef(false)
  useEffect(() => {
    if (hasExecuted.current) return
    const musicManager = MusicManager.getInstance()
    if (musicManager.getCurrentTrack() != node.audio) {
      if (musicManager.isPlaying()) {
        console.log('Music is already playing, I will fade out')
        musicManager.fadeOut().then(() => {
          musicManager.playTrack(node.audio, node.volume, true)
        })
      } else {
        musicManager.playTrack(node.audio, node.volume, true)
      }
    }
    hasExecuted.current = true
    onNext()
  }, [node.audio, node.volume, onNext])
  return null
}

export default PlayMusic

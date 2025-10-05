import React, { useEffect, useRef } from 'react'
import Dialog from './nodes/Dialog'
import MissionTracker from '../MissionTracker'
import MusicManager from '../../utils/MusicManager'

interface AladinInstance {
  on: (event: string, callback: (...args: unknown[]) => void) => void
}

interface EncontrarNorteProps {
  aladinInstance: AladinInstance | null
  onComplete: () => void
}

export default function EncontrarNorte({
  aladinInstance,
  onComplete,
}: EncontrarNorteProps) {
  const [sceneState, setSceneState] = React.useState(0)
  const clickHandlerRef = useRef<((...args: unknown[]) => void) | null>(null)
  const dialogs1 = ['Onde está o norte?', 'O norte está ali!']
  const dialogs2 = ['O que você vê?', 'Eu vejo uma árvore.']

  // Initialize music when component mounts
  useEffect(() => {
    const musicManager = MusicManager.getInstance()

    // Start playing background music for this scene
    try {
      musicManager.playTrack(
        '/audio/evening-sound-effect-in-village-348670.mp3',
        0.3,
        true
      )
    } catch (error) {
      console.warn('Could not load background music:', error)
    }

    // Cleanup: fade out music when component unmounts
    return () => {
      musicManager.fadeOut(1000) // 1 second fade out
    }
  }, [])

  useEffect(() => {
    if (aladinInstance) {
      const clickHandler = () => {
        onClick()
      }

      clickHandlerRef.current = clickHandler
      aladinInstance.on('click', clickHandler)
    }
  }, [aladinInstance, onClick])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function onClick() {
    // Dialog will handle its own progression, we just handle scene transitions
    // This will be called by the Aladin map clicks if needed
  }

  const handleDialogFinish = () => {
    const musicManager = MusicManager.getInstance()

    // Ensure music is playing after user interaction (for browser autoplay restrictions)
    if (!musicManager.isPlaying()) {
      try {
        musicManager.playTrack(
          '/audio/evening-sound-effect-in-village-348670.mp3',
          0.3,
          true
        )
      } catch (error) {
        console.warn(
          'Could not load background music after user interaction:',
          error
        )
      }
    }

    // Move to next scene state
    setSceneState((prevState) => {
      const nextState = prevState + 1
      if (nextState > 1) {
        onComplete()
      }
      return nextState
    })
  }

  return (
    <div>
      {/* Mission Tracker positioned in top left */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 1000,
        }}
      >
        <MissionTracker
          title={'Encontrar o Norte'}
          description={'Ajude Aladim a encontrar o norte!'}
        />
      </div>

      {/* Dialog positioned in center bottom */}
      {sceneState === 0 && (
        <div>
          <Dialog text={dialogs1} onFinish={handleDialogFinish} />
        </div>
      )}
      {sceneState === 1 && (
        <div>
          <Dialog text={dialogs2} onFinish={handleDialogFinish} />
        </div>
      )}
    </div>
  )
}

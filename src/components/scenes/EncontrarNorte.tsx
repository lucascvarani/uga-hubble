import React, { useEffect, useRef } from 'react'
import Dialog from '../Dialog'
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
  const [currentDialogIndex, setCurrentDialogIndex] = React.useState(0)
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
    if (currentDialogIndex < dialogs1.length - 1) {
      return
    }
    setCurrentDialogIndex(0)
    setSceneState((prevState) => {
      return prevState + 1
    })
    if (sceneState === 2) {
      onComplete()
    }
  }

  const handleNextDialog = () => {
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

    if (
      currentDialogIndex <
      (sceneState === 0 ? dialogs1 : dialogs2).length - 1
    ) {
      setCurrentDialogIndex(currentDialogIndex + 1)
    }
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
          <Dialog
            text={dialogs1[currentDialogIndex]}
            onNext={handleNextDialog}
            newDialog={currentDialogIndex === 0}
          />
        </div>
      )}
      {sceneState === 1 && (
        <div>
          <Dialog
            text={dialogs2[currentDialogIndex]}
            onNext={handleNextDialog}
            newDialog={currentDialogIndex === 0}
          />
        </div>
      )}
    </div>
  )
}

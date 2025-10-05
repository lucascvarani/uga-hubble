import { useState } from 'react'
import './App.css'
import Aladin from './components/Aladin'
import Scene from './components/scenes/Scene'
import { medievalNodes } from './NodesConfig'
import FireMenu from './screens/Intro'
import SoundWarning from './screens/SoundWarning'
import Galaxies from './components/scenes/Galaxies'
import { ugaNodes } from './components/scenes/S1Uga'

function App() {
  const [aladinInstance, setAladinInstance] = useState(null)
  const [sceneNumber, setSceneNumber] = useState<number>(1)
  const [showSoundWarning, setShowSoundWarning] = useState(true)
  const [showIntro, setShowIntro] = useState(true)

  // Show sound warning first
  if (showSoundWarning) {
    return <SoundWarning onProceed={() => setShowSoundWarning(false)} />
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Full screen Aladin */}
      <div
        id="aladin-app-container invisible"
        style={{ width: '100%', height: '100%' }}
      >
        <Aladin setAladinInstance={setAladinInstance} />
      </div>

      {showIntro ? (
        <FireMenu onStart={() => setShowIntro(false)} />
      ) : (
        /* Scene overlay - Full Screen */
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          <div style={{ pointerEvents: 'auto' }}>
            {(() => {
              switch (sceneNumber) {
                case 0:
                  return (
                    <Scene
                      aladinInstance={aladinInstance}
                      nodes={ugaNodes}
                      onSceneEnd={() =>
                        setSceneNumber((previous) => previous + 1)
                      }
                    />
                  )
                case 1:
                  return (
                    <Scene
                      aladinInstance={aladinInstance}
                      nodes={medievalNodes}
                      onSceneEnd={() =>
                        setSceneNumber((previous) => previous + 1)
                      }
                    />
                  )
                case 9:
                  return (
                    <Galaxies
                      aladinInstance={aladinInstance}
                      onComplete={() =>
                        setSceneNumber((previous) => previous + 1)
                      }
                    />
                  )
                default:
                  return null
              }
            })()}
          </div>
        </div>
      )}
    </div>
  )
}

export default App

import { useState, useRef } from 'react'
import './App.css'
import Aladin from './components/Aladin'
import Scene from './components/scenes/Scene'
import FireMenu from './screens/Intro'
import SoundWarning from './screens/SoundWarning'
import Galaxies from './components/scenes/Galaxies'
import { ugaNodes } from './components/scenes/S1Uga'
import Telescope, { type TelescopeHandle } from './components/Telescope'
import { wakeMedievalNodes } from './components/scenes/S2WakeMedieval'

function App() {
  const [aladinInstance, setAladinInstance] = useState(null)
  const [sceneNumber, setSceneNumber] = useState<number>(0)
  const [showSoundWarning, setShowSoundWarning] = useState(true)
  const [showIntro, setShowIntro] = useState(true)
  const telescopeRef = useRef<TelescopeHandle>(null)

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
        /* Telescope Overlay - positioned above Aladin but below UI */
        <>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none', // Allow clicks to pass through to elements behind
              zIndex: 5, // Below UI but above Aladin
            }}
          >
            <Telescope ref={telescopeRef} />
          </div>
          {/* Scene overlay - Full Screen */}
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
                        nodes={wakeMedievalNodes}
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
        </>
      )}
    </div>
  )
}

export default App

import { useState, useRef } from 'react'
import './App.css'
import Aladin from './components/Aladin'
import Scene from './components/scenes/Scene'
import { medievalNodes } from './NodesConfig'
import FireMenu from './screens/Intro'
import SoundWarning from './screens/SoundWarning'
import { ugaNodes } from './components/scenes/S1Uga'
import { galaxiesNodes } from './components/scenes/S3Galaxies'
import Telescope, { type TelescopeHandle } from './components/Telescope'

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

  // Then show intro
  if (showIntro) {
    return <FireMenu onStart={() => setShowIntro(false)} />
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
      <div style={{ width: '100%', height: '100%' }}>
        <Aladin setAladinInstance={setAladinInstance} />
      </div>

      {/* Telescope Overlay - positioned above Aladin but below UI */}
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
                    nodes={medievalNodes}
                    onSceneEnd={() =>
                      setSceneNumber((previous) => previous + 1)
                    }
                  />
                )
              case 2:
                return (
                  <Scene
                    aladinInstance={aladinInstance}
                    nodes={galaxiesNodes}
                    onSceneEnd={() =>
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
    </div>
  )
}

export default App

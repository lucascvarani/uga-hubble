import React, { useEffect, useRef } from 'react'
import MissionTracker from '../MissionTracker'
import Dialog from './nodes/Dialog'
import Quizz from '../Quizz'

interface GalaxiesProps {
  aladinInstance: any | null
  onComplete: () => void
}

const dialogs = [
  ['Esta é a galáxia de andrômeda.', 'Ela é uma galáxia espiral.'],
  [
    'Esta á A Grande Galáxia Barrada.',
    'Como o próprio nome já diz, ela é uma galáxia do tipo Espiral Barrada.',
  ],
  [
    'Galáxia gigante elíptica no aglomerado de Virgem',
    'É uma galáxia elíptica',
  ],
  [
    'Esta é Bode’s Galaxy',
    'Você poderia nos ajuda a definir qual é o tipo desta galáxia?',
  ],
]

const aladinProps = [
  {
    objectName: 'M31',
    fov: 4.8,
    icrsdx: 10.6847083,
    icrsdy: 41.26875,
  },
  {
    objectName: 'NGC 1365',
    fov: 0.7,
  },
  {
    objectName: 'M87',
    fov: 0.3,
  },
  {
    objectName: 'M81',
    fov: 0.6,
  },
]

export default function Galaxies({
  aladinInstance,
  onComplete,
}: GalaxiesProps) {
  const [sceneState, setSceneState] = React.useState(0)
  const [currentDialogIndex, setCurrentDialogIndex] = React.useState(0)
  const [currentAladinProps, setCurrentAladinProps] = React.useState(0)
  const [wasRightAnswer, setWasRightAnswer] = React.useState(false)
  const clickHandlerRef = useRef<((...args: unknown[]) => void) | null>(null)

  useEffect(() => {
    if (aladinInstance) {
      const clickHandler = () => {
        onClickScreen()
      }

      clickHandlerRef.current = clickHandler
      aladinInstance.on('click', clickHandler)
    }
  }, [aladinInstance, onClickScreen])

  useEffect(() => {
    if (aladinInstance) {
      aladinInstance.gotoObject(aladinProps[currentAladinProps].objectName)
      aladinInstance.setFov(aladinProps[currentAladinProps].fov)
    }
  }, [aladinInstance, currentAladinProps])

  useEffect(() => {
    console.log('comecou quizz')
    if (sceneState == 1) {
    } else if (sceneState === 3) {
      onComplete()
    }
  }, [aladinInstance, sceneState])

  function goToNextObject() {
    setCurrentDialogIndex(0)
    console.log(currentAladinProps)
    if (currentAladinProps <= 2) {
      setCurrentAladinProps((prev) => prev + 1)
    } else {
      setSceneState((prevState) => {
        console.log('Advancing to quizz', prevState)
        return prevState + 1
      })
    }
  }

  function onClickRightAnswer() {
    setWasRightAnswer(true)
    setSceneState(2)
  }

  function onClickWrongAnswer() {
    setWasRightAnswer(false)
    setSceneState(2)
  }

  function onClickScreen() {
    if (currentDialogIndex == dialogs[currentAladinProps].length - 1) {
      goToNextObject()
    } else {
      setCurrentDialogIndex((prev) => prev + 1)
    }
  }

  return (
    <>
      {sceneState == 0 && (
        <div
          className="bg-white w-fit"
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            zIndex: 1000,
          }}
        >
          <div>
            <Dialog
              text={dialogs[currentAladinProps][currentDialogIndex]}
              onNext={onClickScreen}
              newDialog={currentDialogIndex === 0}
            />
          </div>
        </div>
      )}
      {sceneState == 1 && (
        <div>
          <MissionTracker
            title={'Desvendando galáxias'}
            description={
              'Ajude Aladim a descobrir qual é o tipo da galáxia de Andrômeda!'
            }
          />
          <Quizz
            title={'Qual tipo de galáxia é este?'}
            options={[
              'Galáxia Espiral',
              'Galáxia Espiral Barrada',
              'Galáxia Elíptica',
              'Galáxia Irregular',
              'Galáxia Lenticular',
            ]}
            onClickOption={(option: number) => {
              if (option == 2) onClickRightAnswer()
              else onClickWrongAnswer()
            }}
          />
        </div>
      )}
      {sceneState == 2 && (
        <div>
          <Dialog
            text={wasRightAnswer ? 'Resposta correta!' : 'Resposta errada!'}
            onNext={onComplete}
            newDialog={currentDialogIndex === 0}
          />
        </div>
      )}
    </>
  )
}

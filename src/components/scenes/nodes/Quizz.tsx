import React, { useState, useEffect } from 'react'
import MissionTracker from '../../MissionTracker'
import Dialog from './Dialog'
import type { QuizzNode } from './SceneNode'

interface QuizzUIProps {
  node: QuizzNode
  onNext: () => void
}

const Quizz: React.FC<QuizzUIProps> = ({ node, onNext }) => {
  const [sceneState, setSceneState] = React.useState(0)
  const [wasRightAnswer, setWasRightAnswer] = React.useState(false)

  function onClickOption(index: number) {
    if (index == node.rightOption) {
      setWasRightAnswer(true)
      setSceneState(1)
    } else {
      setWasRightAnswer(false)
      setSceneState(1)
    }
  }

  return (
    <>
      {sceneState == 0 && (
        <div>
          <MissionTracker title={node.title} description={node.description} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
            }}
          >
            <h2 style={{ marginBottom: '10px', backgroundColor: 'white' }}>
              {node.question}
            </h2>

            {node.options.map((texto, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onClickOption(index)}
                style={{ backgroundColor: 'white' }}
              >
                {texto}
              </button>
            ))}
          </div>
        </div>
      )}
      {sceneState == 1 && (
        <div>
          <Dialog
            text={wasRightAnswer ? node.textRightOption : node.textWrongOption}
            onFinish={onNext}
          />
        </div>
      )}
    </>
  )
}

export default Quizz

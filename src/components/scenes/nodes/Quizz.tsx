import React from 'react'
import MissionTracker from '../../MissionTracker'
import Dialog from './Dialog'
import type { QuizzNode } from './SceneNode'

interface QuizzUIProps {
  node: QuizzNode
  onNext: () => void
}

const Quizz: React.FC<QuizzUIProps> = ({ node, onNext }) => {
  const [sceneState, setSceneState] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [wasRightAnswer, setWasRightAnswer] = useState(false)

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/Quizz.css'
    link.id = 'quizz-css'
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  function onClickOption(index: number) {
    setSelectedOption(index)
    const isRight = index === node.rightOption
    setWasRightAnswer(isRight)
    setTimeout(() => setSceneState(1), 300)
  }

  return (
    <>
      {sceneState === 0 && (
        <div className="w-full h-full">
          <MissionTracker title={node.title} description={node.description} />

          <div className="flex flex-col gap-2 absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white text-left max-w-sm">
            <div className="flex flex-col items-center">
              <h2 className="text-lg mb-1">{node.question}</h2>
              <div className="border-b-[1px] bg-white w-[90%] mb-2" />
            </div>

            {node.options.map((texto, index) => {
              return (
                <div
                  key={index}
                  onClick={() => onClickOption(index)}
                  className={`group cursor-pointer px-3 rounded-md flex items-center text-base opacity-70 transition-colors hover:opacity-100`}
                >
                  {/* Diamante muda no hover */}
                  <span className="text-white mr-2">
                    <span className="invisible group-hover:hidden">◆</span>
                    <span className="hidden group-hover:block">◆</span>
                  </span>
                  {texto}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {sceneState === 1 && (
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

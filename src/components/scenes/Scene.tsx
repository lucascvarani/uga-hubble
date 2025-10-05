import React, { useState } from 'react'
import Dialog from './nodes/Dialog'
import FindMission from './nodes/FindMission'
import Quizz from './nodes/Quizz'
import CompleteConstellationMission from './nodes/CompleteConstellationMission'
import type {
  SceneNode,
  DialogNode,
  FindPosNode,
  CompleteConstellationNode,
  EyeNode,
  QuizzNode,
} from './nodes/SceneNode'
import type { AladinInstance } from '../Aladin'
import Eye from './nodes/Eye'

interface SceneProps {
  nodes: SceneNode[]
  aladinInstance: AladinInstance | null
  onSceneEnd?: () => void
}

const Scene: React.FC<SceneProps> = ({ nodes, aladinInstance, onSceneEnd }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNextNode = () => {
    if (currentIndex < nodes.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      onSceneEnd?.()
    }
  }

  const currentNode = nodes[currentIndex]

  switch (currentNode.type) {
    case 'dialog':
      return (
        <Dialog
          text={(currentNode as DialogNode).text}
          onFinish={handleNextNode}
        />
      )
    case 'find':
      return (
        <FindMission
          node={currentNode as FindPosNode}
          aladinInstance={aladinInstance}
          onNext={handleNextNode}
        />
      )
    case 'constellation':
      return (
        <CompleteConstellationMission
          node={currentNode as CompleteConstellationNode}
          aladinInstance={aladinInstance}
          onNext={handleNextNode}
        />
      )
    case 'eye':
      return (
        <Eye
          node={currentNode as EyeNode}
          aladinInstance={aladinInstance}
          onNext={handleNextNode}
        />
      )
    case 'quizz':
      return (
        <Quizz
          node={currentNode as QuizzNode}
          onNext={handleNextNode}
        />
      )
    default:
      return null
  }
}

export default Scene

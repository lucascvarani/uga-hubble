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
import UseTelescope from './nodes/UseTelescope'

interface SceneProps {
  nodes: SceneNode[]
  aladinInstance: AladinInstance | null
  onSceneEnd?: () => void
}

function animateToTarget(
  aladin: AladinInstance,
  fromRa: number,
  fromDec: number,
  targetRa: number,
  targetDec: number,
  duration = 1000, // total duration in ms
  onComplete?: () => void
) {
  if (!aladin) return;

  const container = document.getElementById("aladin-lite-div");
  if (container) container.style.pointerEvents = "none"; // disable interaction

  const startTime = Date.now();
  const intervalMs = 30;

  const timer = setInterval(() => {
    const elapsed = Date.now() - startTime;
    let t = Math.max(0, Math.min(elapsed / duration, 1));

    // ease-in-out
    const ease = 0.5 - 0.5 * Math.cos(Math.PI * t);

    const ra = fromRa + (targetRa - fromRa) * ease;
    const dec = fromDec + (targetDec - fromDec) * ease;

    aladin.gotoRaDec(ra, dec);

    if (t >= 1) {
      clearInterval(timer);
      if (container) container.style.pointerEvents = "auto"; // re-enable interaction
      onComplete?.();
    }
  }, intervalMs);
}

const Scene: React.FC<SceneProps> = ({ nodes, aladinInstance, onSceneEnd }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNextNode = () => {
    if (currentIndex < nodes.length - 1) {
      setCurrentIndex(currentIndex + 1)
      const currentRaDec = aladinInstance?.getRaDec();

      const nextIndex = currentIndex + 1
      if (nodes[nextIndex].startingCoords && currentRaDec) {
        if (nodes[nextIndex].startingCoords.shouldSnap) {
          aladinInstance?.gotoRaDec(nodes[nextIndex].startingCoords.ra, nodes[nextIndex].startingCoords.dec);
        }
        else {
        // aladinInstance?.gotoRaDec(nodes[currentIndex].startingCoords.ra, nodes[currentIndex].startingCoords.dec);
        animateToTarget(
          aladinInstance!,
          currentRaDec[0],
          currentRaDec[1],
          nodes[nextIndex].startingCoords.ra,
          nodes[nextIndex].startingCoords.dec,
          1000
        );
      }
      }
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
    case 'use_telescope':
      return <UseTelescope onNext={handleNextNode} />
    default:
      return null
  }
}

export default Scene

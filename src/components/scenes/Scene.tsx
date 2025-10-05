import React, { useEffect, useState } from 'react'
import Dialog from './nodes/Dialog'
import FindMission from './nodes/FindMission'
import Quizz from './nodes/Quizz'
import type {
  SceneNode,
  DialogNode,
  FindPosNode,
  EyeNode,
  ZoomTutorialNode,
  PlayMusicNode,
  QuizzNode,
  FadeOutNode,
  ZoomMissionNode,
} from './nodes/SceneNode'
import type { AladinInstance } from '../Aladin'
import Eye from './nodes/Eye'
import UseTelescope from './nodes/UseTelescope'
import ZoomTutorial from './nodes/ZoomTutorial'
import ZoomMission from './nodes/ZoomMission'
import PlayMusic from './nodes/PlayMusic'
import FadeOut from './nodes/FadeOut'

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
  if (!aladin) return

  const container = document.getElementById('aladin-lite-div')
  if (container) container.style.pointerEvents = 'none' // disable interaction

  const startTime = Date.now()
  const intervalMs = 30

  const timer = setInterval(() => {
    const elapsed = Date.now() - startTime
    let t = Math.max(0, Math.min(elapsed / duration, 1))

    // ease-in-out
    const ease = 0.5 - 0.5 * Math.cos(Math.PI * t)

    const ra = fromRa + (targetRa - fromRa) * ease
    const dec = fromDec + (targetDec - fromDec) * ease

    aladin.gotoRaDec(ra, dec)

    if (t >= 1) {
      clearInterval(timer)
      if (container) container.style.pointerEvents = 'auto' // re-enable interaction
      onComplete?.()
    }
  }, intervalMs)
}

function animateToTargetFov(
  aladin: AladinInstance,
  fromFov: number,
  targetFov: number,
  duration = 1000, // total duration in ms
  onComplete?: () => void
) {
  if (!aladin) return

  const container = document.getElementById('aladin-lite-div')
  if (container) container.style.pointerEvents = 'none' // disable interaction

  const startTime = Date.now()
  const intervalMs = 30

  const timer = setInterval(() => {
    const elapsed = Date.now() - startTime
    let t = Math.max(0, Math.min(elapsed / duration, 1))

    // ease-in-out
    const ease = 0.5 - 0.5 * Math.cos(Math.PI * t)

    const fov = fromFov + (targetFov - fromFov) * ease
    aladin.setFov(fov)

    if (t >= 1) {
      clearInterval(timer)
      if (container) container.style.pointerEvents = 'auto' // re-enable interaction
      onComplete?.()
    }
  }, intervalMs)
}

const Scene: React.FC<SceneProps> = ({ nodes, aladinInstance, onSceneEnd }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const currentRaDec = aladinInstance?.getRaDec()
    const nextIndex = 0
    if (nodes[nextIndex].startingCoords && currentRaDec) {
      if (nodes[nextIndex].startingCoords.shouldSnap) {
        aladinInstance?.gotoRaDec(
          nodes[nextIndex].startingCoords.ra,
          nodes[nextIndex].startingCoords.dec
        )
      } else {
        animateToTarget(
          aladinInstance!,
          currentRaDec[0],
          currentRaDec[1],
          nodes[nextIndex].startingCoords.ra,
          nodes[nextIndex].startingCoords.dec,
          1000
        )
      }
    }
  }, [])

  const handleNextNode = () => {
    if (currentIndex < nodes.length - 1) {
      setCurrentIndex(currentIndex + 1)
      const currentRaDec = aladinInstance?.getRaDec()
      const currentFov = aladinInstance?.getFov()

      const nextIndex = currentIndex + 1
      if (nodes[nextIndex].startingCoords && currentRaDec && currentFov) {
        if (nodes[nextIndex].startingCoords.shouldSnap) {
          aladinInstance?.setFov(nodes[nextIndex].startingCoords.fov);
          aladinInstance?.gotoRaDec(
            nodes[nextIndex].startingCoords.ra,
            nodes[nextIndex].startingCoords.dec
          )
        } else {
          animateToTargetFov(
            aladinInstance!,
            currentFov[0],
            nodes[nextIndex].startingCoords.fov,
            1000
          )
          // aladinInstance?.gotoRaDec(nodes[currentIndex].startingCoords.ra, nodes[currentIndex].startingCoords.dec);
          animateToTarget(
            aladinInstance!,
            currentRaDec[0],
            currentRaDec[1],
            nodes[nextIndex].startingCoords.ra,
            nodes[nextIndex].startingCoords.dec,
            1000
          )
        }
      }
    } else {
      setCurrentIndex(0)
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
    case 'eye':
      return (
        <Eye
          node={currentNode as EyeNode}
          aladinInstance={aladinInstance}
          onNext={handleNextNode}
        />
      )
    case 'quizz':
      return <Quizz node={currentNode as QuizzNode} onNext={handleNextNode} />
    case 'use_telescope':
      return <UseTelescope onNext={handleNextNode} />

    case 'zoom_tutorial':
      return (
        <ZoomTutorial
          node={currentNode as ZoomTutorialNode}
          aladinInstance={aladinInstance}
          onNext={handleNextNode}
        />
      )
    case 'zoom_mission':
      return (
        <ZoomMission
          node={currentNode as ZoomMissionNode}
          aladinInstance={aladinInstance}
          onNext={handleNextNode}
        />
      )
    case 'music':
      return (
        <PlayMusic
          node={currentNode as PlayMusicNode}
          onNext={handleNextNode}
        />
      )
    case 'fade_out':
      return (
        <FadeOut
          onNext={handleNextNode}
          duration={(currentNode as FadeOutNode).duration}
        />
      )
    default:
      return null
  }
}

export default Scene

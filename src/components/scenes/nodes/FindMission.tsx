import React, { useEffect, useState } from 'react'
import type { FindPosNode } from './SceneNode'
import type { AladinInstance } from '../../Aladin'
import MissionTracker from '../../MissionTracker'
import Compass from '../../Compass'

interface FindMissionProps {
  node: FindPosNode
  aladinInstance: AladinInstance | null
  onNext: () => void
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

const FindMission: React.FC<FindMissionProps> = ({
  node,
  aladinInstance,
  onNext,
}) => {
  const [currentCoords, setCurrentCoords] = useState<{
    ra: number
    dec: number
  }>({ ra: 0, dec: 0 })

  function degToRad(deg: number) {
    return deg * (Math.PI / 180);
  }

  function angularDistanceInArcSeconds(ra1: number, dec1: number, ra2: number, dec2: number): number {
    // Convert to radians
    const ra1Rad = degToRad(ra1);
    const dec1Rad = degToRad(dec1);
    const ra2Rad = degToRad(ra2);
    const dec2Rad = degToRad(dec2);

    // Spherical distance formula
    const sinDec1 = Math.sin(dec1Rad);
    const sinDec2 = Math.sin(dec2Rad);
    const cosDec1 = Math.cos(dec1Rad);
    const cosDec2 = Math.cos(dec2Rad);
    const deltaRA = ra2Rad - ra1Rad;
    const cosDeltaRA = Math.cos(deltaRA);

    const angle = Math.acos(sinDec1 * sinDec2 + cosDec1 * cosDec2 * cosDeltaRA);

    // Convert back to degrees
    return angle * (180 / Math.PI);
  }

  const isNearTarget = (
    raClick: number,
    decClick: number,
    target: { ra: number; dec: number },
    toleranceDeg: number
  ) => {
    return angularDistanceInArcSeconds(raClick, decClick, target.ra, target.dec) <= toleranceDeg;
  }

  useEffect(() => {
    if (!aladinInstance) return

    // if (node.survey) {
    //   aladinInstance.setImageSurvey(node.survey);
    // }

    if (node.startingCoords) {
      // aladinInstance.gotoRaDec(node.startingCoords.ra, node.startingCoords.dec);
    }

    let completed = false
    aladinInstance.on('positionChanged', (e: any) => {
      if (completed) return // flag prevents multiple triggers

      const ra = e.ra
      const dec = e.dec

      setCurrentCoords({ ra, dec })
      if (isNearTarget(ra, dec, node.targetCoords, node.tolerance)) {
        completed = true

        animateToTarget(
          aladinInstance!,
          ra,
          dec,
          node.targetCoords.ra,
          node.targetCoords.dec,
          node.interpolationDuration ?? 1000, // duration in ms
          () => {
            // Finally call onNext after animation completes
            onNext()
          }
        )
      }
      console.log('positionChanged', ra, dec)
    })

    return () => {}
  }, [node])

  return (
    <>
      <div className="absolute right-0 bottom-0">
        <Compass
          aladinInstance={aladinInstance}
          current_x={currentCoords.ra}
          current_y={currentCoords.dec}
          target_x={node.targetCoords.ra}
          target_y={node.targetCoords.dec}
        />
      </div>
      <MissionTracker title={node.title} description={node.description} />
    </>
  )
}

export default FindMission

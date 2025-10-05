import React, { useEffect, useState } from "react";
import type { FindPosNode } from "./SceneNode";
import type { AladinInstance } from "../../Aladin";
import MissionTracker from "../../MissionTracker";

interface FindMissionProps {
  node: FindPosNode;
  aladinInstance: AladinInstance | null;
  onNext: () => void;
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



const FindMission: React.FC<FindMissionProps> = ({ node, aladinInstance, onNext }) => {
  const isNearTarget = (
    raClick: number,
    decClick: number,
    target: { ra: number; dec: number },
    toleranceDeg: number
  ) => {
    const raDiff = Math.abs(raClick - target.ra);
    const decDiff = Math.abs(decClick - target.dec);
    return raDiff <= toleranceDeg && decDiff <= toleranceDeg;
  };

  useEffect(() => {
    if (!aladinInstance) return;

    // if (node.survey) {
    //   aladinInstance.setImageSurvey(node.survey);
    // }

    if (node.startingCoords) {
      // aladinInstance.gotoRaDec(node.startingCoords.ra, node.startingCoords.dec);
    }

    aladinInstance.setFov(node.fov);

    let completed = false;
    aladinInstance.on("positionChanged", (e: any) => {
      if (completed) return; // flag prevents multiple triggers

      const ra = e.ra;
      const dec = e.dec;
      if (isNearTarget(ra, dec, node.targetCoords, node.tolerance)) {
        completed = true;

        animateToTarget(
          aladinInstance!,
          ra,
          dec,
          node.targetCoords.ra,
          node.targetCoords.dec,
          node.interpolationDuration ?? 1000, // duration in ms
          () => {
            // Finally call onNext after animation completes
            onNext();
          }
        );
      }
      console.log("positionChanged", ra, dec)
    });

    return () => {};
  }, []);

  return (
      <MissionTracker
        title={node.title}
        description={node.description}
      />
    );;
};

export default FindMission;

import React, { useEffect, useState } from "react";
import type { FindPosNode } from "./SceneNode";
import type { AladinInstance } from "../../Aladin";

interface FindMissionProps {
  node: FindPosNode;
  aladinInstance: AladinInstance | null;
  onNext: () => void;
}

const FindMission: React.FC<FindMissionProps> = ({ node, aladinInstance, onNext }) => {
  const [listenerAdded, setListenerAdded] = useState(false);

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

    if (node.survey) {
      aladinInstance.setImageSurvey(node.survey);
    }

    if (node.startingCoords) {
      aladinInstance.gotoRaDec(node.startingCoords.ra, node.startingCoords.dec);
    }

    aladinInstance.setFov(node.fov);

    const tolerance = node.tolerance;

    const handleClick = (evt: any) => {
      if (evt.isDragging) return;

      const coords = [evt.ra, evt.dec];
      if (!coords) return;

      const raDiff = coords[0] - node.targetCoords.ra;
      const decDiff = coords[1] - node.targetCoords.dec;

      // Log the click info
      console.log(
        `[FindMission] Click at RA: ${coords[0].toFixed(2)}, Dec: ${coords[1].toFixed(
          2
        )} | Target RA: ${node.targetCoords.ra}, Dec: ${node.targetCoords.dec} | Delta RA: ${raDiff.toFixed(
          2
        )}, Delta Dec: ${decDiff.toFixed(2)}`
      );

      if (isNearTarget(coords[0], coords[1], node.targetCoords, tolerance)) {
        alert("Target found!");
        onNext();
      } else {
        alert("Try again!");
      }
    };

    aladinInstance.on("click", handleClick);

    return () => {};
  }, [aladinInstance, node, listenerAdded, onNext]);

  return null;
};

export default FindMission;

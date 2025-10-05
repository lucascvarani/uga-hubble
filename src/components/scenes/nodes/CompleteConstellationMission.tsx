import React, { useEffect } from "react";
import FindMission from "./FindMission";
import type { AladinInstance } from "../../Aladin";
import type { CompleteConstellationNode } from "./SceneNode";

interface CompleteConstellationMissionProps {
  node: CompleteConstellationNode;
  aladinInstance: AladinInstance | null;
  onNext: () => void;
}

const CompleteConstellationMission: React.FC<CompleteConstellationMissionProps> = ({
  node,
  aladinInstance,
  onNext,
}) => {
  useEffect(() => {
    if (!aladinInstance || !window.A) return;
    const A = window.A; // global Aladin API

    // Create overlay for constellation
    const overlay = A.graphicOverlay({
      color: "#00ffff",
      lineWidth: 2,
    });
    aladinInstance.addOverlay(overlay);

    // Draw each line
    node.constellation.lines.forEach((lineCoords) => {
      overlay.add(A.polyline(lineCoords));
    });

    // Optionally mark stars
    // node.constellation.stars.forEach((star) => {
    //   overlay.add(A.circle([star.ra, star.dec], 0.3, { color: "yellow" }));
    //   if (star.name) {
    //     overlay.add(A.label([star.ra, star.dec], star.name, {
    //       color: "white",
    //       fontSize: "10px",
    //       anchor: "left",
    //     }));
    //   }
    // });

    // Cleanup on unmount
    return () => {
      aladinInstance.removeOverlay(overlay);
    };
  }, [aladinInstance, node.constellation]);

  return (
    <FindMission
      node={node}
      aladinInstance={aladinInstance}
      onNext={onNext}
    />
  );
};

export default CompleteConstellationMission;

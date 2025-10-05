import React, { useState } from "react";
import Dialog from "../Dialog";
import FindMission from "./nodes/FindMission";
import CompleteConstellationMission from "./nodes/CompleteConstellationMission";
import type { SceneNode, DialogNode, FindPosNode, CompleteConstellationNode } from "./nodes/SceneNode";
import type { AladinInstance } from "../Aladin";

interface SceneProps {
  nodes: SceneNode[];
  aladinInstance: AladinInstance | null;
  onSceneEnd?: () => void;
}

const Scene: React.FC<SceneProps> = ({ nodes, aladinInstance, onSceneEnd }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextNode = () => {
    if (currentIndex < nodes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onSceneEnd?.();
    }
  };

  const currentNode = nodes[currentIndex];

  switch (currentNode.type) {
    case "dialog":
      return <Dialog text={(currentNode as DialogNode).text} onNext={handleNextNode} />;
    case "find":
      return (
        <FindMission
          node={currentNode as FindPosNode}
          aladinInstance={aladinInstance}
          onNext={handleNextNode}
        />
      );
    case "constellation":
      return (
        <CompleteConstellationMission
          node={currentNode as CompleteConstellationNode}
          aladinInstance={aladinInstance}
          onNext={handleNextNode}
        />
      );
    default:
      return null;
  }
};

export default Scene;

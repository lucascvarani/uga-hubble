import React, { useState } from "react";
import type { SceneNode, DialogNode } from "./SceneNode";
import Dialog from "./Dialog";

interface SceneProps {
  nodes: SceneNode[];
  onSceneEnd?: () => void; // optional callback when scene ends
}

const Scene: React.FC<SceneProps> = ({ nodes, onSceneEnd }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextDialog = () => {
    if (currentIndex < nodes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onSceneEnd?.();
    }
  };

  const currentNode = nodes[currentIndex];

  // Render component based on node type
  switch (currentNode.type) {
    case "dialog":
      const dialogNode = currentNode as DialogNode;
      return <Dialog text={dialogNode.text} onNext={handleNextDialog} />;

    default:
      return null;
  }
};

export default Scene;

import React, { useEffect, useRef } from "react";
import Dialog from "../Dialog";

interface AladinInstance {
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  // Add other methods as needed
}

interface EncontrarNorteProps {
  aladinInstance: AladinInstance | null;
  onComplete: () => void;
}

export default function EncontrarNorte({
  aladinInstance,
  onComplete,
}: EncontrarNorteProps) {
  const [sceneState, setSceneState] = React.useState(0);
  const clickHandlerRef = useRef<((...args: unknown[]) => void) | null>(null);
  const [currentDialogIndex, setCurrentDialogIndex] = React.useState(0);
  const dialogs1 = ["Onde está o norte?", "O norte está ali!"];
  const dialogs2 = ["O que você vê?", "Eu vejo uma árvore."];

  useEffect(() => {
    if (aladinInstance) {
      const clickHandler = () => {
        onClick();
      };

      clickHandlerRef.current = clickHandler;
      aladinInstance.on("click", clickHandler);
    }
  }, [aladinInstance, onClick]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function onClick() {
    if (currentDialogIndex < dialogs1.length - 1) {
      return;
    }
    setCurrentDialogIndex(0);
    setSceneState((prevState) => {
      return prevState + 1;
    });
    if (sceneState === 2) {
      onComplete();
    }
  }

  const handleNextDialog = () => {
    if (
      currentDialogIndex <
      (sceneState === 0 ? dialogs1 : dialogs2).length - 1
    ) {
      setCurrentDialogIndex(currentDialogIndex + 1);
    }
  };

  return (
    <div>
      {sceneState === 0 && (
        <div>
          <Dialog
            text={dialogs1[currentDialogIndex]}
            onNext={handleNextDialog}
          />
        </div>
      )}
      {sceneState === 1 && (
        <div>
          <Dialog
            text={dialogs2[currentDialogIndex]}
            onNext={handleNextDialog}
          />
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useRef } from "react";
import Chat from "../Chat";

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
    setSceneState((prevState) => {
      console.log(
        "EncontrarNorte click detected, advancing from state",
        prevState
      );
      return prevState + 1;
    });
    if (sceneState === 2) {
      onComplete();
    }
  }

  return (
    <div>
      {sceneState === 0 && (
        <div>
          <Chat text="Onde está o norte?" />
        </div>
      )}
      {sceneState === 1 && (
        <div>
          <Chat text="O norte está ali!" />
        </div>
      )}
    </div>
  );
}

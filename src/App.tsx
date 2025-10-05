import { useState } from "react";
import "./App.css";
import Aladin from "./components/Aladin";
import EncontrarNorte from "./components/scenes/EncontrarNorte";
import Scene from "./components/Scene";
import type { SceneNode, DialogNode } from "./components/SceneNode";
import Galaxies from "./components/scenes/Galaxies";

const medievalNodes: SceneNode[] = [
  { type: "dialog", text: "Welcome to the adventure!" } as DialogNode,
  { type: "dialog", text: "Be careful, danger is everywhere." } as DialogNode,
  {
    type: "dialog",
    text: "You made it to the first checkpoint!",
  } as DialogNode,
];

function App() {
  const [aladinInstance, setAladinInstance] = useState(null);
  const [sceneNumber, setSceneNumber] = useState<number>(0);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Full screen Aladin */}
      <div style={{ width: "100%", height: "100%" }}>
        <Aladin setAladinInstance={setAladinInstance} />
      </div>

      {/* Chat overlay at the bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <div style={{ pointerEvents: "auto" }}>
          {(() => {
            switch (sceneNumber) {
              case 0:
                return (
                  <EncontrarNorte
                    aladinInstance={aladinInstance}
                    onComplete={() =>
                      setSceneNumber((previous) => previous + 1)
                    }
                  />
                );
              case 1:
                return (
                  <Scene
                    nodes={medievalNodes}
                    onSceneEnd={() =>
                      setSceneNumber((previous) => previous + 1)
                    }
                  />
                );
              case 9:
                return (
                  <Galaxies
                    aladinInstance={aladinInstance}
                    onComplete={() =>
                      setSceneNumber((previous) => previous + 1)
                    }
                  />
                );
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </div>
  );
}

export default App;

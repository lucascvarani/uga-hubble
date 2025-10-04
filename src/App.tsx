import { useState } from "react";
import "./App.css";
import Aladin from "./components/Aladin";
import EncontrarNorte from "./components/scenes/EncontrarNorte";
import Scene from "./components/Scene";
import type { SceneNode, DialogNode } from "./components/SceneNode";


const medievalNodes: SceneNode[] = [
  { type: "dialog", text: "Welcome to the adventure!" } as DialogNode,
  { type: "dialog", text: "Be careful, danger is everywhere." } as DialogNode,
  { type: "dialog", text: "You made it to the first checkpoint!" } as DialogNode
];

function App() {
  const [aladinInstance, setAladinInstance] = useState(null);
  const [sceneNumber, setSceneNumber] = useState<number>(0);

  return (
    <div>
      <div>
        <Aladin setAladinInstance={setAladinInstance} />
      </div>
      {(() => {
        switch (sceneNumber) {
          case 1:
            return (
              <EncontrarNorte
                aladinInstance={aladinInstance}
                onComplete={() => setSceneNumber((previous) => previous + 1)}
              />
            );
          case 0:
            return <Scene nodes={medievalNodes} onSceneEnd={() => setSceneNumber((previous) => previous + 1)} />;
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import Aladin from "./components/Aladin";
import EncontrarNorte from "./components/scenes/EncontrarNorte";

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
          case 0:
            return (
              <EncontrarNorte
                aladinInstance={aladinInstance}
                onComplete={() => setSceneNumber((previous) => previous + 1)}
              />
            );
          case 1:
            return <div></div>;
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default App;

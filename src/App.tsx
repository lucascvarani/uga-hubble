import { useState } from "react";
import "./App.css";
import Aladin from "./components/Aladin";
import Aladin2 from "./components/Aladin2";
import { MyScene } from "./app/scenes/my_scene";

function App() {
  const [aladinInstance, setAladinInstance] = useState(null);
  // const currentScene = "norte";

  const scene = new MyScene(aladinInstance);

  return (
    <div>
      <div>
        <Aladin scene={scene} setAladinInstance={setAladinInstance} />
      </div>
      <button onClick={() => scene.gotoObject("Sirius")}>Go to Sirius</button>
      <button onClick={() => scene.gotoObject("Betelgeuse")}>
        Go to Betelgeuse
      </button>
      <button onClick={() => scene.gotoObject("Rigel")}>Go to Rigel</button>
    </div>
  );
}

export default App;

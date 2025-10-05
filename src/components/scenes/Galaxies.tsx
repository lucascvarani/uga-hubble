import React, { useEffect, useRef } from "react";

interface GalaxiesProps {
  aladinInstance: any | null;
  onComplete: () => void;
}

const aladinProps = [
  {
    objectName: "M31",
    fov: 4.8,
    icrsdx: 10.6847083,
    icrsdy: 41.26875,
  },
  {
    objectName: "NGC 1365",
    fov: 0.7,
  },
  {
    objectName: "M87",
    fov: 0.3,
  },
  {
    objectName: "M81",
    fov: 0.6,
  },
];

export default function Galaxies({
  aladinInstance,
  onComplete,
}: GalaxiesProps) {
  const [sceneState, setSceneState] = React.useState(0);
  const [currentAladinProps, setCurrentAladinProps] = React.useState(0);
  const [wasRightAnswer, setWasRightAnswer] = React.useState(false);

  useEffect(() => {
    if (aladinInstance) {
      aladinInstance.gotoObject(aladinProps[currentAladinProps].objectName);
      aladinInstance.setFov(aladinProps[currentAladinProps].fov);
    }
  }, [aladinInstance, currentAladinProps]);

  useEffect(() => {
    console.log("comecou quizz");
    if (sceneState == 1) {
    } else if (sceneState === 3) {
      onComplete();
    }
  }, [aladinInstance, sceneState]);

  function onClickNext() {
    console.log(currentAladinProps);
    if (currentAladinProps <= 2) {
      setCurrentAladinProps((prev) => prev + 1);
    } else {
      setSceneState((prevState) => {
        console.log("Advancing to quizz", prevState);
        return prevState + 1;
      });
    }
  }

  function onClickRightAnswer() {
    setWasRightAnswer(true);
    setSceneState(2);
  }

  function onClickWrongAnswer() {
    setWasRightAnswer(false);
    setSceneState(2);
  }

  return (
    <>
      {sceneState == 0 && (
        <div className="bg-white w-fit">
          <button type="button" onClick={() => onClickNext()}>
            Clique para continuar
          </button>
        </div>
      )}
      {sceneState == 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <h2 style={{ marginBottom: "10px", backgroundColor: "white" }}>
            Qual tipo de galáxia é este?
          </h2>
          <button
            type="button"
            onClick={() => onClickWrongAnswer()}
            style={{ backgroundColor: "white" }}
          >
            Galáxia Espiral
          </button>
          <button
            type="button"
            onClick={() => onClickRightAnswer()}
            style={{ backgroundColor: "white" }}
          >
            Galáxia Espiral Barrada
          </button>
          <button
            type="button"
            onClick={() => onClickWrongAnswer()}
            style={{ backgroundColor: "white" }}
          >
            Galáxia Elíptica
          </button>
          <button
            type="button"
            onClick={() => onClickWrongAnswer()}
            style={{ backgroundColor: "white" }}
          >
            Galáxia Irregulare
          </button>
          <button
            type="button"
            onClick={() => onClickWrongAnswer()}
            style={{ backgroundColor: "white" }}
          >
            Galáxia Lenticular
          </button>
        </div>
      )}
      {sceneState == 2 && wasRightAnswer && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <h2 style={{ marginBottom: "10px", backgroundColor: "white" }}>
            Resposta correta!
          </h2>
          <div className="bg-white w-fit">
            <button type="button" onClick={() => onClickNext()}>
              Clique para continuar
            </button>
          </div>
        </div>
      )}
      {sceneState == 2 && !wasRightAnswer && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <h2 style={{ marginBottom: "10px", backgroundColor: "white" }}>
            Resposta errada!
          </h2>
          <div className="bg-white w-fit">
            <button type="button" onClick={() => onClickNext()}>
              Clique para continuar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

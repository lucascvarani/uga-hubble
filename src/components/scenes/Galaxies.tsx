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

  useEffect(() => {
    if (aladinInstance) {
      const clickHandler = () => {
        onClick();
      };

      aladinInstance.on("click", clickHandler);
    }
  }, [aladinInstance, onClick]);

  useEffect(() => {
    if (aladinInstance) {
      aladinInstance.gotoObject(aladinProps[currentAladinProps].objectName);
      // console.log(aladinProps[currentAladinProps].icrsdx);
      // aladinInstance.gotoRaDec(
      //   aladinProps[currentAladinProps].icrsdx,
      //   aladinProps[currentAladinProps].icrsdy
      // );
      aladinInstance.setFov(aladinProps[currentAladinProps].fov);
    }
  }, [aladinInstance, currentAladinProps]);

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
    <div className="bg-white w-fit">
      <button
        type="button"
        onClick={() => setCurrentAladinProps((prev) => prev + 1)}
      >
        Clique para continuar
      </button>
    </div>
  );
}

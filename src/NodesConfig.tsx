import type { SceneNode, DialogNode, FindPosNode } from "./components/scenes/nodes/SceneNode";

export const medievalNodes: SceneNode[] = [
  {
    type: "dialog",
    text: "Welcome to the adventure!",
  } as DialogNode,

  {
    type: "dialog",
    text: "Be careful, danger is everywhere.",
  } as DialogNode,

  {
    type: "find",
    startingCoords: { ra: 5.37735322, dec: 63.7906211 },
    targetCoords: { ra: 6.34543066, dec: 64.1220310 },
    survey: "P/allWISE/color",
    tolerance: 0.5,
    fov: 3,
  } as FindPosNode,

  {
    type: "dialog",
    text: "You made it to the first checkpoint!",
  } as DialogNode,
];

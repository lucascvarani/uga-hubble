export type SceneNodeType = "dialog" | "find"; // add more types later

export interface SceneNode {
  type: SceneNodeType;
}

export interface DialogNode extends SceneNode {
  type: "dialog";
  text: string;
}

export interface FindPosNode extends SceneNode {
  type: "find",
  startingCoords: { ra: number; dec: number }; // starting position
  targetCoords: { ra: number; dec: number };   // target to find
  survey?: string; // e.g. "P/DSS2/color" or "P/2MASS/color"
  tolerance: number;
  fov: number;
}

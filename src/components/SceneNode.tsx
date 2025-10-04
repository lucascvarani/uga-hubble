export type SceneNodeType = "dialog"; // add more types later

export interface SceneNode {
  type: SceneNodeType;
}

export interface DialogNode extends SceneNode {
  type: "dialog";
  text: string;
}

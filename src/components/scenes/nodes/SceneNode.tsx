export type SceneNodeType = 'dialog' | 'find' | 'constellation' | 'eye' // add more types later

export interface SceneNode {
  type: SceneNodeType
}

export interface DialogNode extends SceneNode {
  type: 'dialog'
  text: string
}

export interface EyeNode extends SceneNode {
  type: 'eye'
  coords: { ra: number; dec: number }
}

export interface FindPosNode extends SceneNode {
  type: 'find' | 'constellation'
  title: string
  description: string
  startingCoords?: { ra: number; dec: number } // starting position
  targetCoords: { ra: number; dec: number } // target to find
  survey?: string // e.g. "P/DSS2/color" or "P/2MASS/color"
  tolerance: number
  fov: number
}

interface Star {
  ra: number
  dec: number
  name?: string
}

export interface CompleteConstellationNode extends FindPosNode {
  type: 'constellation'
  constellation: {
    name: string
    stars: Star[]
    // The lines of the constellation, each a list of [ra, dec] pairs forming a polyline
    lines: number[][][]
  }
}

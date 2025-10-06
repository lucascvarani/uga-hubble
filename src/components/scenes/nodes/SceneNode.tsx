export type SceneNodeType =
  | 'dialog'
  | 'find'
  | 'constellation'
  | 'eye'
  | 'use_telescope'
  | 'zoom_tutorial' // add more types later
  | 'music'
  | 'quizz' // add more types later
  | 'fade_out'
  | 'zoom_mission'
  | 'free_explore'

export interface SceneNode {
  type: SceneNodeType
  startingCoords?: { ra: number; dec: number; shouldSnap: boolean; fov: number } // starting position
  fovRange?: [number, number]
}

export interface DialogNode extends SceneNode {
  type: 'dialog'
  text: string[]
  audios?: string[]
  title?: string
}

export interface EyeNode extends SceneNode {
  type: 'eye'
}

export interface QuizzNode extends SceneNode {
  type: 'quizz'
  title: string
  description: string
  question: string
  options: string[]
  rightOption: number
  textRightOption: string[]
  textWrongOption: string[]
}

export interface FindPosNode extends SceneNode {
  type: 'find' | 'constellation'
  title: string
  description: string
  targetCoords: { ra: number; dec: number } // target to find
  survey?: string // e.g. "P/DSS2/color" or "P/2MASS/color"
  tolerance: number
  interpolationDuration?: number
}

export interface PlayMusicNode extends SceneNode {
  type: 'music'
  audio: string
  volume: number
  soundEffect: boolean
}

export interface UseTelescopeNode extends SceneNode {
  type: 'use_telescope'
}

export interface ZoomTutorialNode extends SceneNode {
  type: 'zoom_tutorial'
  fov: number
  fovRange: [number, number]
}

export interface ZoomMissionNode extends SceneNode {
  type: 'zoom_mission'
  misionTitle: string
  missionDescription: string
  fovThreshold: number
}

export interface FadeOutNode extends SceneNode {
  type: 'fade_out'
  duration: number // in seconds
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

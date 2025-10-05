import type {
  FadeOutNode,
  SceneNode,
  ZoomTutorialNode,
} from './nodes/SceneNode'

export const medievalNodes: SceneNode[] = [
  {
    type: 'zoom_tutorial',
    fov: 60,
    fovRange: [0.5, 60],
  } as ZoomTutorialNode,
  {
    type: 'fade_out',
    duration: 1,
  } as FadeOutNode,
]

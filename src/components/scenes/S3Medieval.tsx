import type {
  DialogNode,
  FadeOutNode,
  FindPosNode,
  PlayMusicNode,
  SceneNode,
  ZoomTutorialNode,
} from './nodes/SceneNode'

export const medievalNodes: SceneNode[] = [
  {
    type: 'dialog',
    text: [
      "Great! It fits perfectly. Now, let's take a closer look at the stars. Use the zoom feature on the telescope to get a better view of the night sky.",
    ],
  } as DialogNode,
  {
    type: 'zoom_tutorial',
    fov: 60,
    fovRange: [10, 60],
  } as ZoomTutorialNode,
  {
    type: 'dialog',
    text: [
      "Amazing, isn't it? With the telescope, you can see details that are invisible to the naked eye.",
      'See that faint, milky stain stretching across the sky? It’s been there forever, but no one really knows what it is.',
      'Let’s take a closer look — maybe this time, we’ll finally find out.',
    ],
  } as DialogNode,
  {
    type: 'find',
    title: 'Find the Milky Way',
    description:
      'Drag the screen to search for the Milky Way\n- The compass will guide you to the Milky Way',
    targetCoords: { ra: 271.10431, dec: -23.9710361 }, //271.104310 -23.9710361
    // startingCoords: { ra: 0.87, dec: 88.74, shouldSnap: true },
    tolerance: 10,
    fov: 3,
  } as FindPosNode,
  {
    type: 'music',
    audio: 'audio/history-piano.mp3',
  } as PlayMusicNode,
  {
    type: 'dialog',
    text: [
      'Look closer… that pale stain isn’t mist at all. It’s made of countless stars — millions, maybe more.',
      'This changes everything! If the sky holds more worlds than we can count, then maybe we’re not the center of it all',
      'From this moment on, people will question, imagine, and explore. Science will seek proof. Philosophy will seek meaning.',
      'And humanity will never look at the night the same way again.',
    ],
  } as DialogNode,
  {
    type: 'fade_out',
    duration: 2,
  } as FadeOutNode,
]

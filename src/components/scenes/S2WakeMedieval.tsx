import type {
  DialogNode,
  EyeNode,
  PlayMusicNode,
  SceneNode,
  UseTelescopeNode,
  // ZoomTutorialNode,
} from './nodes/SceneNode'

export const wakeMedievalNodes: SceneNode[] = [
  {
    type: 'music',
    audio: 'audio/medieval.mp3',
  } as PlayMusicNode,
  {
    type: 'eye',
  } as EyeNode,
  // {
  //   type: 'zoom_tutorial',
  //   startingCoords: { ra: 83.7335437, dec: -5.46792621 },
  // } as ZoomTutorialNode,
  {
    type: 'dialog',
    text: [
      'Hey, look who’s awake. Quite the upgrade, huh? No more caves or mammoth hunts — you’ve landed in the age of knights and thinkers. Welcome to the medieval era!',
      'You’d be amazed how much the world has changed. The world is starting to ask why — and that’s when everything begins to change.',
      'Everybody is talking about a strange tool that can make faraway things look close. Glass and metal — nothing fancy, but somehow it lets you see what no one ever could.',
      'Go on, pick up the telescope. Point it at the sky. Trust me — once you look through it, you’ll never see the world the same way again.',
    ],
  } as DialogNode,
  {
    type: 'use_telescope',
  } as UseTelescopeNode,
]

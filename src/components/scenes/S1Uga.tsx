import type {
  DialogNode,
  EyeNode,
  FadeOutNode,
  FindPosNode,
  PlayMusicNode,
  SceneNode,
} from './nodes/SceneNode'

export const ugaNodes: SceneNode[] = [
  {
    type: 'music',
    audio: 'audio/evening-sound-effect-in-village-348670.mp3',
    volume: 0.3,
  } as PlayMusicNode,
  {
    type: 'eye',
    startingCoords: {
      ra: 306.376181,
      dec: 41.6192349,
      fov: 25,
      shouldSnap: true,
    },
    title: 'LOOK AT THE SKY',
    time: '1000 BC',
  } as EyeNode,
  {
    type: 'dialog',
    text: [
      'Hey… you’re finally awake. The air feels different, doesn’t it?\nWelcome to an age where stone meets spark, the dawn of humankind.',
      'No more screens, no deadlines, no spreadsheets to haunt your dreams.\nYour only notifications now come from thunder, rivers, and hungry stomachs.',
      'Your people are waiting. The wind grows colder, and the herds have already moved on.\nIt’s time to lead them.',
      'Somewhere above, a white flame shines steady.\nThey say it watches over those who seek their path. Let’s try to find it. It might just lead us where we need to go.',
    ],
    audios: [
      'audio/memos/uga/1.m4a',
      'audio/memos/uga/2.m4a',
      'audio/memos/uga/3.m4a',
      'audio/memos/uga/4.m4a',
    ],
  } as DialogNode,
  {
    type: 'find',
    title: 'Find the white star',
    description:
      'Drag the screen to search for a bright star. The light will guide you to the star',
    targetCoords: { ra: 37.957187, dec: 89.264066 },
    startingCoords: {
      ra: 332.809397,
      dec: 83.354789,
      fov: 25,
      shouldSnap: false,
    },
    tolerance: 1.5,
  } as FindPosNode,
  {
    type: 'music',
    audio: 'audio/anthem-of-victory-111206.mp3',
    volume: 0.3,
  } as PlayMusicNode,
  {
    type: 'dialog',
    text: [
      'You found it — that steady light in the dark, always pointing to the North. While the others drift, this one never moves. Your guide. Your star.',
      'One day, people will call it Polaris — the North Star. It’ll lead sailors, travelers, and dreamers for thousands of years.',
      'Your people are safe. Rest — the stars will take it from here.',
    ],
    audios: [
      'audio/memos/uga/5.m4a',
      'audio/memos/uga/6.m4a',
      'audio/memos/uga/7.m4a',
    ],
  } as DialogNode,
  {
    type: 'fade_out',
    duration: 3,
  } as FadeOutNode,
]

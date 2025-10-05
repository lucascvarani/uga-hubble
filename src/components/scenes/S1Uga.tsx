import type {
  DialogNode,
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
    type: 'dialog',
    text: [
      'Hey… you’re finally awake. The air feels different, doesn’t it?\nWelcome to an age where stone meets spark, the dawn of humankind.',
      'No more screens, no deadlines, no spreadsheets to haunt your dreams.\nYour only notifications now come from thunder, rivers, and hungry stomachs.',
      'Your people are waiting. The wind grows colder, and the herds have already moved on.\nIt’s time to lead them - across unknown lands, through nights filled with stories and stars.',
      'Somewhere above, a white flame shines steady, never fading, never wandering.\nThey say it watches over those who seek their path. Let’s try to find it. It might just lead us where we need to go.',
    ],
  } as DialogNode,
  {
    type: 'find',
    title: 'Find SN 1572',
    description: 'Its really cool',
    startingCoords: { ra: 5.37735322, dec: 63.7906211 },
    targetCoords: { ra: 6.34543066, dec: 64.122031 },
    survey: 'P/allWISE/color',
    tolerance: 0.5,
    fov: 3,
  } as FindPosNode,
]

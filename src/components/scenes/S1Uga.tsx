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
    title: 'Find the white star',
    description:
      '- Drag the screen to search for a bright star\n- The light will guide you to the star',
    targetCoords: { ra: 37.9545607, dec: 89.264109 }, //37.9545607 +89.2641090
    // survey: 'P/DSS2/color',
    tolerance: 0.5,
    fov: 3,
  } as FindPosNode,
  {
    type: 'music',
    audio: 'audio/anthem-of-victory-111206.mp3',
    volume: 0.3,
  } as PlayMusicNode,
  {
    type: 'dialog',
    text: [
      'You found it — that steady light in the dark. While the others drift, this one never moves. Your guide. Your star.',
      'One day, people will call it Polaris — the North Star. It’ll lead sailors, travelers, and dreamers for thousands of years.',
      'Your people are safe. Rest — the stars will take it from here.',
    ],
  } as DialogNode,
]

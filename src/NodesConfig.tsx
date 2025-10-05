import type {
  SceneNode,
  DialogNode,
  FindPosNode,
  CompleteConstellationNode,
  EyeNode,
} from './components/scenes/nodes/SceneNode'

export const medievalNodes: SceneNode[] = [
  {
    type: 'eye',
    coords: { ra: 5.37735322, dec: 63.7906211 },
  } as EyeNode,
  {
    type: 'dialog',
    text: [
      'Greetings, traveler of the stars. Tonight, we journey back to the year 1572 — when the heavens themselves changed forever.',
    ],
  } as DialogNode,

  // {
  //   type: 'constellation',
  //   survey: 'P/DSS2/color',
  //   fov: 30,
  //   tolerance: 0.8,
  //   startingCoords: { ra: 247.35, dec: -32.0 }, // Rough center of Scorpius
  //   targetCoords: { ra: 247.35, dec: -32.0 }, // You could set this to Antares if it’s the “target”
  //   constellation: {
  //     name: 'Scorpius',
  //     stars: [
  //       { name: 'Antares', ra: 247.3519, dec: -26.432 },
  //       { name: 'Shaula', ra: 263.4022, dec: -37.1038 },
  //       { name: 'Sargas', ra: 263.7335, dec: -42.9978 },
  //       { name: 'Dschubba', ra: 240.0833, dec: -22.6217 },
  //       { name: 'Acrab', ra: 241.3596, dec: -19.8054 },
  //       { name: 'Jabbah', ra: 239.7123, dec: -19.46 },
  //       { name: 'Alniyat', ra: 244.5804, dec: -25.5934 },
  //       { name: 'Lesath', ra: 263.7332, dec: -39.1579 },
  //     ],
  //     lines: [
  //       [
  //         [241.358333, -19.805556],
  //         [242.994167, -19.449722],
  //         [240.083333, -22.621667],
  //         [239.712972, -26.114108],
  //       ],
  //       [
  //         [239.712972, -26.114108],
  //         [245.295833, -25.592778],
  //         [247.351667, -26.431944],
  //         [248.970637, -28.216017],
  //       ],
  //       [
  //         [248.970637, -28.216017],
  //         [256.205636, -34.122930],
  //       ],
  //       [
  //         [256.205636, -34.122930],
  //         [262.691000, -37.295750],
  //         [263.402193, -37.103749],
  //       ],
  //       [
  //         [263.402193, -37.103749],
  //         [265.621980, -39.029983],
  //         [264.329167, -42.997778],
  //       ],
  //     ],
  //   },
  // } as CompleteConstellationNode,

  // {
  //   type: 'dialog',
  //   text: 'In the constellation of Cassiopeia, a brilliant light appeared where none had been before. To the people of that age, it was a miracle — or a warning.',
  // } as DialogNode,

  // {
  //   type: 'dialog',
  //   text: "But one man, Tycho Brahe, saw it differently. He measured, observed, and realized something extraordinary — this 'new star' lay far beyond the Moon, in the realm once thought unchanging.",
  // } as DialogNode,

  // {
  //   type: 'dialog',
  //   text: 'Your task is to find the very place in the sky where Tycho once gazed. Look to Cassiopeia… find the remnants of SN 1572.',
  // } as DialogNode,

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

  {
    type: 'dialog',
    text: [
      'You’ve found it — the ghost of a star that once burned brighter than Venus. Tycho’s Supernova.',
      'From this light, astronomy was reborn. The belief in perfect, unchanging heavens shattered — and the path to modern science began.',
      'Well done, explorer. The stars remember — and now, so do you.',
    ],
  } as DialogNode,
]

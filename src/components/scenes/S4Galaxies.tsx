import type {
  QuizzNode,
  SceneNode,
  DialogNode,
  ZoomMissionNode,
  PlayMusicNode,
  FadeOutNode,
} from './nodes/SceneNode'

export const galaxiesNodes: SceneNode[] = [
  {
    type: 'dialog',
    text: [
      'You’re awake — finally, in your own time.',
      'Now you hold machines that can see galaxies, and tools that can listen to the birth of stars.',
      'Let’s explore some galaxies together!',
    ],
    startingCoords: {
      ra: 10.6847083,
      dec: 41.26875,
      shouldSnap: false,
      fov: 30,
    },
  } as DialogNode,
  {
    type: 'zoom_mission',
    fovThreshold: 1,
    misionTitle: 'Zoom into Andromeda',
    missionDescription:
      'Use the zoom feature to get a closer look at the Andromeda',
    fovRange: [0.5, 120],
  } as ZoomMissionNode,
  {
    type: 'dialog',
    text: [
      'This unique point of light is in fact an entire galaxy, with millions of stars!',
      'This is Andromeda, our neighbour spiral galaxy located about 2.5 million light-years away from us.',
      'A spiral galaxy is a type of galaxy shaped like a flat, rotating disk with a bright center and arms that spiral outward.',
      'These arms are made of stars, gas, and dust, where new stars are often born.',
    ],
  } as DialogNode,
  {
    type: 'dialog',
    text: [
      'The Great Barred Spiral Galaxy, is a stunning cosmic masterpiece located about 56 million light-years away.',
      'A barred spiral galaxy has a bright center with a bar-shaped line of stars crossing through it.\nFrom the ends of this bar, spiral arms stretch outward.',
    ],
    startingCoords: {
      ra: 53.4019083,
      dec: -36.1406582,
      shouldSnap: false,
      fov: 0.5,
    },
  } as DialogNode,
  {
    type: 'dialog',
    text: [
      'The Small Magellanic Cloud (SMC) is a nearby irregular galaxy and a companion of the Milky Way, located about 200,000 light-years away.',
      'Irregular galaxies have no defined shape, appearing as a patchy, chaotic collection of stars, gas, and dust.',
      'The SMC is rich in star-forming regions, making it a fascinating place to study how new stars are born.',
    ],
    startingCoords: {
      ra: 13.1583333,
      dec: -72.8002777,
      shouldSnap: false,
      fov: 10,
    },
  } as DialogNode,
  {
    type: 'dialog',
    text: [
      'Messier 87, is a giant elliptical galaxy about 55 million light-years away in the Virgo Cluster.',
      'Unlike spiral galaxies, it has a smooth, rounded shape with mostly older stars and very little gas or dust.',
      'M87 is famous for its supermassive black hole at the center, which was the first black hole ever photographed.',
    ],
    startingCoords: {
      ra: 187.705931,
      dec: 12.3911232,
      shouldSnap: false,
      fov: 10,
    },
  } as DialogNode,
  {
    type: 'dialog',
    text: [
      'Look at this galaxy carefully. Notice its shape, structure, and the patterns of its stars. Can you figure out what type of galaxy it is?',
    ],
    startingCoords: {
      ra: 80.8941667,
      dec: -69.756111,
      shouldSnap: false,
      fov: 10,
    },
  } as DialogNode,
  {
    type: 'quizz',
    title: 'Desvendando galáxias',
    description:
      'Ajude Aladim a descobrir qual é o tipo da galáxia de Andrômeda!',
    question: 'Qual tipo de galáxia é este?',
    options: [
      'Spiral galaxy',
      'Barred spiral galaxy',
      'Irregular galaxy',
      'Elliptical galaxy',
    ],
    rightOption: 2,
    textRightOption: [
      'Great job! You correctly identified the Large Magellanic Cloud.',
    ],
    textWrongOption: [
      'Oops! That’s not quite right. The Large Magellanic Cloud is an irregular galaxy.',
    ],
  } as QuizzNode,
  {
    type: 'dialog',
    text: [
      'We’ve mapped the stars, reached the Moon, and peered into the heart of distant galaxies…',
      'but there’s still so much we don’t know...',
      'Somewhere out there waits the next great discovery',
      'the one that will change how we see everything.',
      'So take the tools of this age, aim them toward the unknown, and make it yours.',
      'The next chapter of humanity is waiting for you to write it.',
    ],
  },
  {
    type: 'music',
    audio: 'audio/andromeda-space-adventure-403080.mp3',
  } as PlayMusicNode,
  {
    type: 'fade_out',
    duration: 4,
  } as FadeOutNode,
]

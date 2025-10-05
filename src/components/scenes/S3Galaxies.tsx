import type {
  QuizzNode,
  SceneNode,
  DialogNode,
  ZoomMissionNode,
} from './nodes/SceneNode'

export const galaxiesNodes: SceneNode[] = [
  {
    type: 'dialog',
    text: [
      'You’ve awakened in a new era — \na time when powerful telescopes let us see billions of light-years away.',
      'Now, take a closer look with the Hubble Telescope.\nTry zooming in in that single point of light',
    ],
    startingCoords: {
      ra: 10.6847083,
      dec: 41.26875,
      shouldSnap: false,
      fov: 10,
    },
  } as DialogNode,
  {
    type: 'zoom_mission',
    misionTitle: 'Zoom In',
    missionDescription: 'Use the scroll or the buttons to zoom in',
    fovThreshold: 1,
    fovRange: [0.5, 120],
  } as ZoomMissionNode,
  {
    type: 'dialog',
    text: [
      'This unique point of light is in fact an entire galaxy, with millions of stars!',
      'This is Andromeda...',
      'A spiral galaxy is a type of galaxy shaped like a flat, rotating disk with a bright center and arms that spiral outward.\nThese arms are made of stars, gas, and dust, where new stars are often born.',
    ],
  } as DialogNode,
  {
    type: 'dialog',
    text: [
      'Esta á A Grande Galáxia Barrada.',
      'Como o próprio nome já diz, ela é uma galáxia do tipo Espiral Barrada.',
    ],
    startingCoords: {
      ra: 53.4019083,
      dec: -36.1406582,
      shouldSnap: false,
      fov: 10,
    },
  } as DialogNode,
  {
    type: 'dialog',
    text: [
      'Galáxia gigante elíptica no aglomerado de Virgem',
      'É uma galáxia elíptica',
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
      'Esta é Bode’s Galaxy',
      'Você poderia nos ajuda a definir qual é o tipo desta galáxia?',
    ],
    startingCoords: {
      ra: 53.4019083,
      dec: -36.1406582,
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
      'Galáxia Espiral',
      'Galáxia Espiral Barrada',
      'Galáxia Elíptica',
      'Galáxia Irregular',
      'Galáxia Lenticular',
    ],
    rightOption: 0,
    textRightOption: ['Resposta correta!'],
    textWrongOption: ['Resposta errada!'],
  } as QuizzNode,
]

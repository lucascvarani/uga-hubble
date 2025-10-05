import type { QuizzNode, SceneNode, DialogNode } from './nodes/SceneNode'

export const galaxiesNodes: SceneNode[] = [
  {
    type: 'dialog',
    text: ['Esta é a galáxia de andrômeda.', 'Ela é uma galáxia espiral.'],
  } as DialogNode,
  {
    type: 'dialog',
    text: [
      'Esta á A Grande Galáxia Barrada.',
      'Como o próprio nome já diz, ela é uma galáxia do tipo Espiral Barrada.',
    ],
  } as DialogNode,
  {
    type: 'dialog',
    text: [
      'Galáxia gigante elíptica no aglomerado de Virgem',
      'É uma galáxia elíptica',
    ],
  } as DialogNode,
  {
    type: 'dialog',
    text: [
      'Esta é Bode’s Galaxy',
      'Você poderia nos ajuda a definir qual é o tipo desta galáxia?',
    ],
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

export const apartados = [
  { id: 1, nombre: 'Aulas' },
  { id: 2, nombre: 'Aulas en el plantel' },
  { id: 3, nombre: 'Constancia infejal y protección civil' },
  { id: 4, nombre: 'Elementos seguridad laboratorio o taller' },
  { id: 5, nombre: 'Funcionamiento de taller o laboratorio' },
  { id: 6, nombre: 'Condiciones de biblioteca' },
  { id: 7, nombre: 'Elementos de la biblioteca' },
  { id: 8, nombre: 'Dimensiones biblioteca' },
  { id: 9, nombre: 'Sanitarios' },
  { id: 10, nombre: 'Especificaciones de equipo de cómputo' },
  { id: 11, nombre: 'Identificación del plantel (Exterior)' },
  { id: 12, nombre: 'Identificación de las áreas administrativas' },
];

export const preguntas = [
  // Aulas
  {
    id: 1,
    pregunta: '¿Las aulas tienen adecuada y suficiente ventilación?',
    tipoPreguntaId: 1,
    apartadoId: 1,
  },
  {
    id: 2,
    pregunta: '¿Las aulas están equipadas con iluminación adecuada?',
    tipoPreguntaId: 2,
    apartadoId: 1,
  },
  {
    id: 3,
    pregunta: '¿Las aulas tienen mobiliario en buen estado?',
    tipoPreguntaId: 3,
    apartadoId: 1,
  },

  // Aulas en el plantel
  {
    id: 4,
    pregunta: '¿Las aulas en el plantel están bien distribuidas?',
    tipoPreguntaId: 1,
    apartadoId: 2,
  },
  {
    id: 5,
    pregunta:
      '¿Las aulas en el plantel tienen acceso para personas con discapacidad?',
    tipoPreguntaId: 2,
    apartadoId: 2,
  },
  {
    id: 6,
    pregunta: '¿Las aulas en el plantel cuentan con sistemas de emergencia?',
    tipoPreguntaId: 3,
    apartadoId: 2,
  },

  // Constancia infejal y protección civil
  {
    id: 7,
    pregunta: '¿Se cuenta con la constancia de infejal?',
    tipoPreguntaId: 1,
    apartadoId: 3,
  },
  {
    id: 8,
    pregunta: '¿El plantel cumple con las normativas de protección civil?',
    tipoPreguntaId: 2,
    apartadoId: 3,
  },
  {
    id: 9,
    pregunta: '¿Se realizan simulacros de emergencia periódicamente?',
    tipoPreguntaId: 3,
    apartadoId: 3,
  },

  // Elementos seguridad laboratorio o taller
  {
    id: 10,
    pregunta: '¿El laboratorio/taller tiene equipo de seguridad disponible?',
    tipoPreguntaId: 1,
    apartadoId: 4,
  },
  {
    id: 11,
    pregunta:
      '¿Se han implementado medidas de seguridad adecuadas en el laboratorio/taller?',
    tipoPreguntaId: 2,
    apartadoId: 4,
  },
  {
    id: 12,
    pregunta:
      '¿El personal del laboratorio/taller está capacitado en seguridad?',
    tipoPreguntaId: 3,
    apartadoId: 4,
  },

  // Funcionamiento de taller o laboratorio
  {
    id: 13,
    pregunta: '¿El taller/laboratorio está en funcionamiento?',
    tipoPreguntaId: 1,
    apartadoId: 5,
  },
  {
    id: 14,
    pregunta: '¿El taller/laboratorio cuenta con todos los insumos necesarios?',
    tipoPreguntaId: 2,
    apartadoId: 5,
  },
  {
    id: 15,
    pregunta: '¿El taller/laboratorio tiene horario de operación adecuado?',
    tipoPreguntaId: 3,
    apartadoId: 5,
  },

  // Condiciones de biblioteca
  {
    id: 16,
    pregunta: '¿La biblioteca está en condiciones adecuadas?',
    tipoPreguntaId: 1,
    apartadoId: 6,
  },
  {
    id: 17,
    pregunta: '¿La biblioteca tiene acceso para personas con discapacidad?',
    tipoPreguntaId: 2,
    apartadoId: 6,
  },
  {
    id: 18,
    pregunta: '¿La biblioteca cuenta con áreas de estudio adecuadas?',
    tipoPreguntaId: 3,
    apartadoId: 6,
  },

  // Elementos de la biblioteca
  {
    id: 19,
    pregunta:
      '¿La biblioteca tiene libros suficientes para todas las materias?',
    tipoPreguntaId: 1,
    apartadoId: 7,
  },
  {
    id: 20,
    pregunta: '¿La biblioteca cuenta con recursos digitales?',
    tipoPreguntaId: 2,
    apartadoId: 7,
  },
  {
    id: 21,
    pregunta:
      '¿La biblioteca tiene equipo de cómputo disponible para los estudiantes?',
    tipoPreguntaId: 3,
    apartadoId: 7,
  },

  // Dimensiones biblioteca
  {
    id: 22,
    pregunta:
      '¿La biblioteca tiene dimensiones adecuadas para el número de estudiantes?',
    tipoPreguntaId: 1,
    apartadoId: 8,
  },
  {
    id: 23,
    pregunta:
      '¿La biblioteca tiene espacios separados para diferentes actividades?',
    tipoPreguntaId: 2,
    apartadoId: 8,
  },
  {
    id: 24,
    pregunta:
      '¿La biblioteca cumple con las normativas de espacio por estudiante?',
    tipoPreguntaId: 3,
    apartadoId: 8,
  },

  // Sanitarios
  {
    id: 25,
    pregunta: '¿Los sanitarios están limpios y en buen estado?',
    tipoPreguntaId: 1,
    apartadoId: 9,
  },
  {
    id: 26,
    pregunta: '¿Los sanitarios tienen suministro constante de agua?',
    tipoPreguntaId: 2,
    apartadoId: 9,
  },
  {
    id: 27,
    pregunta:
      '¿Los sanitarios tienen insumos suficientes (papel, jabón, etc.)?',
    tipoPreguntaId: 3,
    apartadoId: 9,
  },

  // Especificaciones de equipo de cómputo
  {
    id: 28,
    pregunta: '¿El equipo de cómputo cumple con las especificaciones mínimas?',
    tipoPreguntaId: 1,
    apartadoId: 10,
  },
  {
    id: 29,
    pregunta: '¿El equipo de cómputo está actualizado?',
    tipoPreguntaId: 2,
    apartadoId: 10,
  },
  {
    id: 30,
    pregunta:
      '¿El equipo de cómputo cuenta con software necesario para las actividades académicas?',
    tipoPreguntaId: 3,
    apartadoId: 10,
  },

  // Identificación del plantel (Exterior)
  {
    id: 31,
    pregunta: '¿El plantel tiene identificación visible desde el exterior?',
    tipoPreguntaId: 1,
    apartadoId: 11,
  },
  {
    id: 32,
    pregunta: '¿El plantel tiene señalización adecuada en el exterior?',
    tipoPreguntaId: 2,
    apartadoId: 11,
  },
  {
    id: 33,
    pregunta: '¿El plantel tiene iluminación exterior adecuada?',
    tipoPreguntaId: 3,
    apartadoId: 11,
  },

  // Identificación de las áreas administrativas
  {
    id: 34,
    pregunta: '¿Las áreas administrativas están identificadas adecuadamente?',
    tipoPreguntaId: 1,
    apartadoId: 12,
  },
  {
    id: 35,
    pregunta: '¿Las áreas administrativas tienen acceso restringido?',
    tipoPreguntaId: 2,
    apartadoId: 12,
  },
  {
    id: 36,
    pregunta:
      '¿Las áreas administrativas cuentan con equipo adecuado para su funcionamiento?',
    tipoPreguntaId: 3,
    apartadoId: 12,
  },
];

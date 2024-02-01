/* eslint-disable import/prefer-default-export */
const updateUsuarioSchema = {
  type: 'object',
  properties: {
    persona: {
      type: 'object',
      properties: {
        nombre: { type: 'string' },
        apellidoPaterno: { type: 'string' },
        apellidoMaterno: { type: 'string' },
        tituloCargo: { type: 'string' },
      },
    },
    rolId: { type: 'number' },
    correo: { type: 'string' },
    actualizado: { type: 'number' },
    estatus: { type: 'number' },
  },
};

export { updateUsuarioSchema };

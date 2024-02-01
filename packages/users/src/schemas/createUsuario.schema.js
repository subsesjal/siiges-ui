/* eslint-disable import/prefer-default-export */
const createUsuarioSchema = {
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
      required: ['nombre', 'apellidoPaterno'],
    },
    rolId: { type: 'number' },
    correo: { type: 'string' },
    usuario: { type: 'string' },
    contrasena: { type: 'string' },
    repeatContrasena: { type: 'string' },
    actualizado: { type: 'number' },
    estatus: { type: 'number' },
  },
  required: ['persona', 'rolId', 'correo', 'usuario', 'contrasena', 'repeatContrasena', 'actualizado'],
};

export { createUsuarioSchema };

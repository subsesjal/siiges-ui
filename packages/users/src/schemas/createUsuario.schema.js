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
<<<<<<< HEAD
    rolId: { type: 'number' },
=======
    rolId: { type: 'string' },
>>>>>>> 0a266adf0c299dd06162d56b2a3250caf132e879
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

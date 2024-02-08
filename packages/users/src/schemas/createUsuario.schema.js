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
    rolId: { type: 'string' },
    correo: { type: 'string' },
    usuario: { type: 'string' },
    contrasena: {
      type: 'string',
      minLength: 8,
      maxLength: 25,
      pattern: '^(?!.* )(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*[@$!%*?&./])[A-Za-z0-9@$!%*?&./]{8,25}$',
    },
    repeatContrasena: {
      type: 'string',
      minLength: 8,
      maxLength: 25,
      pattern: '^(?!.* )(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*[@$!%*?&./])[A-Za-z0-9@$!%*?&./]{8,25}$',
    },
    actualizado: { type: 'number' },
    estatus: { type: 'number' },
  },
  required: ['persona', 'rolId', 'correo', 'usuario', 'contrasena', 'repeatContrasena', 'actualizado'],
};

export { createUsuarioSchema };

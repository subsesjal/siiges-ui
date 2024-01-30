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
    rolId: { type: 'string' },
    correo: { type: 'string' },
    usuario: { type: 'string' },
    contrasena: { type: 'string' },
    repeatContrasena: { type: 'string' },
    actualizado: { type: 'number' },
    estatus: { type: 'number' },
  },
};

export { updateUsuarioSchema };

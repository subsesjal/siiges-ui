/* eslint-disable import/prefer-default-export */
const createInstitucionSchema = {
  type: 'object',
  properties: {
    usuarioId: { type: 'number' },
    tipoInstitucionId: { type: 'number' },
    razonSocial: { type: 'string' },
    nombre: { type: 'string' },
    mision: { type: 'string' },
    vision: { type: 'string' },
    valoresInstitucionales: { type: 'string' },
    historia: { type: 'string' },
    ratificacionesNombre: {
      type: 'object',
      properties: {
        nombrePropuesto1: { type: 'string' },
        nombrePropuesto2: { type: 'string' },
        nombrePropuesto3: { type: 'string' },
        esNombreAutorizado: { type: 'boolean' },
      },
      required: ['nombrePropuesto1', 'nombrePropuesto2', 'nombrePropuesto3', 'esNombreAutorizado'],
    },
    rector: {
      type: 'object',
      properties: {
        persona: {
          type: 'object',
          properties: {
            nombre: { type: 'string' },
            apellidoPaterno: { type: 'string' },
            apellidoMaterno: { type: 'string' },
            esNombreAutorizado: { type: 'string' },
          },
          required: ['nombre', 'apellidoPaterno', 'apellidoMaterno'],
        },
      },
      required: ['persona'],
    },
  },
  required: ['usuarioId', 'tipoInstitucionId', 'ratificacionesNombre', 'rector'],
};

export { createInstitucionSchema };

const errorDatosAsignaturas = {
  gradoId: { message: '¡Seleccione un nivel!' },
  areaId: { message: '¡Seleccione un área!' },
  nombre: { message: '¡Nombre inválido!' },
  clave: { message: '¡Clave inválida!' },
  creditos: { message: '¡Créditos inválidos!', isNumber: true },
  academia: { message: '¡Academia inválida!' },
  horasDocente: { message: '¡Horas docente inválidos!', isNumber: true },
  horasIndependiente: {
    message: 'Horas independiente inválidos',
    isNumber: true,
  },
};

export default errorDatosAsignaturas;

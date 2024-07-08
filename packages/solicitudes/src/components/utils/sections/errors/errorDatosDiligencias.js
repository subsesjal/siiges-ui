const errorDatosDiligencias = {
  nombre: { message: 'Nombre inválido', isNumber: false },
  apellidoPaterno: { message: 'Apellido Paterno inválido', isNumber: false },
  apellidoMaterno: { message: 'Apellido Materno inválido', isNumber: false },
  tituloCargo: { message: 'Título de Cargo inválido', isNumber: false },
  correoPrimario: { message: 'Correo inválido', isNumber: false },
  telefono: { message: 'Teléfono inválido', isNumber: true },
  celular: { message: 'Celular inválido', isNumber: true },
  horaInicio: { message: 'Hora de inicio inválida', isNumber: false },
  horaFin: { message: 'Hora de fin inválida', isNumber: false },
};

export default errorDatosDiligencias;

const DiligenciasToRows = (item) => {
  const horaInicio = new Date(item.horaInicio);
  const horaFin = new Date(item.horaFin);
  return {
    id: item.id,
    nombre: item.persona.nombre,
    tituloCargo: item.persona.tituloCargo,
    telefono: item.persona.telefono,
    celular: item.persona.celular,
    correoPrimario: item.persona.correoPrimario,
    schedule: `${horaInicio.toLocaleTimeString()} - ${horaFin.toLocaleTimeString()}`,
  };
};

export default DiligenciasToRows;

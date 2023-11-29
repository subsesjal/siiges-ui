export default function getTurnoById(id, field) {
  const turnos = [
    { id: 1, nombre: 'Matutino', descripcion: 'Turno matutino' },
    { id: 2, nombre: 'Vespertino', descripcion: 'Turno vespertino' },
    { id: 3, nombre: 'Nocturno', descripcion: 'Turno nocturno' },
    { id: 4, nombre: 'Mixto', descripcion: 'Turno mixto' },
  ];

  const item = turnos.find((turno) => turno.id === id);

  return item ? item[field] : null;
}

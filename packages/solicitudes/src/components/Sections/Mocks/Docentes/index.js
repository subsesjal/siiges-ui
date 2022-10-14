const columns = [
  { field: 'name', headerName: 'Nombre', width: 170 },
  { field: 'type', headerName: 'Tipo' },
  { field: 'formation', headerName: 'Formacion profecional', width: 180 },
  { field: 'asignatura', headerName: 'Asignatura', width: 170 },
  { field: 'experience', headerName: 'Experiencia', width: 170 },
  { field: 'hirability', headerName: 'Contratacion y antiguedad', width: 220 },
  { field: 'actions', headerName: 'Acciones' },
];

const rows = [
  {
    id: 1,
    name: 'Jon Snow',
    type: 'asignatura',
    formation: 'Maestria',
    asignatura: 'Matematicas',
    experience: 'Resumen',
    hirability: 'Resumen',
    actions: 'iconos',
  },
  {
    id: 2,
    name: 'Cersei Lannister',
    type: 'asignatura',
    formation: 'Maestria',
    asignatura: 'Matematicas',
    experience: 'Resumen',
    hirability: 'Resumen',
    actions: 'iconos',
  },
  {
    id: 3,
    name: 'Jaime Lannister',
    type: 'asignatura',
    formation: 'Maestria',
    asignatura: 'Matematicas',
    experience: 'Resumen',
    hirability: 'Resumen',
    actions: 'iconos',
  },
];

export { rows, columns };

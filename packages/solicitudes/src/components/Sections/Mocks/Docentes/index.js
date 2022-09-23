const columns = [
  { field: 'name', headerName: 'Nombre' },
  { field: 'type', headerName: 'Tipo' },
  { field: 'formation', headerName: 'Formacion profecional' },
  { field: 'asignatura', headerName: 'Asignatura' },
  { field: 'experience', headerName: 'Experiencia' },
  { field: 'hirability', headerName: 'Contratacion y antiguedad' },
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

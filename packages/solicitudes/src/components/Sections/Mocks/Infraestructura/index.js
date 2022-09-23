const columns = [
  { field: 'instalation', headerName: 'Instalacion' },
  { field: 'capacity', headerName: 'Capacidad (alumnos)' },
  { field: 'meters', headerName: 'Mts2' },
  { field: 'resources', headerName: 'Recursos materiales' },
  { field: 'location', headerName: 'Ubicacion' },
  { field: 'asignaturas', headerName: 'Asignaturas' },
  { field: 'actions', headerName: 'Acciones' },
];

const rows = [
  {
    id: 1,
    instalation: 'Edificio 1',
    capacity: 150,
    meters: 5000,
    resources: 'Mesas',
    location: 'Guadalajara',
    asignaturas: 'Matematicas',
    actions: 'iconos',
  },
  {
    id: 2,
    instalation: 'Edificio 2',
    capacity: 44,
    meters: 5000,
    resources: 'Sillas',
    location: 'Guadalajara',
    asignaturas: 'Fisica',
    actions: 'iconos',
  },
];

export { rows, columns };

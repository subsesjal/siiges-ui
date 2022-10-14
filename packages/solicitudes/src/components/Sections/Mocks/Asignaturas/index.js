const columns = [
  { field: 'grade', headerName: 'Grado' },
  { field: 'name', headerName: 'Nombre', width: 170 },
  { field: 'clave', headerName: 'Clave' },
  { field: 'seriacion', headerName: 'Seriacion' },
  { field: 'horasDocente', headerName: 'Horas docente', width: 150 },
  { field: 'horasIndependiente', headerName: 'Horas independiente', width: 180 },
  { field: 'creditos', headerName: 'Creditos' },
  { field: 'area', headerName: 'Area' },
  { field: 'actions', headerName: 'Acciones' },
];

const rows = [
  {
    id: 1,
    grade: 8,
    name: 'Jon Snow',
    clave: 3321561,
    seriacion: 321631,
    horasDocente: '9:00 a 17:00',
    horasIndependiente: '9:00 a 17:00',
    creditos: 100,
    area: 'Formacion general',
    actions: 'iconos',
  },
  {
    id: 2,
    grade: 8,
    name: 'Cersei Lannister',
    clave: 3321561,
    seriacion: 321631,
    horasDocente: '9:00 a 17:00',
    horasIndependiente: '9:00 a 17:00',
    creditos: 100,
    area: 'Formacion general',
    actions: 'iconos',
  },
  {
    id: 3,
    grade: 8,
    name: 'Jaime Lannister',
    clave: 3321561,
    seriacion: 321631,
    horasDocente: '9:00 a 17:00',
    horasIndependiente: '9:00 a 17:00',
    creditos: 100,
    area: 'Formacion general',
    actions: 'iconos',
  },
];

export { rows, columns };

const columns = [
  { field: 'folio', headerName: 'Folio de captura', width: 230 },
  { field: 'planEstudios', headerName: 'Plan de estudios', width: 170 },
  { field: 'status', headerName: 'Estatus', width: 280 },
  { field: 'plantel', headerName: 'Plantel', width: 300 },
  { field: 'instituciones', headerName: 'Instituciones', width: 300 },
  { field: 'actions', headerName: 'Acciones' },
];

const rows = [
  {
    id: 1,
    folio: 'M2020249 Nueva solicitud',
    planEstudios: 'Desconocido',
    status: 'INSPECCION FISICA',
    plantel: '339 Nicolas Bravo Zapotlan el grande',
    instituciones: 'Centro educativo superior de zapopan',
    actions: 'iconos',
  },
  {
    id: 2,
    folio: 'M2020249 Nueva solicitud',
    planEstudios: 'Desconocido',
    status: 'INSPECCION FISICA',
    plantel: '339 Nicolas Bravo Zapotlan el grande',
    instituciones: 'Centro educativo superior de zapopan',
    actions: 'iconos',
  },
  {
    id: 3,
    folio: 'M2020249 Nueva solicitud',
    planEstudios: 'Desconocido',
    status: 'ASIGNACION INSPECCION FISICA',
    plantel: '339 Nicolas Bravo Zapotlan el grande',
    instituciones: 'Centro educativo superior de zapopan',
    actions: 'iconos',
  },
];

export { rows, columns };

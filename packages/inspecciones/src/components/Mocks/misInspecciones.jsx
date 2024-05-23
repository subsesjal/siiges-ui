import React from 'react';
import BotonesInpeccion from '../ActaCierre';

const columns = [
  { field: 'folio', headerName: 'Folio de captura', width: 200 },
  { field: 'folioInspeccion', headerName: 'Folio de inspección', width: 200 },
  { field: 'planEstudios', headerName: 'Plan de estudios', width: 270 },
  { field: 'status', headerName: 'Estatus', width: 150 },
  { field: 'inspeccion', headerName: 'Inspección', width: 150 },
  { field: 'asignacion', headerName: 'Asignación', width: 150 },
  {
    field: 'actions',
    headerName: 'Acciones',
    renderCell: (params) => (
      <BotonesInpeccion id={params.id} />
    ),
  },
];

export default columns;

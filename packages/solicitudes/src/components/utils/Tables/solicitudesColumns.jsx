import React from 'react';
import SolicitudesActions from '../Components/SolicitudesActions';

const columnsSolicitudes = [
  {
    field: 'id', headerName: 'ID', width: 80, hide: true,
  },
  { field: 'folio', headerName: 'Folio', width: 125 },
  { field: 'studyPlan', headerName: 'Plan de estudios', width: 180 },
  { field: 'estatusSolicitudId', headerName: 'Estatus', width: 200 },
  { field: 'plantel', headerName: 'Plantel', width: 450 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <SolicitudesActions id={params.id} />
    ),
  },
];

export default columnsSolicitudes;

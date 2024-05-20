import React from 'react';
import ModalInspecciones from '../FormAsignacionInspecciones/ModalInspecciones';

const columns = [
  { field: 'nombre', headerName: 'Nombre', width: 660 },
  { field: 'activas', headerName: 'Inspecciones activas', width: 170 },
  { field: 'realizadas', headerName: 'Inspecciones realizadas', width: 170 },
  {
    field: 'actions',
    headerName: 'Acciones',
    renderCell: (params) => <ModalInspecciones params={params} />,
  },
];

export default columns;

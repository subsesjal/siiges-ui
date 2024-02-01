import React from 'react';
import ActionCell from './ActionCell';

const Columns = [
  { field: 'nombre', headerName: 'Nombre', width: 450 },
  { field: 'cantidad', headerName: 'Cantidad', width: 250 },
  { field: 'metrosCuadrados', headerName: 'Metros Cuadrados', width: 250 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => <ActionCell params={params} />,
  },
];

export default Columns;

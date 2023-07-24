import React from 'react';
import AsignaturasButtons from '../../../utils/Components/AsignaturasButtons';

const columns = () => [
  { field: 'grado', headerName: 'Grado', width: 230 },
  { field: 'nombre', headerName: 'Nombre', width: 320 },
  { field: 'clave', headerName: 'Clave', width: 140 },
  { field: 'seriacion', headerName: 'Seriacion', width: 170 },
  { field: 'creditos', headerName: 'Creditos' },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <AsignaturasButtons
        id={params.id}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default columns;

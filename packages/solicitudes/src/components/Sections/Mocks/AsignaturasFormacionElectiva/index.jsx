import React from 'react';
import AsignaturasFormacionButtons from '../../../utils/Components/AsignaturasFormacionButtons';

const columns = () => [
  { field: 'grade', headerName: 'Grado', width: 70 },
  { field: 'name', headerName: 'Nombre', width: 170 },
  { field: 'clave', headerName: 'Clave' },
  { field: 'seriacion', headerName: 'Seriacion' },
  { field: 'creditos', headerName: 'Creditos' },
  { field: 'area', headerName: 'Area', width: 170 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <AsignaturasFormacionButtons
        id={params.id}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default columns;

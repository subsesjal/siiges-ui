import React from 'react';
import AsignaturasFormacionButtons from '../../../utils/Components/AsignaturasFormacionButtons';

const columns = () => [
  { field: 'grado', headerName: 'Grado', width: 190 },
  { field: 'nombre', headerName: 'Nombre', width: 250 },
  { field: 'clave', headerName: 'Clave' },
  { field: 'seriacion', headerName: 'Seriacion', width: 150 },
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

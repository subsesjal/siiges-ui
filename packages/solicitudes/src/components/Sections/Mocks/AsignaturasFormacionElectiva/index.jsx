import React from 'react';
import AsignaturasFormacionButtons from '../../../utils/Components/AsignaturasFormacionButtons';

const columns = () => [
  { field: 'nombre', headerName: 'Nombre', width: 450 },
  { field: 'clave', headerName: 'Clave', width: 80 },
  { field: 'seriacion', headerName: 'Seriacion', width: 300 },
  { field: 'creditos', headerName: 'Creditos', width: 90 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => <AsignaturasFormacionButtons id={params.id} />,
    sortable: false,
    filterable: false,
  },
];

export default columns;

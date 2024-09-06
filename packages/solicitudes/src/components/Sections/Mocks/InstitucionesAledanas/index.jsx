import React from 'react';
import InstitucionesAledanasButtons from '../../../utils/Components/InstitucionesAledanas';

const columns = (type) => [
  { field: 'nombre', headerName: 'Nombre de la institución', width: 570 },
  { field: 'tiempo', headerName: 'Tiempo de llegada', width: 370 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <InstitucionesAledanasButtons
        id={params.id}
        type={type}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default columns;

import React from 'react';
import InstitucionesAledanasButtons from '../../../utils/Components/InstitucionesAledanas';

const columns = () => [
  { field: 'nombre', headerName: 'Nombre de la institucion', width: 570 },
  { field: 'tiempo', headerName: 'Tiempo de llegada', width: 370 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => <InstitucionesAledanasButtons id={params.id} />,
    sortable: false,
    filterable: false,
  },
];

export default columns;

import React from 'react';
import InfraestructurasButtons from '../../../utils/Components/InfraestructurasButtons';

const columns = () => [
  { field: 'instalation', headerName: 'Instalacion', width: 200 },
  { field: 'capacity', headerName: 'Capacidad (alumnos)', width: 200 },
  { field: 'meters', headerName: 'Mts2' },
  { field: 'resources', headerName: 'Recursos materiales', width: 200 },
  { field: 'location', headerName: 'Ubicacion', width: 150 },
  { field: 'asignaturas', headerName: 'Asignaturas', width: 150 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => <InfraestructurasButtons id={params.id} />,
    sortable: false,
    filterable: false,
  },
];

export default columns;

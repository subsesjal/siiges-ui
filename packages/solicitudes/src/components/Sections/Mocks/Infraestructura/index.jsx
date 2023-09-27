import React from 'react';
import InfraestructurasButtons from '../../../utils/Components/InfraestructurasButtons';

const columns = () => [
  { field: 'tipoInstalacion', headerName: 'Instalacion', width: 200 },
  { field: 'capacidad', headerName: 'Capacidad (alumnos)', width: 200 },
  { field: 'metros', headerName: 'Mts2' },
  { field: 'recursos', headerName: 'Recursos materiales', width: 200 },
  { field: 'ubicacion', headerName: 'Ubicacion', width: 150 },
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

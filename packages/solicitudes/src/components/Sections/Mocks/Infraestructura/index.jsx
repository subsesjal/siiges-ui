import React from 'react';
import InfraestructurasButtons from '../../../utils/Components/InfraestructurasButtons';

const columns = (programaId) => [
  { field: 'tipoInstalacion', headerName: 'Instalación', width: 200 },
  { field: 'capacidad', headerName: 'Capacidad (alumnos)', width: 200 },
  { field: 'metros', headerName: 'M²' },
  { field: 'recursos', headerName: 'Recursos materiales', width: 200 },
  { field: 'ubicacion', headerName: 'Ubicación', width: 150 },
  { field: 'asignaturas', headerName: 'Asignaturas', width: 150 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <InfraestructurasButtons id={params.id} programaId={programaId} />
    ),
    sortable: false,
    filterable: false,
  },
];

export default columns;

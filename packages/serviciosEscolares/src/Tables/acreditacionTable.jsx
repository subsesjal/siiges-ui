import React from 'react';
import ActionsAcreditacionAsignaturas from '../Components/utils/ActionsAcreditacionAsignaturas';

const columnsAsignaturas = (grupoId) => [
  { field: 'clave', headerName: 'Clave', width: 200 },
  { field: 'nombre', headerName: 'Asignatura', width: 750 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <ActionsAcreditacionAsignaturas id={params.id} grupoId={grupoId} />
    ),
    sortable: false,
    filterable: false,
  },
];

export default columnsAsignaturas;

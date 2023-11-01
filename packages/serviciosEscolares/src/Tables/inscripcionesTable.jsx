import React from 'react';
import ActionsAsignaturas from '../Components/utils/ActionsAsignaturas';

const columnsAsignaturas = (handleCheckboxChange, selectedAsignaturas) => [
  { field: 'clave', headerName: 'Clave', width: 100 },
  { field: 'seriacion', headerName: 'Seriación', width: 200 },
  { field: 'asignatura', headerName: 'Asignatura', width: 650 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <ActionsAsignaturas
        id={params.id}
        onCheckboxChange={handleCheckboxChange}
        selectedAsignaturas={selectedAsignaturas}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default columnsAsignaturas;

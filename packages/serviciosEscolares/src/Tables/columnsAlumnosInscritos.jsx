import React from 'react';
import ActionsAsignaturas from '../Components/utils/ActionsAsignaturas';

const columnsAlumnosInscritos = (handleCheckboxChange, selectedAsignaturas, isConsulta) => [
  { field: 'clave', headerName: 'Clave', width: 100 },
  { field: 'seriacion', headerName: 'Seriación', width: 150 },
  { field: 'nombre', headerName: 'Asignatura', width: 300 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <ActionsAsignaturas
        id={params.id}
        onCheckboxChange={handleCheckboxChange}
        selectedAsignaturas={selectedAsignaturas}
        isConsulta={isConsulta}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default columnsAlumnosInscritos;

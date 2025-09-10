import React from 'react';
import ActionsAcreditacionAsignaturas from '../Components/utils/ActionsAcreditacionAsignaturas';

const columnsAsignaturas = (grupoId) => [
  { field: 'clave', headerName: 'Clave', width: 100 },
  { field: 'seriacion', headerName: 'Seriación', width: 250 },
  { field: 'nombre', headerName: 'Asignatura', width: 500 },
  {
    field: 'tipo',
    headerName: 'Tipo de asignaturas',
    width: 200,
    valueGetter: (params) => {
      if (params.row.tipo === 1) return 'Normal';
      if (params.row.tipo === 2) return 'Formación Electiva';
      return 'N/A';
    },
  },
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

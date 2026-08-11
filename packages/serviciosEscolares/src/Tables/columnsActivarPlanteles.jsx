import React from 'react';
import ButtonsActivarPlantel from '../Components/utils/ButtonsActivarPlantel';

const getColumnsActivarPlanteles = ({ onSuccess }) => [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'nombre', headerName: 'Plantel', width: 380 },
  { field: 'totalProgramas', headerName: 'Programas', width: 120 },
  {
    field: 'actions',
    headerName: 'Activación',
    width: 150,
    renderCell: (params) => (
      <ButtonsActivarPlantel
        programaIds={params.row.programaIds}
        activo={params.row.activo}
        onSuccess={onSuccess}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default getColumnsActivarPlanteles;

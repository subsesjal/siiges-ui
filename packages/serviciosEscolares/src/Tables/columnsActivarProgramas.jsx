import React from 'react';
import ButtonsActivarPrograma from '../Components/utils/ButtonsActivarPrograma';

const getColumnsActivarProgramas = ({ onSuccess }) => [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'nombre', headerName: 'Programa', width: 320 },
  { field: 'acuerdoRvoe', headerName: 'RVOE', width: 200 },
  {
    field: 'actions',
    headerName: 'Activación',
    width: 150,
    renderCell: (params) => (
      <ButtonsActivarPrograma
        id={params.row.id}
        permisoAlumno={params.row.permisoAlumno}
        onSuccess={onSuccess}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default getColumnsActivarProgramas;

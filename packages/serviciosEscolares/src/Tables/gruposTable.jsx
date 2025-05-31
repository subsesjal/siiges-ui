import React from 'react';
import ButtonsGrupos from '../Components/utils/ButtonsGrupos';

export default function getColumnsGrupos({ handleSuccess }) {
  return [
    { field: 'gradoNombre', headerName: 'Grado', width: 200 },
    { field: 'descripcion', headerName: 'Descripción', width: 200 },
    { field: 'turno', headerName: 'Turno', width: 250 },
    { field: 'generacion', headerName: 'Generación', width: 300 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => <ButtonsGrupos id={params.row} handleSuccess={handleSuccess} />,
      sortable: false,
      filterable: false,
    },
  ];
}

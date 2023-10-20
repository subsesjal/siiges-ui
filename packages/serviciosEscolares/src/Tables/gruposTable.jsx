import React from 'react';
import ButtonsGrupos from '../Components/utils/ButtonsGrupos';

const columnsGrupos = [
  { field: 'grado', headerName: 'Grado', width: 100 },
  { field: 'grupo', headerName: 'Grupo', width: 200 },
  { field: 'turno', headerName: 'Turno', width: 250 },
  { field: 'generacion', headerName: 'Generación', width: 400 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <ButtonsGrupos
        id={params.id}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default columnsGrupos;

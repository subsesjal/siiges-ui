import React from 'react';
import ButtonsProgramas from '../Components/utils/ButtonProgramas'

const columnsProgramas = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'nombre', headerName: 'Programa', width: 900 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <ButtonsProgramas
        id={params.id}
        url={`/serviciosEscolares/programas/${params.id}/editPrograma`}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default columnsProgramas;

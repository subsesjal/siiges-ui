import React from 'react';
import ButtonsProgramas from '../Components/utils/ButtonProgramas';

const columnsProgramas = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'nombre', headerName: 'Programa', width: 650 },
  { field: 'acuerdoRvoe', headerName: 'RVOE', width: 220 },
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

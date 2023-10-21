import React from 'react';
import ButtonsCiclosEscolares from '../Components/utils/ButtonsCiclosEscolares';

const columnsCiclosEscolares = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'nombre', headerName: 'Ciclo', width: 200 },
  { field: 'descripcion', headerName: 'Descripción', width: 700 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <ButtonsCiclosEscolares
        id={params.id}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default columnsCiclosEscolares;

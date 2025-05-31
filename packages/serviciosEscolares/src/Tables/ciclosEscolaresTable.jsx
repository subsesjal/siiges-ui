import React from 'react';
import ButtonsCiclosEscolares from '../Components/utils/ButtonsCiclosEscolares';

export default function getColumnsCiclosEscolares({ handleSuccess }) {
  return [
    {
      field: 'id',
      headerName: 'ID',
      width: 50,
      hide: true,
    },
    { field: 'nombre', headerName: 'Ciclo', width: 200 },
    { field: 'descripcion', headerName: 'Descripción', width: 700 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <ButtonsCiclosEscolares row={params.row} handleSuccess={handleSuccess} />
      ),
      sortable: false,
      filterable: false,
    },
  ];
}

import React from 'react';
import ButtonsCatalogoCiclosEscolares from '../Components/utils/ButtonsCatalogoCiclosEscolares';

const tiposCiclo = {
  1: 'Ciclos ordinarios/permanentes',
  2: 'Ciclos extemporáneos/especiales',
};

const getColumnsCatalogoCiclosEscolares = ({ onSuccess }) => [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'nombre', headerName: 'Nombre', width: 200 },
  {
    field: 'descripcion',
    headerName: 'Descripción',
    width: 270,
    valueGetter: (params) => tiposCiclo[params.row.tipo] || 'N/A',
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 250,
    renderCell: (params) => (
      <ButtonsCatalogoCiclosEscolares
        id={params.row.id}
        tipo={params.row.tipo}
        ciclosActivos={params.row.ciclosActivos}
        onSuccess={onSuccess}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default getColumnsCatalogoCiclosEscolares;

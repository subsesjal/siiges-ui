import React from 'react';
import ButtonsCatalogoTitulo from '../Components/utils/ButtonsCatalogoTitulos';

const catalogoTitulos = [
  {
    field: 'id', headerName: 'ID', width: 50, hide: true,
  },
  { field: 'folioControl', headerName: 'Folio de Control', width: 150 },
  { field: 'nombreCompleto', headerName: 'Nombre', width: 400 },
  { field: 'curp', headerName: 'CURP', width: 200 },
  { field: 'nombreCarrera', headerName: 'Nombre de carrera', width: 400 },
  { field: 'fechaExpedicion', headerName: 'Fecha de expedición', width: 200 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <ButtonsCatalogoTitulo
        id={params.id}
        fechaExpedicion={params.row.fechaExpedicion}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default catalogoTitulos;

import React from 'react';
import ButtonsCatalogoCertificado from '../Components/utils/ButtonsCatalogoCertificado';

const catalogoCertificados = [
  {
    field: 'id', headerName: 'ID', width: 50, hide: true,
  },
  { field: 'consecutivo', headerName: 'Consecutivo', width: 120 },
  { field: 'nombreCompleto', headerName: 'Nombre', width: 300 },
  { field: 'matricula', headerName: 'Matrícula', width: 150 },
  { field: 'folio', headerName: 'Folio', width: 150 },
  { field: 'foja', headerName: 'Foja', width: 100 },
  { field: 'libro', headerName: 'Libro', width: 100 },
  { field: 'fechaExpedicion', headerName: 'Fecha de expedición', width: 180 },
  { field: 'fechaTerminacion', headerName: 'Fecha de terminación', width: 180 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 100,
    renderCell: (params) => (
      <ButtonsCatalogoCertificado
        id={params.row.folioDocumentoAlumnoId}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default catalogoCertificados;

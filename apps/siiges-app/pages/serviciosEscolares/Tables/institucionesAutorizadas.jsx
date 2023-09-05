import React from 'react';
import ButtonsInstitucionesAutorizadas from '../Components/ButtonsInstitucionesAutorizadas';

const columns = [
  { field: 'nombre', headerName: 'Nombre', width: 300 },
  { field: 'razonSocial', headerName: 'Razón Social', width: 320 },
  {
    field: 'createdAt',
    headerName: 'Fecha',
    type: 'date',
    width: 180,
  },
  { field: 'claveIes', headerName: 'Clave Ies', width: 150 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <ButtonsInstitucionesAutorizadas
        id={params.id}
        planteles={`/serviciosEscolares/${params.id}/Planteles`}
        claveIES="#"
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default columns;

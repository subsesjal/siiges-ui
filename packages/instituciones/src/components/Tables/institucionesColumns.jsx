import React from 'react';
import { ActionButtons } from '@siiges-ui/shared';

const columns = (showModal) => [
  { field: 'nombre', headerName: 'Nombre', width: 400 },
  { field: 'razonSocial', headerName: 'Razón Social', width: 320 },
  { field: 'claveIes', headerName: 'Clave IES', width: 150 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <ActionButtons
        id={params.id}
        consultar={`/institucion/${params.id}/consultarInstitucion`}
        editar={`/institucion/${params.id}/editarInstitucion`}
        eliminar={showModal}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default columns;

import React from 'react';
import { ActionButtons } from '@siiges-ui/shared';

const commonColumns = () => [
  { field: 'nombre', headerName: 'Nombre', width: 200 },
  { field: 'usuario', headerName: 'Usuario', width: 130 },
  { field: 'correo', headerName: 'Correo', width: 200 },
  { field: 'rol', headerName: 'Rol', width: 180 },
  { field: 'estatus', headerName: 'Estatus', width: 120 },
  {
    field: 'fecha',
    headerName: 'Fecha de alta',
    type: 'date',
    width: 130,
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <ActionButtons
        id={params.id}
        editar={`/usuarios/editar/${params.id}`}
        consultar={`/usuarios/consultar/${params.id}`}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

const adminColumns = (showModal) => [
  { field: 'nombre', headerName: 'Nombre', width: 200 },
  { field: 'usuario', headerName: 'Usuario', width: 150 },
  { field: 'correo', headerName: 'Correo', width: 200 },
  { field: 'rol', headerName: 'Rol', width: 180 },
  { field: 'estatus', headerName: 'Estatus', width: 120 },
  {
    field: 'fecha',
    headerName: 'Fecha de alta',
    type: 'date',
    width: 130,
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <ActionButtons
        id={params.id}
        editar={`/usuarios/editar/${params.id}`}
        consultar={`/usuarios/consultar/${params.id}`}
        eliminar={() => showModal(params)}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export {
  commonColumns,
  adminColumns,
};

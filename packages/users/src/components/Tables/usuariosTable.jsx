import React from 'react';
import UsuariosActions from '../Usuarios/UsuariosActions';

const commonColumns = [
  { field: 'nombre', headerName: 'Nombre', width: 200 },
  { field: 'usuario', headerName: 'Usuario', width: 150 },
  { field: 'correo', headerName: 'Correo', width: 250 },
  { field: 'rol', headerName: 'Rol', width: 150 },
  {
    field: 'fecha',
    headerName: 'Fecha de alta',
    type: 'date',
    width: 130,
  },
  { field: 'estatus', headerName: 'Estatus', width: 120 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <UsuariosActions
        id={params.id}
        url={`/usuarios/consultar/${params.id}`}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

const adminColumns = [
  { field: 'nombre', headerName: 'Nombre', width: 200 },
  { field: 'usuario', headerName: 'Usuario', width: 150 },
  { field: 'correo', headerName: 'Correo', width: 250 },
  { field: 'rol', headerName: 'Rol', width: 150 },
  {
    field: 'fecha',
    headerName: 'Fecha de alta',
    type: 'date',
    width: 130,
  },
  { field: 'estatus', headerName: 'Estatus', width: 120 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <UsuariosActions
        id={params.id}
        url={`/usuarios/consultar/${params.id}`}
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

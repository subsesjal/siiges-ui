import React from 'react';
import NotificacionActions from '../Notificaciones/NotificacionActions';

const commonColumns = [
  { field: 'asunto', headerName: 'Asunto', width: 300 },
  { field: 'notificacion', headerName: 'Notificación', width: 650 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <NotificacionActions
        id={params.id}
        url={`/notificaciones/${params.id}/consultar`}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

const adminColumns = [
  { field: 'usuario', headerName: 'Usuario', width: 230 },
  { field: 'email', headerName: 'Correo electrónico', width: 200 },
  { field: 'asunto', headerName: 'Asunto', width: 150 },
  { field: 'notificacion', headerName: 'Notificación', width: 300 },
  { field: 'estatus', headerName: 'Estatus', width: 110 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 110,
    renderCell: (params) => (
      <NotificacionActions
        id={params.id}
        url={`/notificaciones/consultar/${params.id}`}
      />
    ),
  },
];

export {
  commonColumns,
  adminColumns,
};

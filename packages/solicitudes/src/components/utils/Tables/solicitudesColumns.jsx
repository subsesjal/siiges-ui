import React from 'react';
import SolicitudesActions from '../Components/SolicitudesActions';

const columnsSolicitudes = (rol) => [
  {
    field: 'id', headerName: 'ID', width: 80, hide: true,
  },
  {
    field: 'estatus', headerName: 'Estatus ID', width: 80, hide: true,
  },
  { field: 'folio', headerName: 'Folio', width: 125 },
  { field: 'tipoSolicitud', headerName: 'Tipo de solicitud', width: 200 },
  { field: 'programa', headerName: 'Plan de estudios', width: 300 },
  { field: 'estatusSolicitudId', headerName: 'Estatus', width: 200 },
  { field: 'acuerdoRvoe', headerName: 'RVOE', width: 300 },
  {
    field: 'institucion', headerName: 'Institución', width: 400, hide: rol === 'representante' || rol === 'gestor',
  },
  { field: 'plantel', headerName: 'Plantel', width: 300 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => {
      const { id, estatus } = params.row;
      return <SolicitudesActions id={id} estatus={estatus} />;
    },
  },
];

export default columnsSolicitudes;

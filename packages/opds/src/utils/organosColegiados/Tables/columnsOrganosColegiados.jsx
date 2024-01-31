import React from 'react';
import ButtonsOrganosColegiados from '../../../components/organosColegiados/Tables/ButtonsOrganosColegiados';

const columnsOrganosColegiados = [
  {
    field: 'institucionNombre',
    headerName: 'Institución',
    width: 350,
    valueGetter: (params) => params.row?.institucion?.nombre || 'Información no disponible',
  },
  { field: 'fecha', headerName: 'Año', width: 120 },
  {
    field: 'periodoNombre',
    headerName: 'Periodo',
    width: 150,
    valueGetter: (params) => params.row.periodo?.nombre,
  },
  {
    field: 'sesionNombre',
    headerName: 'Sesión',
    width: 150,
    valueGetter: (params) => params.row.sesion?.nombre,
  },
  { field: 'acuerdosProgreso', headerName: 'Acuerdos en progreso', width: 220 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 120,
    renderCell: (params) => <ButtonsOrganosColegiados params={params.row} />,
    sortable: false,
    filterable: false,
  },
];

export default columnsOrganosColegiados;

import React from 'react';
import { Skeleton } from '@mui/material';
import ButtonsOrganosColegiados from '../../../components/organosColegiados/Tables/ButtonsOrganosColegiados';

const columnsOrganosColegiados = [
  {
    field: 'institucionNombre',
    headerName: 'Institución',
    width: 350,
    renderCell: (params) => params.row?.institucion?.nombre || (
    <Skeleton variant="text" width="100%" />
    ),
  },
  {
    field: 'fecha',
    headerName: 'Año',
    width: 120,
    renderCell: (params) => params.row?.fecha || <Skeleton variant="text" width="100%" />,
  },
  {
    field: 'periodoNombre',
    headerName: 'Periodo',
    width: 150,
    renderCell: (params) => params.row.periodo?.nombre || <Skeleton variant="text" width="100%" />,
  },
  {
    field: 'sesionNombre',
    headerName: 'Sesión',
    width: 150,
    renderCell: (params) => params.row.sesion?.nombre || <Skeleton variant="text" width="100%" />,
  },
  {
    field: 'acuerdosProgreso',
    headerName: 'Acuerdos en progreso',
    width: 220,
    renderCell: (params) => params.row.sesion?.nombre || <Skeleton variant="text" width="100%" />,
  },
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

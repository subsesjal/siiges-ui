import React from 'react';
import { Skeleton } from '@mui/material';
import { periodData, sessionData } from '@siiges-ui/opds/src/utils/constants';
import ButtonsPlanMaestro from '../../../components/fortalecimiento/Tables/ButtonsPlanMaestro';
import ConsultPlanMaestro from '../../../components/fortalecimiento/Tables/ConsultPlanMaestro';

const columnsPlanMaestro = [
  {
    field: 'planMaestro',
    headerName: 'Plan Maestro',
    width: 150,
    renderCell: (params) => <ConsultPlanMaestro id={params.row.id} />,
    sortable: false,
    filterable: false,
  },
  {
    field: 'periodoNombre',
    headerName: 'Periodo',
    width: 325,
    renderCell: (params) => periodData.find((period) => period.id === params.row.periodoId)
      .nombre || (
      <Skeleton variant="text" width="100%" />
    ),
  },
  {
    field: 'sesionNombre',
    headerName: 'Sesión',
    width: 325,
    renderCell: (params) => sessionData.find((session) => session.id === params.row.sesionId)
      .nombre || <Skeleton variant="text" width="100%" />,
  },
  {
    field: 'fecha ',
    headerName: 'Año',
    width: 150,
    renderCell: (params) => new Date(params.row.fecha).getFullYear() || (
    <Skeleton variant="text" width="100%" />
    ),
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => <ButtonsPlanMaestro id={params.row.id} />,
    sortable: false,
    filterable: false,
  },
];

export default columnsPlanMaestro;

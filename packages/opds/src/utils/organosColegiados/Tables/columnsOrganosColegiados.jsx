import React from 'react';
import ButtonsOrganosColegiados from '../../../components/organosColegiados/Tables/ButtonsOrganosColegiados';

const columnsOrganosColegiados = [
  { field: 'institucion', headerName: 'Institución', width: 350 },
  { field: 'ano', headerName: 'Año', width: 90 },
  { field: 'sesion', headerName: 'Sesión', width: 100 },
  {
    field: 'acuerdosConcluidos',
    headerName: 'Acuerdos concluidos',
    width: 220,
  },
  { field: 'acuerdosProgreso', headerName: 'Acuerdos en progreso', width: 220 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 120,
    renderCell: (params) => <ButtonsOrganosColegiados id={params.row.id} />,
    sortable: false,
    filterable: false,
  },
];

export default columnsOrganosColegiados;

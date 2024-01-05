import React from 'react';
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
  { field: 'nombre', headerName: 'Proyecto', width: 650 },
  { field: 'ano', headerName: 'Año', width: 150 },
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

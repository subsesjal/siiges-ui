import React from 'react';
import FechaExtraordinario from '../Components/utils/Extraordinarios/FechaExtraordinario';
import CalificacionExtraordinario from '../Components/utils/Extraordinarios/CalificacionExtraordinario';

const columnsInscritosOrdinario = (disabled) => [
  {
    field: 'matricula',
    headerName: 'Matricula',
    width: 150,
  },
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 500,
    valueGetter: (params) => {
      const { nombre, apellidoPaterno, apellidoMaterno } = params.row.persona || {};
      return (
        [nombre, apellidoPaterno, apellidoMaterno].filter(Boolean).join(' ')
        || ''
      );
    },
  },
  {
    field: 'ordinario',
    headerName: 'Calificación Ordinario',
    width: 220,
    renderCell: (params) => (
      <CalificacionExtraordinario id={params.id} disabled={disabled} />
    ),
    sortable: false,
    filterable: false,
  },
  {
    field: 'fechaExamen',
    headerName: 'Fecha de examen',
    width: 220,
    renderCell: (params) => (
      <FechaExtraordinario id={params.id} disabled={disabled} />
    ),
    sortable: false,
    filterable: false,
  },
];

export default columnsInscritosOrdinario;

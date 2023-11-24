import React from 'react';
import FechaExtraordinario from '../Components/utils/Extraordinarios/FechaExtraordinario';
import CalificacionExtraordinario from '../Components/utils/Extraordinarios/CalificacionExtraordinario';

const columnsInscritosExtra = (disabled, updateCalificaciones) => [
  { field: 'matricula', headerName: 'Matricula', width: 150 },
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
    field: 'extraordinario',
    headerName: 'Calificación Extraordinario',
    width: 220,
    renderCell: (params) => (
      <CalificacionExtraordinario
        id={params.id}
        disabled={disabled}
        updateCalificaciones={updateCalificaciones}
      />
    ),
    sortable: false,
    filterable: false,
  },
  {
    field: 'fechaExamen',
    headerName: 'Fecha de examen',
    width: 220,
    renderCell: (params) => (
      <FechaExtraordinario
        id={params.id}
        disabled={disabled}
        updateCalificaciones={
          (alumnoId, newFechaExamen) => updateCalificaciones(alumnoId, newFechaExamen, 'fechaExamen')
        }
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default columnsInscritosExtra;

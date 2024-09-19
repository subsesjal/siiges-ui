import React from 'react';
import FechaExamenInput from '../Components/utils/Calificaciones/FechaExamenInput';
import CalificacionInput from '../Components/utils/Calificaciones/CalificacionInput';

const columnsInscritosExtra = (
  disabled,
  updateCalificaciones,
  isExtraordinarioEnabled,
) => [
  {
    field: 'matricula',
    headerName: 'Matrícula',
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
    field: 'extraordinario',
    headerName: 'Calificación Extraordinario',
    width: 220,
    renderCell: (params) => {
      const calificacion = params.row.calificaciones[1]?.calificacion || '';
      return (
        <CalificacionInput
          id={params.id}
          value={calificacion}
          disabled={disabled || !isExtraordinarioEnabled(params.row.id)}
          updateCalificaciones={(alumnoId, newValue) => updateCalificaciones(alumnoId, newValue, 'calificacion', 2)}
        />
      );
    },
    sortable: false,
    filterable: false,
  },
  {
    field: 'fechaExamen',
    headerName: 'Fecha de examen',
    width: 220,
    renderCell: (params) => {
      const fechaExamen = params.row.calificaciones[1]?.fechaExamen || '';
      return (
        <FechaExamenInput
          id={params.id}
          value={fechaExamen}
          disabled={disabled || !isExtraordinarioEnabled(params.row.id)}
          updateCalificaciones={(alumnoId, newFechaExamen) =>
            updateCalificaciones(alumnoId, newFechaExamen, 'fechaExamen', 2)
          }
        />
      );
    },
    sortable: false,
    filterable: false,
  },
];

export default columnsInscritosExtra;

import React from 'react';
import FechaExamenInput from '../Components/utils/Calificaciones/FechaExamenInput';
import CalificacionExtraInput from '../Components/utils/Calificaciones/CalificacionExtraInput';

const EGRESADO = 3;
const BAJA = 4;

const columnsInscritosExtra = (
  disabled,
  updateCalificaciones,
  isExtraordinarioEnabled,
  calificacionMinima,
  calificacionMaxima,
  calificacionDecimal,
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
      const isDisabled = disabled
        || !isExtraordinarioEnabled(params.row.id)
        || params.row.situacionId === EGRESADO
        || params.row.situacionId === BAJA;

      return (
        <CalificacionExtraInput
          id={params.id}
          value={calificacion}
          disabled={isDisabled}
          updateCalificaciones={(alumnoId, newValue) => updateCalificaciones(alumnoId, newValue, 'calificacion', 2)}
          calificacionMinima={calificacionMinima}
          calificacionMaxima={calificacionMaxima}
          calificacionDecimal={calificacionDecimal}
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
      const isDisabled = disabled
        || !isExtraordinarioEnabled(params.row.id)
        || params.row.situacionId === EGRESADO
        || params.row.situacionId === BAJA;

      const calificacionExtraordinaria = params.row.calificaciones.find(
        ({ tipo }) => tipo === 2,
      );

      let fechaExamen = '';
      if (calificacionExtraordinaria) {
        fechaExamen = calificacionExtraordinaria.fechaExamen;
      }
      return (
        <FechaExamenInput
          id={params.id}
          value={fechaExamen}
          disabled={isDisabled}
          updateCalificaciones={(alumnoId, newFechaExamen) => updateCalificaciones(alumnoId, newFechaExamen, 'fechaExamen', 2)}
        />
      );
    },
    sortable: false,
    filterable: false,
  },
];

export default columnsInscritosExtra;

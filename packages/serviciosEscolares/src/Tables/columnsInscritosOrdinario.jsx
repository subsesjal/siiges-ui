import React from 'react';
import FechaExamenInput from '../Components/utils/Calificaciones/FechaExamenInput';
import CalificacionInput from '../Components/utils/Calificaciones/CalificacionInput';

const columnsInscritosOrdinario = (
  disabled,
  updateCalificaciones,
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
    field: 'ordinario',
    headerName: 'Calificación Ordinario',
    width: 220,
    renderCell: (params) => {
      const calificacion = params.row.calificaciones[0]?.calificacion || '';
      const isDisabled = disabled || params.row.situacionId === 3;
      return (
        <CalificacionInput
          id={params.id}
          value={calificacion}
          disabled={isDisabled}
          updateCalificaciones={updateCalificaciones}
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
      const fechaExamen = params.row.calificaciones[0]?.fechaExamen || '';
      const isDisabled = disabled || params.row.situacionId === 3;
      return (
        <FechaExamenInput
          id={params.id}
          disabled={isDisabled}
          value={fechaExamen}
          updateCalificaciones={(alumnoId, newFechaExamen) => updateCalificaciones(alumnoId, newFechaExamen, 'fechaExamen')}
        />
      );
    },
    sortable: false,
    filterable: false,
  },
];

export default columnsInscritosOrdinario;

import React from 'react';
import FechaExamenInput from '../Components/utils/Calificaciones/FechaExamenInput';
import CalificacionInput from '../Components/utils/Calificaciones/CalificacionInput';

const EGRESADO = 3;
const BAJA = 4;

const columnsInscritosOrdinario = (
  disabled,
  updateCalificaciones,
  calificacionMinima,
  calificacionMaxima,
  calificacionDecimal,
  fechaExamenes,
  calificaciones,
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
      const califGuardada = calificaciones.find(
        (c) => c.alumnoId === params.id && c.tipo === 1,
      )?.calificacion;

      const calificacion = califGuardada ?? params.row.calificaciones[0]?.calificacion ?? '';

      const isDisabled = disabled
        || params.row.situacionId === EGRESADO
        || params.row.situacionId === BAJA;

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
      const fechaGuardada = calificaciones.find(
        (c) => c.alumnoId === params.id && c.tipo === 1,
      )?.fechaExamen;

      const currentFechaExamen = fechaGuardada ?? params.row.calificaciones[0]?.fechaExamen ?? '';
      const fechaExamen = !currentFechaExamen && fechaExamenes
        ? fechaExamenes
        : currentFechaExamen;

      const isDisabled = disabled
        || params.row.situacionId === EGRESADO
        || params.row.situacionId === BAJA;

      return (
        <FechaExamenInput
          id={params.id}
          disabled={isDisabled}
          value={fechaExamen}
          updateCalificaciones={updateCalificaciones}
        />
      );
    },
    sortable: false,
    filterable: false,
  },
];

export default columnsInscritosOrdinario;

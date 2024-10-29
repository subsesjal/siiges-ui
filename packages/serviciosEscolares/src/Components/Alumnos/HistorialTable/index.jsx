import React from 'react';
import { DataTable } from '@siiges-ui/shared';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import historialColumns from '../../../Tables/historialAlumnosTable';

export default function HistorialTable({ alumno }) {
  const rows = alumno
    ?.sort((a, b) => a.asignaturaId - b.asignaturaId || a.tipo - b.tipo)
    .map((record) => ({
      id: record.id,
      ciclo: record.grupo.cicloEscolar.nombre,
      clave: record.asignatura.clave,
      seriacion: record.asignatura.seriacion || 'N/A',
      asignatura: record.asignatura.nombre,
      tipo: record.tipo === 1 ? 'Ordinario' : 'Extraordinario',
      calificacion: record.calificacion,
      fechaExamen: record.fechaExamen,
    })) || [];

  return (
    <Grid container sx={{ marginTop: 2 }}>
      <DataTable
        rows={rows}
        columns={historialColumns}
        title="Historial del Alumno"
      />
    </Grid>
  );
}

HistorialTable.propTypes = {
  alumno: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      alumnoId: PropTypes.number.isRequired,
      grupo: PropTypes.shape({
        cicloEscolar: PropTypes.shape({
          nombre: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      asignatura: PropTypes.shape({
        clave: PropTypes.string.isRequired,
        seriacion: PropTypes.string,
        nombre: PropTypes.string.isRequired,
      }).isRequired,
      tipo: PropTypes.number.isRequired,
      calificacion: PropTypes.string.isRequired,
      fechaExamen: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

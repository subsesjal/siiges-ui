import React from 'react';
import { Button, DataTable } from '@siiges-ui/shared';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import historialColumns from '../../../Tables/historialAlumnosTable';

export default function HistorialTable({ alumno }) {
  const rows = alumno.map((record) => ({
    id: record.alumnoId,
    ciclo: record.grupo.cicloEscolar.nombre,
    clave: record.asignatura.clave,
    seriacion: record.asignatura.seriacion || 'N/A',
    asignatura: record.asignatura.nombre,
    tipo: record.tipo === 1 ? 'Ordinario' : 'Extraordinario',
    calificacion: record.calificacion,
    fechaExamen: record.fechaExamen,
  }));

  return (
    <Grid container sx={{ marginTop: 2 }}>
      <Grid item xs={12}>
        <Button
          text="Descargar"
          type="download"
          onClick={() => {
            // Acción de descarga, por ahora sin funcionalidad
          }}
        />
      </Grid>
      <DataTable
        rows={rows}
        columns={historialColumns}
        title="Historial del Alumno"
      />
    </Grid>
  );
}

HistorialTable.propTypes = {
  alumno: PropTypes.arrayOf(PropTypes.object).isRequired,
};

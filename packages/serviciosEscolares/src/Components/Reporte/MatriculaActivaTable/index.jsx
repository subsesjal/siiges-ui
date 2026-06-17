import React from 'react';
import { Grid } from '@mui/material';
import { DataTable, LabelData } from '@siiges-ui/shared';
import PropTypes from 'prop-types';

const columnsBusquedaGeneral = [
  { field: 'programa', headerName: 'Programa', width: 900 },
  { field: 'totalAlumnos', headerName: 'Total de Alumnos', width: 200 },
];

const columnsBusquedaPrograma = [
  { field: 'institucion', headerName: 'Institución', width: 350 },
  { field: 'plantel', headerName: 'Plantel', width: 300 },
  { field: 'programa', headerName: 'Programa', width: 300 },
  { field: 'totalAlumnos', headerName: 'Total de Alumnos', width: 150 },
];

export default function MatriculaActivaTable({
  matriculasActivas,
  busquedaGeneral,
  totalGeneral,
}) {
  const columns = !busquedaGeneral
    ? columnsBusquedaGeneral
    : columnsBusquedaPrograma;

  const rows = matriculasActivas.map((programas) => ({
    ...programas,
    id: programas.programaId,
    plantel: programas.plantel?.domicilio
      ? `${programas.plantel.domicilio.calle} ${programas.plantel.domicilio.numeroExterior}`
      : '',
  }));

  return (
    <Grid container spacing={2}>
      {totalGeneral !== null && (
        <Grid item xs={12} sx={{ mt: 2 }}>
          <LabelData title="Total de matrículas activas:" subtitle={totalGeneral.toString()} />
        </Grid>
      )}
      <Grid item xs={12}>
        <DataTable title="Alumnos" columns={columns} rows={rows} />
      </Grid>
    </Grid>
  );
}

MatriculaActivaTable.defaultProps = {
  matriculasActivas: [],
  totalGeneral: null,
};

MatriculaActivaTable.propTypes = {
  busquedaGeneral: PropTypes.bool.isRequired,
  totalGeneral: PropTypes.number,
  matriculasActivas: PropTypes.arrayOf(
    PropTypes.shape({
      programaId: PropTypes.number.isRequired,
      programa: PropTypes.string,
      institucion: PropTypes.string,
      totalAlumnos: PropTypes.number,
    }),
  ),
};

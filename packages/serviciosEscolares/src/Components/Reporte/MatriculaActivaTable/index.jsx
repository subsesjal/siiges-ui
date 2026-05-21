import React from 'react';
import { Grid } from '@mui/material';
import { DataTable } from '@siiges-ui/shared';
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

export default function MatriculaActivaTable({ matriculasActivas, busquedaGeneral }) {
  const columns = !busquedaGeneral ? columnsBusquedaGeneral : columnsBusquedaPrograma;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DataTable
          title="Alumnos"
          columns={columns}
          rows={matriculasActivas}
        />
      </Grid>
    </Grid>
  );
}

MatriculaActivaTable.defaultProps = {
  matriculasActivas: [],
};

MatriculaActivaTable.propTypes = {
  busquedaGeneral: PropTypes.bool.isRequired,
  matriculasActivas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombreCompleto: PropTypes.string,
      curp: PropTypes.string,
      claveTrabajo: PropTypes.string,
      programa: PropTypes.string,
      matricula: PropTypes.string,
      institucion: PropTypes.string,
    }),
  ),
};

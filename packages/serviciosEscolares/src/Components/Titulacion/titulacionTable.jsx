import { DataTable } from '@siiges-ui/shared';
import React from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import titulacionAlumnos from '../../Tables/titulacionTable';

export default function TitulacionTable({ alumnos }) {
  return (
    <Grid container sx={{ marginTop: 2 }}>
      <DataTable
        rows={alumnos}
        columns={titulacionAlumnos}
        title="Tabla de alumnos"
      />
    </Grid>
  );
}

TitulacionTable.propTypes = {
  alumnos: PropTypes.arrayOf(PropTypes.string).isRequired,
};

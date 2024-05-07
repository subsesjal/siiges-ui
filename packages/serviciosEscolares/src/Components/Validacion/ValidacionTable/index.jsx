import { DataTable } from '@siiges-ui/shared';
import React from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import columnsValidacion from '../../../Tables/validacionTable';

export default function ValidacionTable({ institucion, alumnos, programa }) {
  return (
    <Grid container sx={{ marginTop: 2 }}>
      <DataTable
        rows={alumnos}
        columns={columnsValidacion(programa, institucion)}
        title="Tabla de validaciones"
      />
    </Grid>
  );
}

ValidacionTable.propTypes = {
  alumnos: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number }))
    .isRequired,
  programa: PropTypes.number.isRequired,
  institucion: PropTypes.number.isRequired,
};

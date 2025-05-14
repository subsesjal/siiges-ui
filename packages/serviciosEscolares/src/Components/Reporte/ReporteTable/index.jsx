import { DataTable } from '@siiges-ui/shared';
import React from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import columnsReporte from '../../../Tables/reporteTable';

export default function ReporteTable({ alumnos }) {
  return (
    <Grid container sx={{ marginTop: 2 }}>
      <DataTable
        rows={alumnos}
        columns={columnsReporte()}
        title="Tabla de alumnos"
      />
    </Grid>
  );
}

ReporteTable.propTypes = {
  alumnos: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number }))
    .isRequired,
};

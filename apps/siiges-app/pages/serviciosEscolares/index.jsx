import React from 'react';
import { Layout, DataTable } from '@siiges-ui/shared';
import { Grid } from '@mui/material';
import columns from './Tables/institucionesAutorizadas';
import getInstituciones from '../institucion/utils/getInstituciones';

export default function serviciosEscolares() {
  const { instituciones, loading } = getInstituciones();
  let rows = {};

  if (instituciones !== undefined) {
    rows = instituciones;
  }

  return (
    <Layout
      title="Instituciones"
      subtitle="Consulta todas las instituciones registradas"
    >
      <Grid container>
        {loading ? (
          <DataTable
            rows={rows}
            columns={columns}
            title="Tabla de instituciones"
          />
        ) : (
          <div />
        )}
      </Grid>
    </Layout>
  );
}

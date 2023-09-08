import React from 'react';
import { Layout, DataTable } from '@siiges-ui/shared';
import { Grid } from '@mui/material';
import getInstituciones from '@siiges-ui/instituciones/src/utils/getInstituciones';
import columns from '@siiges-ui/serviciosescolares/src/Tables/institucionesAutorizadas';

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

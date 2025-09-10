import { Grid } from '@mui/system';
import { ConsultEquivalencia } from '@siiges-ui/revalidaciones';
import { Layout } from '@siiges-ui/shared';
import React from 'react';

export default function ConsultarEquivalencia() {
  return (
    <Layout title="Consultar Solicitud de Equivalencias">
      <Grid container>
        <Grid item xs={12}>
          <ConsultEquivalencia />
        </Grid>
      </Grid>
    </Layout>
  );
}

import { Grid } from '@mui/material';
import { ConsultRevalidacion } from '@siiges-ui/revalidaciones';
import { Layout } from '@siiges-ui/shared';
import React from 'react';

export default function ConsultarRevalidacion() {
  return (
    <Layout title="Consultar Solicitud de Revalidación">
      <Grid container>
        <Grid item xs={12}>
          <ConsultRevalidacion />
        </Grid>
      </Grid>
    </Layout>
  );
}

import { Grid } from '@mui/system';
import { ConsultRevalidacion } from '@siiges-ui/revalidaciones';
import {
  ButtonSimple, Layout,
} from '@siiges-ui/shared';
import { useRouter } from 'next/router';
import React from 'react';

export default function ConsultarRevalidacion() {
  const router = useRouter();

  return (
    <Layout title="Consultar Solicitud de Revalidación">
      <Grid container>
        <Grid item xs={12}>
          <ConsultRevalidacion />
        </Grid>
        <Grid item xs={6}>
          <ButtonSimple text="Regresar" design="confirm" onClick={() => { router.back(); }} />
        </Grid>
      </Grid>
    </Layout>
  );
}

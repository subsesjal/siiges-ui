import { Grid } from '@mui/system';
import { ConsultEquivalencia } from '@siiges-ui/revalidaciones';
import {
  ButtonSimple, Layout,
} from '@siiges-ui/shared';
import { useRouter } from 'next/router';
import React from 'react';

export default function ConsultarEquivalencia() {
  const router = useRouter();

  return (
    <Layout title="Consultar Solicitud de Equivalencias">
      <Grid container>
        <Grid item xs={12}>
          <ConsultEquivalencia />
        </Grid>
        <Grid item xs={6}>
          <ButtonSimple text="Regresar" align="right" design="confirm" onClick={() => { router.back(); }} />
        </Grid>
      </Grid>
    </Layout>
  );
}

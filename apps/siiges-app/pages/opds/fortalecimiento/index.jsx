import { Grid } from '@mui/material';
import { ButtonSimple, Layout } from '@siiges-ui/shared';
import { InstitucionesCarousel } from '@siiges-ui/opds';
import React from 'react';

export default function fortalicimiento() {
  return (
    <Layout title="Fortalecimiento">
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ mt: 3 }}>
          <InstitucionesCarousel />
        </Grid>
        <Grid item xs={12}>
          <ButtonSimple
            text="Reporte Concentrado"
            onClick={() => {}}
            align="right"
          />
        </Grid>
      </Grid>
    </Layout>
  );
}

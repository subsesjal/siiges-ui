import {
  Divider, Grid, TextField, Typography,
} from '@mui/material';
import {
  Button,
  ButtonSimple,
  LabelData,
  Layout,
  Select,
} from '@siiges-ui/shared';
import { InstitucionesCarousel } from '@siiges-ui/opds';
import React from 'react';

export default function presupuesto() {
  return (
    <Layout title="Presupuestos">
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ mt: 3 }}>
          <InstitucionesCarousel opdType="presupuesto" />
        </Grid>
      </Grid>
    </Layout>
  );
}

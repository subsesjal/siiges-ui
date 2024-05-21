import { DataTable, Layout } from '@siiges-ui/shared';
import { Grid } from '@mui/material';
import React from 'react';
import { MisInspeccionesColumns } from '@siiges-ui/inspecciones';

export default function MisInspecciones() {
  return (
    <Layout title="Mis inspecciones">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DataTable title="Lista de inspecciones" rows={[]} columns={MisInspeccionesColumns} />
        </Grid>
      </Grid>
    </Layout>
  );
}

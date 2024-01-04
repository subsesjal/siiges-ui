import { Grid } from '@mui/material';
import { DataTable, Layout } from '@siiges-ui/shared';
import React from 'react';
import { columnsAnteproyecto } from '@siiges-ui/opds';

export default function Anteproyecto() {
  return (
    <Layout
      title="Presupuesto"
      subtitle="Resumen por Capítulo y Origen del Recurso de Acuerdo a lo Reportado en la Primera Sesión Ordinaria"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DataTable
            columns={columnsAnteproyecto}
            rows={[]}
            title="Presupuesto de egresos 2024"
          />
        </Grid>
      </Grid>
    </Layout>
  );
}

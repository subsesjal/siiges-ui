import { Grid, TextField, Typography } from '@mui/material';
import {
  ButtonSimple, LabelData, Layout, Select, useApi,
} from '@siiges-ui/shared';
import React from 'react';
import { useRouter } from 'next/router';
import { sessionData, periodData } from '@siiges-ui/opds/src/utils/constants';

export default function presupuesto() {
  const year = new Date().getFullYear();
  const router = useRouter();
  const { id } = router.query;

  const { data } = useApi({
    endpoint: `api/v1/presupuestos/instituciones/${id}`,
  });
  const anio = [
    { id: 1, nombre: 2022 },
    { id: 2, nombre: 2023 },
    { id: 3, nombre: 2024 },
    { id: 4, nombre: 2025 },
  ];

  console.log(data.filter(({ periodoId }) => periodoId === 2));
  const handleEgresos = () => {
    router.push(`/opds/presupuesto/${id}/egresos`);
  };

  const handleAnteproyecto = () => {
    router.push(`/opds/presupuesto/${id}/anteproyecto`);
  };

  return (
    <Layout title="Presupuesto">
      <Grid container spacing={2}>
        {/* <Grid item xs={3}>
          <Select title="Institucion" options={[]} name="institucion" />
        </Grid> */}
        <Grid item xs={4}>
          <Select title="Periodo" options={periodData} name="periodo" />
        </Grid>
        <Grid item xs={4}>
          <Select title="Sesión" options={sessionData} name="sesion" />
        </Grid>
        <Grid item xs={4}>
          <Select title="Año" options={anio} name="ano" />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Convenio
            {' '}
            {year}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <LabelData title="Estatal" subtitle="$ 56,458,815.00" />
        </Grid>
        <Grid item xs={4}>
          <LabelData title="Federal" subtitle="$ 56,458,815.00" />
        </Grid>
        <Grid item xs={4}>
          <LabelData title="Total" subtitle="$ 56,458,815.00" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="observacionesConvenio"
            label="Observaciones"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Presupuestos
            {' '}
            {year}
            {' '}
            Autorizados por las juntas directivas durante la
            primera sesión ordinaria del año
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <LabelData title="Estatal" subtitle="$ 56,458,815.00" />
        </Grid>
        <Grid item xs={4}>
          <LabelData title="Federal" subtitle="$ 56,458,815.00" />
        </Grid>
        <Grid item xs={4}>
          <LabelData title="Total" subtitle="$ 56,458,815.00" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="observacionesPresupuesto"
            label="Observaciones"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={6}>
          <ButtonSimple
            text={`Anteproyecto de egresos ${year}`}
            onClick={handleAnteproyecto}
            align="right"
          />
        </Grid>
        <Grid item xs={6}>
          <ButtonSimple
            text={`Presupuesto de egresos ${year}`}
            onClick={handleEgresos}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}

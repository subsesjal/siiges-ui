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
import React from 'react';
import { useRouter } from 'next/router';

export default function presupuesto() {
  const year = new Date().getFullYear();
  const router = useRouter();

  const handleEgresos = () => {
    router.push('/opds/presupuesto/egresos');
  };

  const handleAnteproyecto = () => {
    router.push('/opds/presupuesto/anteproyecto');
  };

  return (
    <Layout title="Presupuesto">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Select title="Institución" options={[]} name="institucion" />
        </Grid>
        <Grid item xs={3}>
          <Select title="Periodo" options={[]} name="periodo" />
        </Grid>
        <Grid item xs={3}>
          <Select title="Sesión" options={[]} name="sesion" />
        </Grid>
        <Grid item xs={3}>
          <Select title="Año" options={[]} name="ano" />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h6">
            Convenio
            {' '}
            {year}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button text="Guardar" onClick={() => {}} type="add" align="right" />
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

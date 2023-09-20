import { Grid, Typography } from '@mui/material';
import { Input, InputNumber } from '@siiges-ui/shared';
import React from 'react';

export default function UbicacionPlantel() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Ubicacion del Plantel</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={6}>
          <Input id="nombre" label="Nombre(s)" name="nombre" auto="nombre" />
        </Grid>
        <Grid item xs={6}>
          <InputNumber
            id="tiempoLLegada"
            label="Tiempo aproximado para llegar (minutos)*"
            name="tiempoLLegada"
            auto="tiempoLLegada"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

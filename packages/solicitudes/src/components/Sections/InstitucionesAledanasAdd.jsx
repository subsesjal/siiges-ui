import { Grid, Typography } from '@mui/material';
import { Input } from '@siiges-ui/shared';
import React from 'react';

export default function UbicacionPlantel() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Ubicacion del Plantel</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={6}>
          <Input id="name" label="Nombre(s)" name="name" auto="name" />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="arrivalTime"
            label="Tiempo aproximado para llegar (minutos)*"
            name="arrivalTime"
            auto="arrivalTime"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

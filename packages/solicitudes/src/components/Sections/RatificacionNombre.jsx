import { Grid, Typography } from '@mui/material';
import { Input } from '@siiges-ui/shared';
import React from 'react';

export default function RatificacionNombre() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Ratificacion de nombre</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <Input
            id="nameRequest"
            label="Nombre solicitado"
            name="nameRequest"
            auto="nameRequest"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="nameAutorized"
            label="Nombre autorizado"
            name="nameAutorized"
            auto="nameAutorized"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="agreement"
            label="Acuerdo"
            name="agreement"
            auto="agreement"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="autorizedInstance"
            label="Instancia que autoriza"
            name="autorizedInstance"
            auto="autorizedInstance"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

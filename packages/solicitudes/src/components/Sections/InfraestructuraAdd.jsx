import { Grid, TextField, Typography } from '@mui/material';
import { Input } from '@siiges-ui/shared';
import React from 'react';

export default function InfraestructuraAdd() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Infraestructura</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={6}>
          <Input
            id="instalation"
            label="Instalacion"
            name="instalation"
            auto="instalation"
          />
        </Grid>
        <Grid item xs={6}>
          <Input id="name" label="Nombre" name="name" auto="name" />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="capacity"
            label="Capacidad"
            name="capacity"
            auto="capacity"
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="meters"
            label="Metros cuadrados"
            name="meters"
            auto="meters"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="location"
            label="Ubicacion"
            name="location"
            auto="location"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="materialResources"
            label="Recursos materiales"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="asinatura"
            label="Asignatura que atiende"
            name="asinatura"
            auto="asinatura"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

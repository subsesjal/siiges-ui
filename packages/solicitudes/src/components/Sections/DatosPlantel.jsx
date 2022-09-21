import { Grid, TextField, Typography } from '@mui/material';
import { Input } from '@siiges-ui/shared';
import React from 'react';

export default function DatosPlantel() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Datos del Plantel</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={9}>
          <Input
            id="cct"
            label="Clave de centro de trabajo"
            name="cct"
            auto="cct"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="institutionEmail"
            label="Correo electronico institucional"
            name="institutionEmail"
            auto="institutionEmail"
          />
        </Grid>
        <Grid item xs={6}>
          <Input id="phone1" label="Telefono 1" name="phone1" auto="phone1" />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="email1"
            label="Correo electronico sin dominio 1"
            name="email1"
            auto="email1"
          />
        </Grid>
        <Grid item xs={6}>
          <Input id="phone2" label="Telefono 2" name="phone2" auto="phone2" />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="email2"
            label="Correo electronico sin dominio 2"
            name="email2"
            auto="email2"
          />
        </Grid>
        <Grid item xs={6}>
          <Input id="phone3" label="Telefono 3" name="phone3" auto="phone3" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="socialNetwork"
            label="Redes sociales"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={9}>
          <Input
            id="website"
            label="Pagina web"
            name="website"
            auto="website"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

import { Grid, TextField, Typography } from '@mui/material';
import { Input, InputFile } from '@siiges-ui/shared';
import React from 'react';

function InstitucionData() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Datos de institucion</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={3}>
          <Input
            id="businessName"
            label="Razon social"
            name="businessName"
            auto="businessName"
          />
        </Grid>
        <Grid item xs={9}>
          <Input
            id="institutionName"
            label="Nombre de la institucion"
            name="institutionName"
            auto="institutionName"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="history"
            label="Historia"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="vision"
            label="Vision"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="mision"
            label="Mision"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="institutionValues"
            label="Valores institucionales"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile label="Subir imagen" />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default InstitucionData;

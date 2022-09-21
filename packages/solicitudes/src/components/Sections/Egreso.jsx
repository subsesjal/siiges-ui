import { Grid, TextField, Typography } from '@mui/material';
import React from 'react';

export default function Egreso() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Egreso</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Perfil de Egreso</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <TextField
            id="conocimientos"
            label="Conocimientos"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="habilidades"
            label="Habilidades"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="actitudes"
            label="Actitudes"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Proyecto de seguimiento a egresados"
            id="followUp"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

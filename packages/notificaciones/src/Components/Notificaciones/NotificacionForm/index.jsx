import { Grid, Typography } from '@mui/material';
import React from 'react';

export default function FormNotificacion() {
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="body1">
        ¡Nota importante! El nombre del alumno se debe registrar tal y como
        aparece en el acta de nacimiento, en mayúsculas y en caso de tener
        acentos, omitirlos.
      </Typography>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={4} sx={{ marginTop: 3 }} />
      </Grid>
    </div>
  );
}

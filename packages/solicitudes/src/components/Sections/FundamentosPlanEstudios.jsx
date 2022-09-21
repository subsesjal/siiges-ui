import { Grid, Typography } from '@mui/material';
import { InputFile } from '@siiges-ui/shared';
import React from 'react';

export default function FundamentosPlanEstudios() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Datos del plan de estudios</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 0, width: '100%' }}>
        <Grid item xs={9}>
          <InputFile label="FPD01" />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            ¡Nota importante!
            <br />
            Adjuntar archivo que describa el estudio de pertinencia y
            factibilidad así como el estudio de oferta y demanda con las
            especificaciones señaladas en el Instructivo para la Obtención del
            Reconocimiento de Validez Oficial de Estudios de Educación Superior
            del Estado de Jalisco. (Descargar plantilla).
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

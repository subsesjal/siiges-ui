import { Grid, TextField, Typography } from '@mui/material';
import { Input, InputFile } from '@siiges-ui/shared';
import React from 'react';

export default function DatosGeneralesEvaluacion() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Trayectoria educativa</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={6}>
          <Input
            id="nameProgram"
            label="Nombre del programa"
            name="nameProgram"
            auto="nameProgram"
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="fechaDictamen"
            label="Fecha de dictamen"
            name="fechaDictamen"
            auto="fechaDictamen"
          />
        </Grid>
        <Grid item xs={9}>
          <Input
            id="evaluador"
            label="Evaluador"
            name="evaluador"
            auto="evaluador"
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="cumplimientoNumerico"
            label="Cumplimiento numerico"
            name="cumplimientoNumerico"
            auto="cumplimientoNumerico"
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="porcentaje"
            label="Porcentaje"
            name="porcentaje"
            auto="porcentaje"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="calificacion"
            label="Calificacion"
            name="calificacion"
            auto="calificacion"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="valoracionCualitativa"
            label="Valoracion cualitativa"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile label="Dictamen de evaluación" />
        </Grid>
      </Grid>
    </Grid>
  );
}

import { Grid, TextField, Typography } from '@mui/material';
import { Input } from '@siiges-ui/shared';
import React from 'react';

export default function DatosPlanEstudios() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Datos del plan de estudios</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={3}>
          <Input id="nivel" label="Nivel" name="nivel" auto="nivel" />
        </Grid>
        <Grid item xs={9}>
          <Input
            id="nameProgramaEstudio"
            label="Nombre del programa de estudio"
            name="nameProgramaEstudio"
            auto="nameProgramaEstudio"
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="modalidad"
            label="Modalidad"
            name="modalidad"
            auto="modalidad"
          />
        </Grid>
        <Grid item xs={3}>
          <Input id="periodo" label="Periodo" name="periodo" auto="periodo" />
        </Grid>
        <Grid item xs={3}>
          <Input id="turno" label="Turno" name="turno" auto="turno" />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="programDuration"
            label="Duracion del programa"
            name="programDuration"
            auto="programDuration"
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Periodos:</Typography>
        </Grid>
        <Grid item xs={9}>
          <Input id="creditos" label="Creditos necesarios para concluir el programa" name="creditos" auto="creditos" />
        </Grid>
        <Grid item xs={9}>
          <Input id="nivelPrevio" label="Nivel educativo previo" name="nivelPrevio" auto="nivelPrevio" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="generalObjective"
            label="Objetivo General"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

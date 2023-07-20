import { Grid, Typography } from '@mui/material';
import { Input } from '@siiges-ui/shared';
import React from 'react';

export default function AsignaturasFormacionElectivaAdd() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Asignaturas de formación electiva</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={3}>
          <Input id="grado" label="Grado" name="grado" auto="grado" />
        </Grid>
        <Grid item xs={3}>
          <Input id="name" label="Nombre(s)" name="name" auto="name" />
        </Grid>
        <Grid item xs={3}>
          <Input id="clave" label="Clave" name="clave" auto="clave" />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="creditos"
            label="Creditos"
            name="creditos"
            auto="creditos"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="formacionEspecializada"
            label="Formacion especializada"
            name="formacionEspecializada"
            auto="formacionEspecializada"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="seriacion"
            label="Seriacion"
            name="seriacion"
            auto="seriacion"
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="horasDocente"
            label="Horas docente"
            name="horasDocente"
            auto="horasDocente"
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="creditos"
            label="Horas independiente"
            name="creditos"
            auto="creditos"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="academia"
            label="Academia"
            name="academia"
            auto="academia"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="totalHorasDocente"
            label="Total horas docente"
            name="totalHorasDocente"
            auto="totalHorasDocente"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="totalHorasIndependiente"
            label="Total horas independiente"
            name="totalHorasIndependiente"
            auto="totalHorasIndependiente"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

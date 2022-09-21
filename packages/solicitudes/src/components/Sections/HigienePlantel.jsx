import { Grid, Typography } from '@mui/material';
import { Input } from '@siiges-ui/shared';
import React from 'react';

export default function HigienePlantel() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Higiene del Plantel</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">
          Sanitarios en todo el plantel para alumnos
        </Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <Input
            id="hombresAlumnos"
            label="Hombres"
            name="hombresAlumnos"
            auto="hombresAlumnos"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="mujeresAlumnos"
            label="Mujeres"
            name="mujeresAlumnos"
            auto="mujeresAlumnos"
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">
          Sanitarios en todo el plantel para docentes y administrativos
        </Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <Input
            id="hombresDocentes"
            label="Hombres"
            name="hombresDocentes"
            auto="hombresDocentes"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="mujeresDocentes"
            label="Mujeres"
            name="mujeresDocentes"
            auto="mujeresDocentes"
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Limpieza del plantel</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <Input
            id="personasLimpieza"
            label="Personas encargadas de la limpieza"
            name="personasLimpieza"
            auto="personasLimpieza"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="cestosBasura"
            label="Cestos de basura"
            name="cestosBasura"
            auto="cestosBasura"
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Aulas</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <Input
            id="numeroAulas"
            label="Numero de aulas"
            name="numeroAulas"
            auto="numeroAulas"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="butacasAula"
            label="Butacas por aula"
            name="butacasAula"
            auto="butacasAula"
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Ventilacion</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <Input
            id="ventanasAbrenPorAula"
            label="Ventanas que pueden abrirse por aula"
            name="ventanasAbrenPorAula"
            auto="ventanasAbrenPorAula"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="ventiladores"
            label="Ventiladores"
            name="ventiladores"
            auto="ventiladores"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="aireAcondicionado"
            label="Aire acondicionado"
            name="aireAcondicionado"
            auto="aireAcondicionado"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

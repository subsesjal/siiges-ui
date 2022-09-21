import { Grid, Typography } from '@mui/material';
import { Input } from '@siiges-ui/shared';
import React from 'react';

export default function CoordinadorPrograma() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Coordinador del programa</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={6}>
          <Input
            id="nameCoordinador"
            label="Nombre del coordinador"
            name="nameCoordinador"
            auto="nameCoordinador"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="firstLastName"
            label="Apellido paterno del coordinador"
            name="firstLastName"
            auto="firstLastName"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="secondLastName"
            label="Apellido materno del coordinador"
            name="secondLastName"
            auto="secondLastName"
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="academicProfile"
            label="Perfil academico del coordinador"
            name="academicProfile"
            auto="academicProfile"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

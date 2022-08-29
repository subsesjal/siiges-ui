import { Grid } from '@mui/material';
import { Input } from '@siiges-ui/shared';
import React from 'react';

function DirectorData() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Input id="name" label="Nombre(s)" name="name" auto="name" />
      </Grid>
      <Grid item xs={6}>
        <Input
          id="lastName1"
          label="Primer Apellido"
          name="lastName1"
          auto="lastName1"
        />
      </Grid>
      <Grid item xs={6}>
        <Input
          id="lastName2"
          label="Segundo Apellido"
          name="lastName2"
          auto="lastName2"
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="nationality"
          label="Nacionalidad"
          name="nationality"
          auto="nationality"
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="curp"
          label="Curp"
          name="curp"
          auto="curp"
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="gender"
          label="Genero"
          name="gender"
          auto="gender"
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="email"
          label="Correo electronico"
          name="email"
          auto="email"
        />
      </Grid>
    </Grid>
  );
}

export default DirectorData;

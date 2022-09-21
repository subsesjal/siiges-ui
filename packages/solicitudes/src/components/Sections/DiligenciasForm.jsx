import { Grid } from '@mui/material';
import { ButtonsForm, Input } from '@siiges-ui/shared';
import React from 'react';

function DiligenciasForm() {
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
      <Grid item xs={6}>
        <Input id="charge" label="Cargo" name="charge" auto="charge" />
      </Grid>
      <Grid item xs={6}>
        <Input id="email" label="Correo" name="email" auto="email" />
      </Grid>
      <Grid item xs={3}>
        <Input id="phone" label="Telefono" name="phone" auto="phone" />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="cellphone"
          label="Celular"
          name="cellphone"
          auto="cellphone"
        />
      </Grid>
      <Grid item xs={6}>
        <Input id="schedule" label="Horario" name="schedule" auto="schedule" />
      </Grid>
      <Grid item xs={12}>
        <ButtonsForm />
      </Grid>
    </Grid>
  );
}

export default DiligenciasForm;

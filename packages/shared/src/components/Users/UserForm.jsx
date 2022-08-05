import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Input, ButtonsForm, Select } from '@siiges-ui/shared';
import Divider from '@mui/material/Divider';

export default function UserForm() {
  const Rol = [
    {
      id: 'admin',
      name: 'Administrador',
    },
    {
      id: 'user',
      name: 'Usuario',
    },
  ];

  const Sexo = [
    {
      id: 'male',
      name: 'Masculino',
    },
    {
      id: 'female',
      name: 'Femenino',
    },
  ];

  return (
    <Grid item xs={8}>
      <Typography variant="h5" gutterBottom component="div">
        Información Personal
      </Typography>
      <Divider sx={{ bgcolor: 'orange', marginBottom: 5 }} />
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <Input label="Nombre(s)" id="name" name="name" auto="name" size="small" />
        </Grid>
        <Grid item xs={4}>
          <Input label="Primer Apellido" id="lastname1" name="lastname1" auto="lastname1" size="small" />
        </Grid>
        <Grid item xs={4}>
          <Input label="Segundo Apellido" id="lastname2" name="lastname2" auto="lastname2" size="small" />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={8}>
          <Input label="Cargo" id="cargo" name="cargo" auto="cargo" size="small" />
        </Grid>
        <Grid item xs={4}>
          <Select title="Rol" options={Rol} />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <Input label="Correo Electronico" id="email" name="email" auto="email" size="small" />
        </Grid>
        <Grid item xs={4}>
          <Input label="Nacionalidad" id="nationality" name="nationality" auto="nationality" size="small" />
        </Grid>
        <Grid item xs={4}>
          <Select title="Sexo" options={Sexo} />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <Input label="INE" id="ine" name="ine" auto="ine" size="small" />
        </Grid>
        <Grid item xs={4}>
          <Input label="Curp" id="curp" name="curp" auto="curp" size="small" />
        </Grid>
        <Grid item xs={4}>
          <Input label="RFC" id="rfc" name="rfc" auto="rfc" size="small" />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <Input label="Telefono" id="phone" name="phone" auto="phone" size="small" />
        </Grid>
        <Grid item xs={4}>
          <Input label="Celular" id="cellphone" name="cellphone" auto="cellphone" size="small" />
        </Grid>
      </Grid>
      <ButtonsForm />
    </Grid>
  );
}

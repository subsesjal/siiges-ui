import { Grid, Typography } from '@mui/material';
import { Input, InputFile } from '@siiges-ui/shared';
import React from 'react';

function RepresentanteLegalData() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Datos de Representante legal</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
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
          <Input
            id="nationality"
            label="Nacionalidad"
            name="nationality"
            auto="nationality"
          />
        </Grid>
        <Grid item xs={6}>
          <Input id="street" label="Calle" name="street" auto="street" />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="extNum"
            label="Numero exterior"
            name="extNum"
            auto="extNum"
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="intNum"
            label="Numero interior"
            name="intNum"
            auto="intNum"
          />
        </Grid>
        <Grid item xs={6}>
          <Input id="colony" label="Colonia" name="colony" auto="colony" />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="postalCode"
            label="Codigo Postal"
            name="postalCode"
            auto="postalCode"
          />
        </Grid>
        <Grid item xs={3}>
          <Input id="city" label="Municipio" name="city" auto="city" />
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
        <Grid item xs={12}>
          <InputFile label="Subir firma" />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default RepresentanteLegalData;

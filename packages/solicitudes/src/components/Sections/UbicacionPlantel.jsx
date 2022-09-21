import { Grid, TextField, Typography } from '@mui/material';
import { Input, Select } from '@siiges-ui/shared';
import React from 'react';

export default function UbicacionPlantel() {
  const options = [
    {
      id: 1,
      name: 'Guadalajara',
    },
    {
      id: 2,
      name: 'Zapopan',
    },
    {
      id: 3,
      name: 'Tlaquepaque',
    },
  ];
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Ubicacion del Plantel</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={9}>
          <Input id="street" label="Calle" name="street" auto="street" />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="numExt"
            label="Numero exterior"
            name="numExt"
            auto="numExt"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="numInt"
            label="Numero interor"
            name="numInt"
            auto="numInt"
          />
        </Grid>
        <Grid item xs={6}>
          <Input id="colony" label="Colonia" name="colony" auto="colony" />
        </Grid>
        <Grid item xs={6}>
          <Input id="phone2" label="Telefono 2" name="phone2" auto="phone2" />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="email2"
            label="Correo electronico sin dominio 2"
            name="email2"
            auto="email2"
          />
        </Grid>
        <Grid item xs={6}>
          <Input id="CP" label="Codigo Postal" name="CP" auto="CP" />
        </Grid>
        <Grid item xs={9}>
          <Select
            title="Municipio"
            options={options}
            value="city"
            onChange="city"
          />
        </Grid>
        <Grid item xs={9}>
          <Input
            id="coordinates"
            label="Coordenadas"
            name="coordinates"
            auto="coordinates"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="especifications"
            label="Especificaciones"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

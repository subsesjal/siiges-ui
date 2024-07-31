import { Grid, TextField, Typography } from '@mui/material';
import { Input } from '@siiges-ui/shared';
import BasicSelect from '@siiges-ui/shared/src/components/Select';
import React from 'react';

export default function UbicacionPlantel() {
  const options = [
    {
      id: 1,
      nombre: 'Guadalajara',
    },
    {
      id: 2,
      nombre: 'Zapopan',
    },
    {
      id: 3,
      nombre: 'Tlaquepaque',
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
            label="Número exterior"
            name="numExt"
            auto="numExt"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="numInt"
            label="Número interor"
            name="numInt"
            auto="numInt"
          />
        </Grid>
        <Grid item xs={6}>
          <Input id="colony" label="Colonia" name="colony" auto="colony" />
        </Grid>
        <Grid item xs={6}>
          <Input id="phone2" label="Teléfono 2" name="phone2" auto="phone2" />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="email2"
            label="Correo electrónico sin dominio 2"
            name="email2"
            auto="email2"
          />
        </Grid>
        <Grid item xs={6}>
          <Input id="CP" label="Código Postal" name="CP" auto="CP" />
        </Grid>
        <Grid item xs={9}>
          <BasicSelect title="Municipio" options={options} />
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

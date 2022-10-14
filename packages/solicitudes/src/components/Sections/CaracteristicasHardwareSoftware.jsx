import { Grid, TextField, Typography } from '@mui/material';
import { Input, Select } from '@siiges-ui/shared';
import React from 'react';

export default function CaracteristicasHardwareSoftware() {
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
        <Typography variant="h6">Hardware</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={6}>
          <Select
            title="Tipo de alojamiento"
            options={options}
            value=""
            onChange={() => {}}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Capacidad del servidor</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={6}>
          <Input
            id="procesador"
            label="Procesador"
            name="procesador"
            auto="procesador"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="almacenamiento"
            label="Almacenamiento"
            name="almacenamiento"
            auto="almacenamiento"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="memoriaFisica"
            label="Memoria Fisica (RAM)"
            name="memoriaFisica"
            auto="memoriaFisica"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="ubicacionServidor"
            label="Interconeccion y ubicacion del servidor central"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Software</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <Input
            id="vercionPlataforma"
            label="Vercion de la plataforma tecnologica"
            name="vercionPlataforma"
            auto="vercionPlataforma"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="licenciaSO"
            label="Licencia del sistema operativo"
            name="licenciaSO"
            auto="licenciaSO"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="manejadorBase"
            label="Manejador de base"
            name="manejadorBase"
            auto="manejadorBase"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

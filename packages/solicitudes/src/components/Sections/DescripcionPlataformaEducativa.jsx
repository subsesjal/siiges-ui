import { Grid, TextField, Typography } from '@mui/material';
import { Input, Select } from '@siiges-ui/shared';
import React from 'react';

export default function DescripcionPlataformaEducativa() {
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
        <Typography variant="h6">Datos de la plataforma educativa</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <TextField
            id="modeloTeoricoPedagogico"
            label="Descripcion del modelo teorico-pedagogico"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="descripcionInfraestructura"
            label="Descripcion de la infraestructura tecnologica de la plataforma tecnologica educativa"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            title="Tipo de enlace de la plataforma educativa"
            options={options}
            value=""
            onChange={() => {}}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="anchoBanda"
            label="Ancho de banda disponible"
            name="anchoBanda"
            auto="anchoBanda"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="concurrenciaMaxima"
            label="Concurrencia maxima de usuarios"
            name="concurrenciaMaxima"
            auto="concurrenciaMaxima"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="planCrecimiento"
            label="Plan de crecimiento para un eventual aumento de numero de usuarios"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="ventajasPlataforma"
            label="Ventajas de la plataforma educativa frente a otros modelos tecnologicos"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

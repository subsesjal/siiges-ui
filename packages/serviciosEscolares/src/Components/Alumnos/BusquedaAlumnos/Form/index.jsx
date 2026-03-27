import { Grid } from '@mui/material';
import { ButtonSimple, Input } from '@siiges-ui/shared';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

export default function BusquedaAlumnosForm() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Input id="nombre" name="nombre" label="Nombre" />
      </Grid>
      <Grid item xs={3}>
        <Input id="apellidoPaterno" name="apellidoPaterno" label="Apellido Paterno" />
      </Grid>
      <Grid item xs={3}>
        <Input id="apellidoMaterno" name="apellidoMaterno" label="Apellido Materno" />
      </Grid>
      <Grid item xs={3}>
        <Input id="curp" name="curp" label="CURP" />
      </Grid>
      <Grid item xs={6}>
        <Input id="claveCentroTrabajo" name="claveCentroTrabajo" label="Clave Centro Trabajo" />
      </Grid>
      <Grid item xs={3}>
        <Input id="matricula" name="matricula" label="Matricula" />
      </Grid>
      <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
        <ButtonSimple
          text="Buscar"
          onClick={() => {}}
          design="buscar"
        >
          <SearchIcon />
        </ButtonSimple>
      </Grid>
    </Grid>
  );
}

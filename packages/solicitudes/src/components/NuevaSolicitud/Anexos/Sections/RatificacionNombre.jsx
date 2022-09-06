import { Grid, Typography } from '@mui/material';
import { InputFile } from '@siiges-ui/shared';
import React from 'react';

export default function RatificacionNombre() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Trayectoria educativa</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <InputFile label="Identificación oficial con fotografía de la persona física, o acta constitutiva de la persona moral y poder de su Representante Legal" />
        </Grid>
        <Grid item xs={12}>
          <InputFile label="Comprobante de pago" />
        </Grid>
        <Grid item xs={12}>
          <InputFile label="Fotografías inmuebles" />
        </Grid>
        <Grid item xs={12}>
          <InputFile label="Constancia INFEJAL" />
        </Grid>
        <Grid item xs={12}>
          <InputFile label="Licencia municipal" />
        </Grid>
        <Grid item xs={12}>
          <InputFile label="Dictamen del Instituto Mexicano de Propiedad Intelectual (IMPI)" />
        </Grid>
        <Grid item xs={12}>
          <InputFile label="Aviso funcionamiento de Secretaría de Salud ó Carta bajo protesta de decir verdad de NO venta de alimentos." />
        </Grid>
        <Grid item xs={12}>
          <InputFile label="Comprobante de línea telefónica" />
        </Grid>
        <Grid item xs={12}>
          <InputFile label="Proyecto de vinculación y movilidad" />
        </Grid>
        <Grid item xs={12}>
          <InputFile label="Plan de mejora" />
        </Grid>
        <Grid item xs={12}>
          <InputFile label="Formas de migratorias de los profesores" />
        </Grid>
        <Grid item xs={12}>
          <InputFile label="Programa de superación" />
        </Grid>
      </Grid>
    </Grid>
  );
}

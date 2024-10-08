import { Grid } from '@mui/material';
import {
  Input, Select, Subtitle,
} from '@siiges-ui/shared';
import React from 'react';

export default function DatosInstitucion() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Subtitle>Datos de la Institución de procedencia</Subtitle>
      </Grid>
      <Grid item xs={9}>
        <Input
          id="nombreInstitucion"
          label="Nombre de la Institución"
          name="nombreInstitucion"
        />
      </Grid>
      <Grid item xs={3}>
        <Select title="Estado" options={[]} name="estado" />
      </Grid>
      <Grid item xs={9}>
        <Input
          id="nombreCarrera"
          label="Nombre de la Carrera"
          name="nombreCarrera"
        />
      </Grid>
      <Grid item xs={12}>
        <Subtitle>Datos de la Institución de destino</Subtitle>
      </Grid>
      <Grid item xs={3}>
        <Select
          title="Tipo de Institución"
          options={[]}
          name="tipoInstitucion"
        />
      </Grid>
      <Grid item xs={9}>
        <Input id="instituciones" label="Instituciones de Educación Superior" name="instituciones" />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="rvoe"
          label="RVOE"
          name="rvoe"
        />
      </Grid>
      <Grid item xs={9}>
        <Input
          id="planEstudios"
          label="Plan de Estudios"
          name="planEstudios"
        />
      </Grid>
    </Grid>
  );
}

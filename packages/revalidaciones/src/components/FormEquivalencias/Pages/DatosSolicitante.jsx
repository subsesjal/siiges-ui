import { Grid } from '@mui/material';
import {
  Input, InputDate, Select, Subtitle,
} from '@siiges-ui/shared';
import React from 'react';

export default function DatosSolicitante() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Subtitle>Trámite de Equivalencia</Subtitle>
      </Grid>
      <Grid item xs={3}>
        <Select title="Tipo de Solicitud" options={[]} name="tipoSolicitud" />
      </Grid>
      <Grid item xs={3}>
        <Select title="Grado Academico" options={[]} name="gradoAcademico" />
      </Grid>
      <Grid item xs={12}>
        <Subtitle>Datos del Solicitante</Subtitle>
      </Grid>
      <Grid item xs={3}>
        <Input id="curp" label="CURP" name="curp" />
      </Grid>
      <Grid item xs={3}>
        <Input id="nombre" label="Nombre" name="nombre" />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="primerApellido"
          label="Primer Apellido"
          name="primerApellido"
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="segundoApellido"
          label="Segundo Apellido"
          name="segundoApellido"
        />
      </Grid>
      <Grid item xs={3}>
        <InputDate
          label="Fecha de Nacimiento"
          name="fechaNacimiento"
          onchange={() => {}}
        />
      </Grid>
      <Grid item xs={12}>
        <Subtitle>Dirección</Subtitle>
      </Grid>
      <Grid item xs={3}>
        <Input name="calle" id="calle" label="Calle" />
      </Grid>
      <Grid item xs={3}>
        <Input name="numero" id="numero" label="Numero" />
      </Grid>
      <Grid item xs={3}>
        <Input name="colonia" id="colonia" label="Colonia" />
      </Grid>
      <Grid item xs={3}>
        <Input name="municipio" id="municipio" label="Municipio" />
      </Grid>
      <Grid item xs={3}>
        <Input name="codigoPostal" id="codigoPostal" label="Codigo Postal" />
      </Grid>
      <Grid item xs={12}>
        <Subtitle>Contacto</Subtitle>
      </Grid>
      <Grid item xs={3}>
        <Input name="correo" id="correo" label="Correo de Contacto" />
      </Grid>
      <Grid item xs={3}>
        <Input name="telefono" id="telefono" label="Telefono de Contacto" />
      </Grid>
    </Grid>
  );
}

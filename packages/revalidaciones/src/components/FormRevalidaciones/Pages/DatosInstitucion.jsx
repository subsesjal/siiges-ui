import { Grid } from '@mui/material';
import { Input, Select, Subtitle } from '@siiges-ui/shared';
import React from 'react';

export default function DatosInstitucion() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Subtitle>
          Datos de la Institución de procedencia en el extranjero
        </Subtitle>
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
      <Grid item xs={3}>
        <Select
          title="Grado Académico Procedente"
          options={[]}
          name="gradoAcademicoProcedente"
        />
      </Grid>
      <Grid item xs={6}>
        <Input
          id="anoFinalizacion"
          name="anoFinalizacion"
          label="Año de Finalización de Estudios"
        />
      </Grid>
      <Grid item xs={6}>
        <Input
          id="anoInicio"
          name="anoInicio"
          label="Año de Inicio de realización de Estudios"
        />
      </Grid>
      <Grid item xs={4}>
        <Select title="Estado" name="estado" options={[]} />
      </Grid>
      <Grid item xs={4}>
        <Select title="Ciudad" name="ciudad" options={[]} />
      </Grid>
      <Grid item xs={4}>
        <Select title="País" name="pais" options={[]} />
      </Grid>
      <Grid item xs={12}>
        <Subtitle>
          En caso de no contar con apostilla proporcionar datos de la
          universidad para verificación de autenticidad
        </Subtitle>
      </Grid>
      <Grid item xs={3}>
        <Input
          id="telefonoInstitucion"
          name="telefonoInstitucion"
          label="Teléfono de institución"
        />
      </Grid>
      <Grid item xs={9}>
        <Input
          id="paginaWeb"
          name="paginaWeb"
          label="Página web de la institución"
        />
      </Grid>
      <Grid item xs={6}>
        <Input
          id="correoInstitucion"
          name="correoInstitucion"
          label="Correo de institución"
        />
      </Grid>
      <Grid item xs={12}>
        <Subtitle>Deseo revalidar mis estudios como</Subtitle>
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Grado académico destino"
          name="gradoAcademicoDestino"
          options={[]}
        />
      </Grid>
      <Grid item xs={8}>
        <Input id="planEstudios" name="planEstudios" label="Plan de estudios" />
      </Grid>
    </Grid>
  );
}

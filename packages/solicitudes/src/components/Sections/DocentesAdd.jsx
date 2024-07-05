import { Grid, TextField, Typography } from '@mui/material';
import { Input } from '@siiges-ui/shared';
import React from 'react';

export default function DocentesAdd() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Docentes</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={3}>
          <Input
            id="tipoDocente"
            label="Tipo de docente"
            name="tipoDocente"
            auto="tipoDocente"
          />
        </Grid>
        <Grid item xs={3}>
          <Input id="name" label="Nombre(s)" name="name" auto="name" />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="firstLastName1"
            label="Primer Apellido"
            name="firstLastName1"
            auto="firstLastName1"
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="firstLastName2"
            label="Segundo Apellido"
            name="firstLastName2"
            auto="firstLastName2"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Último grado</Typography>
        </Grid>
        <Grid item xs={3}>
          <Input
            id="nivelUltimoGrado"
            label="Nivel"
            name="nivelUltimoGrado"
            auto="nivelUltimoGrado"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="nameUltimoGrado"
            label="Nombre"
            name="nameUltimoGrado"
            auto="nameUltimoGrado"
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="documentoPresentadoUltimoGrado"
            label="Documento presentado"
            name="documentoPresentadoUltimoGrado"
            auto="documentoPresentadoUltimoGrado"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Penúltimo grado</Typography>
        </Grid>
        <Grid item xs={3}>
          <Input
            id="nivelPenultimoGrado"
            label="Nivel"
            name="nivelPenultimoGrado"
            auto="nivelPenultimoGrado"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="namePenultimoGrado"
            label="Nombre"
            name="namePenultimoGrado"
            auto="namePenultimoGrado"
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="documentoPresentadoPenultimoGrado"
            label="Documento presentado"
            name="documentoPresentadoPenultimoGrado"
            auto="documentoPresentadoPenultimoGrado"
          />
        </Grid>
        <br />
        <Grid item xs={12}>
          <Input
            id="asignaturasPropuesta"
            label="Asignaturas para las que se propone"
            name="asignaturasPropuesta"
            auto="asignaturasPropuesta"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="tipoContratacion"
            label="Tipo de contratación"
            name="tipoContratacion"
            auto="tipoContratacion"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="antiguedad"
            label="Antigüedad"
            name="antiguedad"
            auto="antiguedad"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="totalHorasIndependiente"
            label="Total horas independiente"
            name="totalHorasIndependiente"
            auto="totalHorasIndependiente"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="laboralExperience"
            label="Experiencia laboral"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

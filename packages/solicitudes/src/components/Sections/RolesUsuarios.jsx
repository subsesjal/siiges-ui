import { Grid, TextField, Typography } from '@mui/material';
import { Input } from '@siiges-ui/shared';
import React from 'react';

export default function RolesUsuarios() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">
          Caracteristicas de los roles de usuarios
        </Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <TextField
            id="alumno"
            label="Alumno"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="docente"
            label="Docente"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="administrativo"
            label="Administrativo"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">
          Enlace para la plataforma tecnologica educativa
        </Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <Input id="url" label="URL/LIGA/LINK" name="url" auto="url" />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            Accesos de la plataforma tecnologica educativa
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Input
            id="almacenamiento"
            label="Almacenamiento"
            name="almacenamiento"
            auto="almacenamiento"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Alumno</Typography>
        </Grid>
        <Grid item xs={6}>
          <Input
            id="userAlumno"
            label="Usuario"
            name="userAlumno"
            auto="userAlumno"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="passwordAlumno"
            label="Contraseña"
            name="passwordAlumno"
            auto="passwordAlumno"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Docente</Typography>
        </Grid>
        <Grid item xs={6}>
          <Input
            id="userDocente"
            label="Usuario"
            name="userDocente"
            auto="userDocente"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="passwordDocente"
            label="Contraseña"
            name="passwordDocente"
            auto="passwordDocente"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Administrativo</Typography>
        </Grid>
        <Grid item xs={6}>
          <Input
            id="userAdministrativo"
            label="Usuario"
            name="userAdministrativo"
            auto="userAdministrativo"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="passwordAdministrativo"
            label="Contraseña"
            name="passwordAdministrativo"
            auto="passwordAdministrativo"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

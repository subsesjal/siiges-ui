import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Typography } from '@mui/material';
import { Input } from '@siiges-ui/shared';
import BasicSelect from '@siiges-ui/shared/src/components/Select';
import formDatosPlanEstudios from '../utils/sections/forms/formDatosPlanEstudios';
import errorDatosPlanEstudios from '../utils/sections/errors/errorDatosPlanEstudios';

export default function DatosPlanEstudios({ values }) {
  const nivel = [
    { id: 1, nombre: 'Bachillerato' },
    { id: 2, nombre: 'Licenciatura' },
    { id: 3, nombre: 'Técnico Superior Universitario' },
    { id: 4, nombre: 'Especialidad' },
    { id: 5, nombre: 'Maestria' },
    { id: 6, nombre: 'Doctorado' },
    { id: 7, nombre: 'Profesional Asociado' },
    { id: 8, nombre: 'Educación Continua' },
  ];

  const turno = [
    { id: 1, nombre: 'Matutino' },
    { id: 2, nombre: 'Vespertino' },
    { id: 3, nombre: 'Nocturno' },
    { id: 4, nombre: 'Mixto' },
  ];

  const {
    form, setForm, error, setError,
  } = values;

  const data = {};

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    formDatosPlanEstudios(name, form, setForm, value);
  };

  const errors = errorDatosPlanEstudios(form, setError, error, data);

  const handleOnBlur = (e) => {
    const { name } = e.target;
    errors[name]();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Datos del plan de estudios</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={3}>
          <BasicSelect
            title="Nivel"
            name="nivel"
            options={nivel}
            value=""
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.nivel}
            required
          />
        </Grid>
        <Grid item xs={9}>
          <Input
            id="nombreProgramaEstudio"
            label="Nombre del programa de estudio"
            name="nombreProgramaEstudio"
            auto="nombreProgramaEstudio"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.nombreProgramaEstudio}
            required
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="modalidad"
            label="Modalidad"
            name="modalidad"
            auto="modalidad"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.modalidad}
            required
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="periodo"
            label="Periodo"
            name="periodo"
            auto="periodo"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.periodo}
            required
          />
        </Grid>
        <Grid item xs={3}>
          <BasicSelect
            title="Turno"
            name="turno"
            options={turno}
            multiple
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.turno}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="programaDuracion"
            label="Duracion del programa"
            name="programaDuracion"
            auto="programaDuracion"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.programaDuracion}
            required
          />
        </Grid>
        <Grid item xs={6} sx={{ mt: 3 }}>
          <Typography>Periodos</Typography>
        </Grid>
        <Grid item xs={9}>
          <Input
            id="creditos"
            label="Creditos necesarios para concluir el programa"
            name="creditos"
            auto="creditos"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.creditos}
            required
          />
        </Grid>
        <Grid item xs={9}>
          <Input
            id="nivelPrevio"
            label="Nivel educativo previo"
            name="nivelPrevio"
            auto="nivelPrevio"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.nivelPrevio}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="objetivoGeneral"
            label="Objetivo General"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.objetivoGeneral}
            required
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

DatosPlanEstudios.propTypes = {
  values: PropTypes.objectOf(PropTypes.func).isRequired,
};

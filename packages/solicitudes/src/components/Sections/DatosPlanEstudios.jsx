import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Grid, TextField, Typography } from '@mui/material';
import { Input } from '@siiges-ui/shared';
import BasicSelect from '@siiges-ui/shared/src/components/Select';
import errorDatosPlanEstudios from '../utils/sections/errors/errorDatosPlanEstudios';
import SolicitudContext from '../utils/Context/solicitudContext';
import modalidades from '../utils/Mocks/mockModalidades';
import formDatosPlanEstudios from '../utils/sections/forms/formDatosPlanEstudios';

export default function DatosPlanEstudios() {
  const router = useRouter();
  const { query } = router;
  const [initialValues, setInitialValues] = useState({});

  const {
    form, setForm, error, setError, setErrors,
  } = useContext(SolicitudContext);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    formDatosPlanEstudios(name, value, form, setForm);
  };

  const errors = errorDatosPlanEstudios(form, setError, error);

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    const initialValue = initialValues[name];

    if (value !== initialValue || value === '') {
      errors[name]();
    }
  };

  const handleInputFocus = (e) => {
    const { name, value } = e.target;
    setInitialValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  useEffect(() => {
    if (errors !== undefined) {
      setErrors(errors);
    }
  }, [error]);

  const nivelPrevio = [
    { id: 1, nombre: 'Bachillerato' },
    { id: 2, nombre: 'Licenciatura' },
    { id: 3, nombre: 'Técnico Superior Universitario' },
    { id: 4, nombre: 'Especialidad' },
    { id: 5, nombre: 'Maestria' },
    { id: 6, nombre: 'Doctorado' },
    { id: 7, nombre: 'Profesional Asociado' },
    { id: 8, nombre: 'Educación Continua' },
  ];

  const nivel = [
    { id: 2, nombre: 'Licenciatura' },
    { id: 3, nombre: 'Técnico Superior Universitario' },
    { id: 4, nombre: 'Especialidad' },
    { id: 5, nombre: 'Maestria' },
    { id: 6, nombre: 'Doctorado' },
    { id: 7, nombre: 'Profesional Asociado' },
    { id: 8, nombre: 'Educación Continua' },
  ];

  const periodo = [
    { id: 1, nombre: 'Semestral' },
    { id: 2, nombre: 'Cuatrimestral' },
    { id: 3, nombre: 'Semestral curriculum flexible' },
    { id: 4, nombre: 'Cuatrimestral curriculum flexible' },
  ];

  const turno = [
    { id: 1, nombre: 'Matutino' },
    { id: 2, nombre: 'Vespertino' },
    { id: 3, nombre: 'Nocturno' },
    { id: 4, nombre: 'Mixto' },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Datos del plan de estudios</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={3}>
          <BasicSelect
            title="Nivel"
            name="nivelId"
            options={nivel}
            value={form[1].programa?.nivelId || ''}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            errorMessage={error.nivelId}
            required
          />
        </Grid>
        <Grid item xs={9}>
          <Input
            id="nombre"
            label="Nombre del programa de estudio"
            name="nombre"
            auto="nombre"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            value={form[1].programa?.nombre || ''}
            errorMessage={error.nombre}
            required
          />
        </Grid>
        <Grid item xs={3}>
          <BasicSelect
            title="Modalidad"
            name="modalidadId"
            value={query.modalidad || ''}
            onfocus={handleInputFocus}
            options={modalidades}
            disabled
          />
        </Grid>
        <Grid item xs={3}>
          <BasicSelect
            title="Periodo"
            name="cicloId"
            value={form[1].programa?.cicloId || ''}
            options={periodo}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            errorMessage={error.cicloId}
            required
          />
        </Grid>
        <Grid item xs={3}>
          <BasicSelect
            title="Turno"
            name="programaTurnos"
            options={turno}
            multiple
            onchange={handleOnChange}
            value={form[1].programa?.programaTurnos || []}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            errorMessage={error.programaTurnos}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="duracionPrograma"
            label="Duracion del programa"
            name="duracionPrograma"
            auto="duracionPrograma"
            onchange={handleOnChange}
            value={form[1].duracionPrograma}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            errorMessage={error.duracionPrograma}
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
            value={form[1].creditos}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            errorMessage={error.creditos}
            required
          />
        </Grid>
        <Grid item xs={9}>
          <BasicSelect
            title="Nivel Previo"
            name="nivelPrevio"
            options={nivelPrevio}
            value={form[1].programa?.nivelPrevio || ''}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            errorMessage={error.nivelPrevio}
            textValue
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Objetivo General"
            id="objetivoGeneral"
            name="objetivoGeneral"
            auto="objetivoGeneral"
            value={form[1].objetivoGeneral}
            rows={4}
            multiline
            sx={{ width: '100%' }}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.objetivoGeneral}
            error={!!error.objetivoGeneral}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Objetivo Particular"
            id="objetivoParticular"
            name="objetivoParticular"
            auto="objetivoParticular"
            value={form[1].objetivoParticular}
            rows={4}
            multiline
            sx={{ width: '100%' }}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.objetivoParticular}
            error={!!error.objetivoParticular}
            required
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

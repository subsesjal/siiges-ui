import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Typography } from '@mui/material';
import { Input, InputFile, InputNumber } from '@siiges-ui/shared';
import BasicSelect from '@siiges-ui/shared/src/components/Select';
import { useRouter } from 'next/router';
import errorDatosGeneralesEvaluacion from '../utils/sections/errors/errorDatosGeneralesEvaluacion';
import { useEvaluacionCurricular } from '../utils/Context/evaluacionCurricularContext';
import getEvaluadores from '../utils/getEvaluadores';
import useCumplimiento from '../utils/getCumplimiento';

export default function DatosGeneralesEvaluacion({ disabled }) {
  const {
    form, setForm, error, setError, setErrors,
  } = useEvaluacionCurricular();
  const [initialValues, setInitialValues] = useState({});
  const [fetchCumplimiento, setFetchCumplimiento] = useState(false);
  const router = useRouter();
  const { query } = router;
  const { modalidad } = query;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const validation = errorDatosGeneralesEvaluacion(form, setError, error);

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    const initialValue = initialValues[name];

    if (name === 'cumplimientoNumerico') {
      setFetchCumplimiento((prev) => !prev);
    }

    if (value !== initialValue || value === '') {
      validation[name]();
    }
  };

  const { cumplimiento } = useCumplimiento(
    modalidad,
    form.cumplimientoNumerico,
    fetchCumplimiento,
  );

  const handleInputFocus = (e) => {
    const { name, value } = e.target;
    setInitialValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFileLoaded = (url) => {
    setForm((prevForm) => ({
      ...prevForm,
      url,
    }));
  };

  useEffect(() => {
    if (validation !== undefined) {
      setErrors(validation);
    }
    if (cumplimiento) {
      setForm((prevForm) => ({
        ...prevForm,
        cumplimientoId: cumplimiento.id,
        porcentajeCumplimiento: cumplimiento.porcentajeCumplimiento,
      }));
    }
  }, [error, cumplimiento]);

  const { evaluadores } = getEvaluadores();

  const evaluadoresData = evaluadores.map((evaluador) => ({
    id: evaluador.id,
    nombre: `${evaluador.persona.nombre} ${evaluador.persona.apellidoPaterno}`,
  }));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Datos generales de evaluación</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={3}>
          <Input
            id="fecha"
            label="Fecha de dictamen"
            name="fecha"
            type="datetime"
            value={form.fecha}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            disabled={disabled}
            errorMessage={error.fecha}
            required
          />
        </Grid>
        <Grid item xs={9}>
          <BasicSelect
            title="Evaluador"
            name="evaluadorId"
            value={form ? form.evaluadorId : ''}
            options={evaluadoresData}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            errorMessage={error.evaluadorId}
            disabled={disabled}
            required
          />
        </Grid>
        <Grid item xs={4}>
          <InputNumber
            id="cumplimientoNumerico"
            label="Cumplimiento numerico"
            name="cumplimientoNumerico"
            value={form.cumplimientoNumerico}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            errorMessage={error.cumplimientoNumerico}
            min={50}
            max={250}
            required
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            id="porcentaje"
            label="Porcentaje"
            name="porcentaje"
            value={cumplimiento?.porcentajeCumplimiento}
            disabled
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            id="calificacion"
            label="Calificacion"
            name="calificacion"
            value={cumplimiento?.nombre}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="valoracionCualitativa"
            label="Valoración cualitativa"
            name="valoracionCualitativa"
            value={form.valoracionCualitativa}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            multiline
            rows={4}
            sx={{ width: '100%' }}
            disabled={disabled}
            helperText={error.valoracionCualitativa}
            error={!!error.valoracionCualitativa}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            id={form.programaId}
            label="Dictamen de evaluación"
            tipoEntidad="PROGRAMA"
            tipoDocumento="DICTAMEN_EVALUACION"
            value={form.dictamenEvaluacion}
            disabled={disabled}
            url={form.url || ''}
            setUrl={(url) => handleFileLoaded(url)}
            required
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

DatosGeneralesEvaluacion.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

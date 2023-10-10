import { Grid, TextField, Typography } from '@mui/material';
import { InputFile } from '@siiges-ui/shared';
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SolicitudContext from '../utils/Context/solicitudContext';
import formPrograma from '../utils/sections/forms/formPrograma';
import errorCurricula from '../utils/sections/errors/errorCurricula';

export default function Curricula({ disabled }) {
  const [initialValues, setInitialValues] = useState({});
  const [fileURLs, setFileURLs] = useState([]);

  const {
    form, setForm, error, setError, setErrors, id,
  } = useContext(SolicitudContext);

  const errors = errorCurricula(form, setError, error);

  useEffect(() => {
    if (fileURLs.length > 0) {
      setForm({ ...form, 5: { ...form['5'], urls: fileURLs } });
    }
  }, [fileURLs]);

  const handleFileLoaded = (index, url) => {
    setFileURLs((prevURLs) => [
      ...prevURLs.slice(0, index), url, ...prevURLs.slice(index + 1),
    ]);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    formPrograma(name, value, setForm, 5);
  };

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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Curricula</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <TextField
            id="mapaCurricular"
            name="mapaCurricular"
            label="Mapa curricular"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[5].mapaCurricular}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.mapaCurricular}
            error={!!error.mapaCurricular}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="flexibilidadCurricular"
            name="flexibilidadCurricular"
            label="Flexibilidad curriular"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[5].flexibilidadCurricular}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.flexibilidadCurricular}
            error={!!error.flexibilidadCurricular}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="lineasGeneracionAplicacionConocimiento"
            name="lineasGeneracionAplicacionConocimiento"
            label="lineas de generacion del conocimiento"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[5].lineasGeneracionAplicacionConocimiento}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.lineasGeneracionAplicacionConocimiento}
            error={!!error.lineasGeneracionAplicacionConocimiento}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="actualizacion"
            name="actualizacion"
            label="Actualizacion del plan de estudios"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[5].actualizacion}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.actualizacion}
            error={!!error.actualizacion}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="conveniosVinculacion"
            name="conveniosVinculacion"
            label="Vinculacion con colegios de profesionista, academias profesionales entre otras"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[5].conveniosVinculacion}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.conveniosVinculacion}
            error={!!error.conveniosVinculacion}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={9}>
          <InputFile
            tipoEntidad="PROGRAMA"
            tipoDocumento="MAPA_CURRICULAR"
            id={id}
            label="Mapa curricular"
            url={fileURLs[0]}
            setUrl={(url) => handleFileLoaded(0, url)}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={9}>
          <InputFile
            tipoEntidad="PROGRAMA"
            tipoDocumento="REGLAS_ACADEMICAS"
            id={id}
            label="Reglas de operacion de las academias"
            url={fileURLs[1]}
            setUrl={(url) => handleFileLoaded(1, url)}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={9}>
          <InputFile
            tipoEntidad="PROGRAMA"
            tipoDocumento="ASIGNATURAS_DETALLE"
            id={id}
            label="Asignaturas a detalle"
            url={fileURLs[2]}
            setUrl={(url) => handleFileLoaded(2, url)}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={9}>
          <InputFile
            tipoEntidad="PROGRAMA"
            tipoDocumento="PROPUESTA_HEMEROGRAFICA"
            id={id}
            label="Propuesta hemerobibliografica"
            url={fileURLs[3]}
            setUrl={(url) => handleFileLoaded(3, url)}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            1. Archivo que muestre de manera esquemática la distribución de las
            unidades de aprendizaje, secuencias (verticalidad y horizontalidad),
            flexibilidad para seleccionar trayectorias de estudio, número de
            unidades de aprendizaje por periodo lectivo (semestre o
            cuatrimestre), las unidades de aprendizaje obligatorias y optativas
            <br />
            2. Reglamento de academias o documento que contenga las reglas de
            operación de dichos cuerpos colegiados
            <br />
            3. Documento que describa a detalla cada asignatura (Descargar
            plantilla).
            <br />
            4. Documento en donde se especifique la hemerobibliografía por
            asignatura (Descargar plantilla).
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

Curricula.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

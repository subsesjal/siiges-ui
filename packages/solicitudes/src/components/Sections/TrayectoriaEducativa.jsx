import { Grid, TextField, Typography } from '@mui/material';
import { InputFile } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import SolicitudContext from '../utils/Context/solicitudContext';
import formPrograma from '../utils/sections/forms/formPrograma';
import errorTrayectoriaEducativa from '../utils/sections/errors/errorTrayectoriaEducativa';

export default function TrayectoriaEducativa({ disabled }) {
  const [initialValues, setInitialValues] = useState({});
  const [loaded, setLoaded] = useState([]);
  const [fileURLs, setFileURLs] = useState([]);

  const {
    form, setForm, error, setError, setErrors, id,
  } = useContext(SolicitudContext);

  useEffect(() => {
    if (fileURLs > 0) {
      setForm({ ...form, 5: { ...form['5'], urls: fileURLs } });
    }
  }, [fileURLs]);

  const handleFileLoaded = (index, url) => {
    setLoaded((prevLoaded) => [
      ...prevLoaded.slice(0, index), true, ...prevLoaded.slice(index + 1),
    ]);
    setFileURLs((prevURLs) => [
      ...prevURLs.slice(0, index), url, ...prevURLs.slice(index + 1),
    ]);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    formPrograma(name, value, setForm, 5);
  };

  const errors = errorTrayectoriaEducativa(form, setError, error);

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
        <Typography variant="h6">Trayectoria educativa</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <TextField
            id="programaSeguimiento"
            name="programaSeguimiento"
            label="Programa de seguimiento"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[9].programaSeguimiento}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.programaSeguimiento}
            error={!!error.programaSeguimiento}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="funcionTutorial"
            name="funcionTutorial"
            label="Funcion tutorial"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[9].funcionTutorial}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.funcionTutorial}
            error={!!error.funcionTutorial}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="tipoTutoria"
            name="tipoTutoria"
            label="tipo de tutoria"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[9].tipoTutoria}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.tipoTutoria}
            error={!!error.tipoTutoria}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="tipoEgreso"
            name="tipoEgreso"
            label="Tipo de egreso"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[9].tipoEgreso}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.tipoEgreso}
            error={!!error.tipoEgreso}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="estadisticasTitulacion"
            name="estadisticasTitulacion"
            label="Estadisticas de titulacion"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[9].estadisticasTitulacion}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.estadisticasTitulacion}
            error={!!error.estadisticasTitulacion}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="modalidadesTitulacion"
            name="modalidadesTitulacion"
            label="Modalidades de titulacion"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[9].modalidadesTitulacion}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.modalidadesTitulacion}
            error={!!error.modalidadesTitulacion}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          {loaded[0]
            ? (
              <a
                href={fileURLs[0]}
                alt="alt text"
                target="_blank"
                rel="noopener noreferrer"
              >
                Informe de resultados
              </a>
            ) : <div />}
          <InputFile
            tipoEntidad="PROGRAMA"
            tipoDocumento="PROPUESTA_HEMEROGRAFICA"
            id={id}
            label="Informe de resultados"
            setuRL={(url) => handleFileLoaded(0, url)}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          {loaded[1]
            ? (
              <a
                href={fileURLs[1]}
                alt="alt text"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instrumentos de seguimiento
              </a>
            ) : <div />}
          <InputFile
            tipoEntidad="PROGRAMA"
            tipoDocumento="PROPUESTA_HEMEROGRAFICA"
            id={id}
            label="Instrumentos o formatos utilizados para dar seguimiento al programa de trayectoria y tutoría académica"
            setuRL={(url) => handleFileLoaded(1, url)}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          {loaded[2]
            ? (
              <a
                href={fileURLs[2]}
                alt="alt text"
                target="_blank"
                rel="noopener noreferrer"
              >
                Trayectoria educativa
              </a>
            ) : <div />}
          <InputFile
            tipoEntidad="PROGRAMA"
            tipoDocumento="PROPUESTA_HEMEROGRAFICA"
            id={id}
            label="Trayectoria educativa y tutoría de los estudiantes (opcional)"
            setuRL={(url) => handleFileLoaded(2, url)}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            1. Incluir el acta de creación del comité tutorial
            <br />
            2. En caso de que los campos programa seguimiento, función tutorial,
            tipo tutoría, tasa egreso, estadísticas de titulación y modalidades
            de titulación incluyan cualquier tipo de ilustración o el texto sea
            demasiado incluya un resumen en los campos y suba su archivo
            completo tomando como referencia (Descargar plantilla).
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

TrayectoriaEducativa.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

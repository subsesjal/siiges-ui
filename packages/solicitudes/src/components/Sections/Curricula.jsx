import { Grid, Typography } from '@mui/material';
import { GetFile, Input, InputFile } from '@siiges-ui/shared';
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SolicitudContext from '../utils/Context/solicitudContext';
import formPrograma from '../utils/sections/forms/formPrograma';
import errorCurricula from '../utils/sections/errors/errorCurricula';
import useSectionDisabled from './Hooks/useSectionDisabled';

export default function Curricula({ disabled, type }) {
  const [initialValues, setInitialValues] = useState({});
  const [fileURLs, setFileURLs] = useState([null, null, null, null]);
  const {
    form, setForm, error, setError, id,
  } = useContext(SolicitudContext);
  const errors = errorCurricula(form, setError, error);

  const isSectionDisabled = useSectionDisabled(5);

  const isDisabled = disabled || isSectionDisabled;

  const fileData = [
    'MAPA_CURRICULAR',
    'REGLAS_ACADEMICAS',
    'ASIGNATURAS_DETALLE',
    'PROPUESTA_HEMEROGRAFICA',
  ].map((tipoDocumento) => ({
    entidadId: id,
    tipoEntidad: 'PROGRAMA',
    tipoDocumento,
  }));

  useEffect(() => {
    if (type === 'editar') {
      fileData.forEach((fileInfo, index) => {
        GetFile(fileInfo, (url, err) => {
          if (!err) {
            setFileURLs((currentURLs) => {
              const updatedURLs = [...currentURLs];
              updatedURLs[index] = url;
              return updatedURLs;
            });
          }
        });
      });
    }
  }, []);

  const handleFileLoaded = (index, url) => {
    setFileURLs((prevURLs) => [
      ...prevURLs.slice(0, index),
      url,
      ...prevURLs.slice(index + 1),
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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Currícula</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <Input
            id="mapaCurricular"
            name="mapaCurricular"
            label="Mapa curricular"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[5].programa?.mapaCurricular}
            onChange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            helperText={error.mapaCurricular}
            error={!!error.mapaCurricular}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="flexibilidadCurricular"
            name="flexibilidadCurricular"
            label="Flexibilidad curricular"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[5].programa?.flexibilidadCurricular}
            onChange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            helperText={error.flexibilidadCurricular}
            error={!!error.flexibilidadCurricular}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="lineasGeneracionAplicacionConocimiento"
            name="lineasGeneracionAplicacionConocimiento"
            label="Líneas de generación del conocimiento"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[5].programa?.lineasGeneracionAplicacionConocimiento}
            onChange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            helperText={error.lineasGeneracionAplicacionConocimiento}
            error={!!error.lineasGeneracionAplicacionConocimiento}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="actualizacion"
            name="actualizacion"
            label="Actualización del plan de estudios"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[5].programa?.actualizacion}
            onChange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            helperText={error.actualizacion}
            error={!!error.actualizacion}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="conveniosVinculacion"
            name="conveniosVinculacion"
            label="Vinculación con colegios de profesionistas, academias profesionales, entre otras"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[5].programa?.conveniosVinculacion}
            onChange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            helperText={error.conveniosVinculacion}
            error={!!error.conveniosVinculacion}
            disabled={isDisabled}
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
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={9}>
          <InputFile
            tipoEntidad="PROGRAMA"
            tipoDocumento="REGLAS_ACADEMICAS"
            id={id}
            label="Reglas de operación de las academias"
            url={fileURLs[1]}
            setUrl={(url) => handleFileLoaded(1, url)}
            disabled={isDisabled}
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
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={9}>
          <InputFile
            tipoEntidad="PROGRAMA"
            tipoDocumento="PROPUESTA_HEMEROGRAFICA"
            id={id}
            label="Propuesta hemerobibliográfica"
            url={fileURLs[3]}
            setUrl={(url) => handleFileLoaded(3, url)}
            disabled={isDisabled}
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
            3. Documento que describa a detalle cada asignatura (Descargar
            plantilla).
            <br />
            4. Documento en el que se especifique la hemerobibliografía por
            asignatura (Descargar plantilla).
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

Curricula.defaultProps = {
  type: null,
};

Curricula.propTypes = {
  disabled: PropTypes.bool.isRequired,
  type: PropTypes.string,
};

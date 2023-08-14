import { Grid, TextField, Typography } from '@mui/material';
import { Input, InputFile } from '@siiges-ui/shared';
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatosGeneralesContext from '../utils/Context/datosGeneralesContext';
import formDatosSolicitud from '../utils/sections/forms/formDatosSolicitud';

function InstitucionData({ id }) {
  const {
    disabled, setDisabled, form, setForm, institucion,
  } = useContext(DatosGeneralesContext);

  useEffect(() => {
    if (id !== undefined) {
      setDisabled(false);
    }
  }, [id]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    formDatosSolicitud(name, value, form, setForm, 1);
  };

  const handleFileUrl = (url) => {
    setForm((prevForm) => ({
      ...prevForm,
      1: {
        ...prevForm[1],
        fileUrl: url,
      },
    }));
  };

  if (!institucion) {
    return null;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Datos de institución</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={3}>
          <Input
            id="razonSocial"
            label="Razon social"
            name="razonSocial"
            auto="razonSocial"
            onchange={handleOnChange}
            value={institucion?.razonSocial}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={9}>
          <Input
            id="nombre"
            label="Nombre de la institucion"
            name="nombre"
            auto="nombre"
            onchange={handleOnChange}
            value={institucion.nombre}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="historia"
            name="historia"
            label="Historia"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={institucion.historia}
            disabled={disabled}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="vision"
            label="Vision"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={institucion?.vision}
            disabled={disabled}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="mision"
            label="Mision"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={institucion?.mision}
            disabled={disabled}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="valoresInstitucionales"
            label="Valores institucionales"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={institucion?.valoresInstitucionales}
            disabled={disabled}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="PROGRAMA"
            tipoDocumento="FORMATO_PEDAGOGICO_01"
            id={id}
            label="FDP01"
            setUrl={handleFileUrl}
            disabled={disabled}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

InstitucionData.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([undefined])])
    .isRequired,
};

export default InstitucionData;

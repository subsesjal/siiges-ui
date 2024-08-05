import { Grid, Typography } from '@mui/material';
import { GetFile, Input, InputFile } from '@siiges-ui/shared';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DatosGeneralesContext from '../utils/Context/datosGeneralesContext';
import formDatosSolicitud from '../utils/sections/forms/formDatosSolicitud';

function InstitucionData({ id, disabled }) {
  const {
    setDisabled, form, setForm, institucion,
  } = useContext(DatosGeneralesContext);
  const [fileUrl, setFileUrl] = useState();
  const fileData = {
    entidadId: id,
    tipoEntidad: 'INSTITUCION',
    tipoDocumento: 'LOGOTIPO',
  };

  useEffect(() => {
    if (id !== undefined) {
      setDisabled(false);
    }
    GetFile(fileData, setFileUrl);
  }, [id]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    formDatosSolicitud(name, value, form, setForm, 1);
  };

  if (!institucion) {
    return null;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Datos de la institución</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={3}>
          <Input
            id="razonSocial"
            label="Razón social"
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
            label="Nombre de la institución"
            name="nombre"
            auto="nombre"
            onchange={handleOnChange}
            value={institucion.nombre}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="historia"
            name="historia"
            label="Historia"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={institucion.historia}
            disabled={disabled}
            onchange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="vision"
            label="Visión"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={institucion?.vision}
            disabled={disabled}
            onchange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="mision"
            label="Misión"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={institucion?.mision}
            disabled={disabled}
            onchange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="valoresInstitucionales"
            label="Valores institucionales"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={institucion?.valoresInstitucionales}
            disabled={disabled}
            onchange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="INSTITUCION"
            tipoDocumento="LOGOTIPO"
            id={id}
            label="Logo de la institución"
            url={fileUrl}
            setUrl={setFileUrl}
            disabled={disabled}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
InstitucionData.defaultProps = {
  disabled: false,
};

InstitucionData.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([undefined]),
  ]).isRequired,
  disabled: PropTypes.bool,
};

export default InstitucionData;

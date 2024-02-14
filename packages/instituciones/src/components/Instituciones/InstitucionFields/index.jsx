import { Grid, TextField } from '@mui/material';
import { Input } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React from 'react';

export default function InstitucionFields({
  handleOnChange,
  handleOnBlur,
  handleInputFocus,
  error,
}) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Input
          label="Nombre de institución"
          id="nombre"
          name="nombre"
          required
          onchange={handleOnChange}
          onblur={handleOnBlur}
          onfocus={handleInputFocus}
          errorMessage={error.nombre}
        />
      </Grid>
      <Grid item xs={12}>
        <Input
          label="Razón social"
          id="razonSocial"
          name="razonSocial"
          required
          onchange={handleOnChange}
          onblur={handleOnBlur}
          onfocus={handleInputFocus}
          errorMessage={error.razonSocial}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="historia"
          name="historia"
          label="Histroria de la institución"
          rows={4}
          multiline
          sx={{ width: '100%' }}
          onChange={handleOnChange}
          onFocus={handleInputFocus}
          errorMessage={error.historia}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="vision"
          name="vision"
          label="Visión"
          rows={4}
          multiline
          sx={{ width: '100%' }}
          onChange={handleOnChange}
          onFocus={handleInputFocus}
          errorMessage={error.vision}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="mision"
          name="mision"
          label="Misión"
          rows={4}
          multiline
          sx={{ width: '100%' }}
          onChange={handleOnChange}
          onFocus={handleInputFocus}
          errorMessage={error.mision}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="valoresInstitucionles"
          name="valoresInstitucionles"
          label="Valores Institucionales"
          rows={4}
          multiline
          sx={{ width: '100%' }}
          onChange={handleOnChange}
          onFocus={handleInputFocus}
          errorMessage={error.valoresInstitucionles}
        />
      </Grid>
    </Grid>
  );
}

InstitucionFields.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  handleOnBlur: PropTypes.func.isRequired,
  handleInputFocus: PropTypes.func.isRequired,
  error: PropTypes.shape({
    nombre: PropTypes.string,
    razonSocial: PropTypes.string,
    historia: PropTypes.string,
    vision: PropTypes.string,
    mision: PropTypes.string,
    valoresInstitucionles: PropTypes.string,
  }).isRequired,
};

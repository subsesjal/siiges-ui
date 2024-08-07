import { Grid, TextField, Typography } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SolicitudContext from '../utils/Context/solicitudContext';
import errorEgreso from '../utils/sections/errors/errorEgreso';
import formPrograma from '../utils/sections/forms/formPrograma';
import useSectionDisabled from './Hooks/useSectionDisabled';

export default function Egreso({ disabled }) {
  const [initialValues, setInitialValues] = useState({});

  const isSectionDisabled = useSectionDisabled(4);

  const isDisabled = disabled || isSectionDisabled;

  const {
    form, setForm, error, setError, setErrors,
  } = useContext(SolicitudContext);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    formPrograma(name, value, setForm, 4);
  };

  const errors = errorEgreso(form, setError, error);

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
        <Typography variant="h6">Egreso</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Perfil de Egreso</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <TextField
            id="perfilEgresoConocimientos"
            name="perfilEgresoConocimientos"
            label="Conocimientos"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[4].programa?.perfilEgresoConocimientos}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.perfilEgresoConocimientos}
            error={!!error.perfilEgresoConocimientos}
            disabled={isDisabled}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="perfilEgresoHabilidades"
            name="perfilEgresoHabilidades"
            label="Habilidades"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            value={form[4].programa?.perfilEgresoHabilidades}
            helperText={error.perfilEgresoHabilidades}
            error={!!error.perfilEgresoHabilidades}
            disabled={isDisabled}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="perfilEgresoActitudes"
            name="perfilEgresoActitudes"
            label="Actitudes"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            value={form[4].programa?.perfilEgresoActitudes}
            helperText={error.perfilEgresoActitudes}
            error={!!error.perfilEgresoActitudes}
            disabled={isDisabled}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="seguimientoEgresados"
            name="seguimientoEgresados"
            label="Proyecto de seguimiento a egresados"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            value={form[4].programa?.seguimientoEgresados}
            helperText={error.seguimientoEgresados}
            error={!!error.seguimientoEgresados}
            disabled={isDisabled}
            required
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

Egreso.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

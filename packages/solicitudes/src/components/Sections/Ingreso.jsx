import { Grid, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SolicitudContext from '../utils/Context/solicitudContext';
import errorIngreso from '../utils/sections/errors/errorIngreso';
import formPrograma from '../utils/sections/forms/formPrograma';
import useSectionDisabled from './Hooks/useSectionDisabled';

export default function Ingreso({ disabled }) {
  const [initialValues, setInitialValues] = useState({});

  const isSectionDisabled = useSectionDisabled(3);

  const isDisabled = disabled || isSectionDisabled;

  const {
    form, setForm, error, setError, setErrors,
  } = useContext(SolicitudContext);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    formPrograma(name, value, setForm, 3);
  };

  const errors = errorIngreso(form, setError, error);

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
        <Typography variant="h6">Ingreso</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <TextField
            id="metodosInduccion"
            name="metodosInduccion"
            label="Metodos de inducción"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[3].programa?.metodosInduccion}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.metodosInduccion}
            error={!!error.metodosInduccion}
            disabled={isDisabled}
            required
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Perfil de Ingreso</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <TextField
            id="perfilIngresoConocimientos"
            name="perfilIngresoConocimientos"
            label="Conocimientos"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[3].programa?.perfilIngresoConocimientos}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.perfilIngresoConocimientos}
            error={!!error.perfilIngresoConocimientos}
            disabled={isDisabled}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="perfilIngresoHabilidades"
            name="perfilIngresoHabilidades"
            label="Habilidades"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[3].programa?.perfilIngresoHabilidades}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.perfilIngresoHabilidades}
            error={!!error.perfilIngresoHabilidades}
            disabled={isDisabled}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="perfilIngresoActitudes"
            name="perfilIngresoActitudes"
            label="Actitudes"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[3].programa?.perfilIngresoActitudes}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.perfilIngresoActitudes}
            error={!!error.perfilIngresoActitudes}
            disabled={isDisabled}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="procesoSeleccion"
            name="procesoSeleccion"
            label="Proceso de selección"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            value={form[3].programa?.procesoSeleccion}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.procesoSeleccion}
            error={!!error.procesoSeleccion}
            disabled={isDisabled}
            required
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

Ingreso.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, TextField, Box } from '@mui/material';

const opcionesValidas = ['NS', 'NP', 'RC', 'SD'];

export default function CalificacionInput({
  id,
  value,
  disabled,
  updateCalificaciones,
}) {
  const [inputValue, setInputValue] = useState(value);
  const [autoValue, setAutoValue] = useState(value);

  const handleInputChange = (event, newInputValue) => {
    const newValue = newInputValue.toUpperCase().trim();

    if (/^\d*\.?\d*$/.test(newValue) || opcionesValidas.includes(newValue)) {
      setInputValue(newValue);
      updateCalificaciones(id, newValue);
    } else if (newValue === '') {
      setInputValue('');
      updateCalificaciones(id, '');
    }
  };

  const handleChange = (event, newValue) => {
    setAutoValue(newValue || '');
    updateCalificaciones(id, newValue || '');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Autocomplete
        freeSolo
        options={opcionesValidas}
        inputValue={inputValue}
        value={autoValue}
        onInputChange={handleInputChange}
        onChange={handleChange}
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            fullWidth
            disabled={disabled}
            sx={{ maxWidth: '100%' }}
          />
        )}
      />
    </Box>
  );
}

CalificacionInput.defaultProps = {
  value: '',
};

CalificacionInput.propTypes = {
  id: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  value: PropTypes.string,
  updateCalificaciones: PropTypes.func.isRequired,
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, TextField, Box } from '@mui/material';

const opcionesValidas = ['NS', 'NP', 'RC', 'SD'];

export default function CalificacionExtraInput({
  id,
  value,
  disabled,
  updateCalificaciones,
  calificacionMinima,
  calificacionMaxima,
  calificacionDecimal,
}) {
  const [inputValue, setInputValue] = useState(value);
  const [autoValue, setAutoValue] = useState(value);

  const handleInputChange = (event, newInputValue) => {
    const newValue = newInputValue.toUpperCase().trim();
    setInputValue(newValue);

    if (opcionesValidas.includes(newValue)) {
      updateCalificaciones(id, newValue);
      return;
    }

    if (/^\d*\.?\d*$/.test(newValue)) {
      const numericValue = parseFloat(newValue);

      if (numericValue >= calificacionMinima && numericValue <= calificacionMaxima) {
        updateCalificaciones(id, newValue);
      }
    }

    if (newValue === '') {
      updateCalificaciones(id, '');
    }
  };

  const handleBlur = () => {
    const numericValue = parseFloat(inputValue);

    if (!Number.isNaN(numericValue)) {
      let correctedValue = numericValue;

      if (!calificacionDecimal) {
        correctedValue = numericValue % 1 <= 0.5
          ? Math.floor(numericValue)
          : Math.ceil(numericValue);
      }
      if (correctedValue < calificacionMinima) {
        correctedValue = calificacionMinima;
      } else if (correctedValue > calificacionMaxima) {
        correctedValue = calificacionMaxima;
      }

      setInputValue(correctedValue.toString());
      updateCalificaciones(id, correctedValue.toString());
    } else {
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
        disabled={disabled}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            fullWidth
            disabled={disabled}
            sx={{ maxWidth: '100%' }}
            onBlur={handleBlur}
          />
        )}
      />
    </Box>
  );
}

CalificacionExtraInput.defaultProps = {
  value: '',
};

CalificacionExtraInput.propTypes = {
  id: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  value: PropTypes.string,
  updateCalificaciones: PropTypes.func.isRequired,
  calificacionMinima: PropTypes.number.isRequired,
  calificacionMaxima: PropTypes.number.isRequired,
  calificacionDecimal: PropTypes.bool.isRequired,
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

export default function CalificacionInput({
  id,
  value,
  disabled,
  updateCalificaciones,
  calificacionMinima,
  calificacionMaxima,
  calificacionDecimal,
}) {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e) => {
    const newValue = e.target.value;

    setInputValue(newValue);

    const numericValue = parseFloat(newValue);
    if (!Number.isNaN(numericValue)) {
      if (numericValue >= calificacionMinima && numericValue <= calificacionMaxima) {
        updateCalificaciones(id, newValue, 'calificacion');
      }
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
      updateCalificaciones(id, correctedValue.toString(), 'calificacion');
    } else {
      setInputValue('');
      updateCalificaciones(id, '', 'calificacion');
    }
  };

  return (
    <TextField
      name="calificacionInput"
      value={inputValue}
      variant="standard"
      disabled={disabled}
      inputProps={{
        min: calificacionMinima,
        max: calificacionMaxima,
        step: calificacionDecimal ? '0.1' : '1',
      }}
      onChange={handleChange}
      onBlur={handleBlur}
      fullWidth
    />
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
  calificacionMinima: PropTypes.number.isRequired,
  calificacionMaxima: PropTypes.number.isRequired,
  calificacionDecimal: PropTypes.bool.isRequired,
};

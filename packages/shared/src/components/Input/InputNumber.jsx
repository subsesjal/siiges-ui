import { TextField, InputAdornment, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function InputNumber({
  id,
  label,
  required,
  disabled,
  name,
  auto,
  value,
  size,
  errorMessage,
  onChange,
  onblur,
  onfocus,
  negative,
  min,
  max,
  sx,
}) {
  const [input, setInput] = useState(value ?? '');

  useEffect(() => {
    setInput(value ?? '');
  }, [value]);

  const clamp = (val) => {
    let result = val;

    if (min !== null && result < min) result = min;
    if (max !== null && result > max) result = max;

    return result;
  };

  const isValidFormat = (val) => {
    const regex = negative ? /^-?\d*\.?\d*$/ : /^\d*\.?\d*$/;
    return regex.test(val);
  };

  const handleOnChange = (e) => {
    const newValue = e.target.value;

    // Permitir escritura libre mientras sea formato válido
    if (isValidFormat(newValue)) {
      setInput(newValue);

      // Solo emitir si no es algo "incompleto"
      if (newValue !== '' && newValue !== '-' && newValue !== '.') {
        const floatValue = parseFloat(newValue);

        if (!Number.isNaN(floatValue)) {
          onChange({
            target: {
              name,
              value: floatValue,
            },
          });
        }
      }
    }
  };

  const handleOnBlur = (e) => {
    let finalValue = parseFloat(input);

    if (input === '' || input === '-' || Number.isNaN(finalValue)) {
      finalValue = min ?? 0;
    }

    finalValue = clamp(finalValue);

    setInput(finalValue);

    onChange({
      target: {
        name,
        value: finalValue,
      },
    });

    if (onblur) onblur(e);
  };

  const increment = () => {
    const currentValue = parseFloat(input) || 0;
    const newValue = clamp(currentValue + 1);

    setInput(newValue);

    onChange({
      target: {
        name,
        value: newValue,
      },
    });
  };

  const decrement = () => {
    const currentValue = parseFloat(input) || 0;
    const newValue = clamp(currentValue - 1);

    setInput(newValue);

    onChange({
      target: {
        name,
        value: newValue,
      },
    });
  };

  return (
    <TextField
      margin="normal"
      fullWidth
      id={id}
      label={label}
      required={required}
      disabled={disabled}
      name={name}
      autoComplete={auto}
      size={size}
      value={input}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      onFocus={onfocus}
      helperText={errorMessage}
      error={!!errorMessage}
      className="data-form"
      type="text"
      sx={sx}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={decrement} disabled={disabled}>
              <RemoveIcon />
            </IconButton>
            <IconButton onClick={increment} disabled={disabled}>
              <AddIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

InputNumber.defaultProps = {
  size: 'small',
  errorMessage: '',
  value: '',
  auto: '',
  required: false,
  disabled: false,
  onChange: () => {},
  onblur: () => {},
  onfocus: () => {},
  negative: false,
  min: null,
  max: null,
  sx: {},
};

InputNumber.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onblur: PropTypes.func,
  required: PropTypes.bool,
  onfocus: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  errorMessage: PropTypes.string,
  size: PropTypes.string,
  auto: PropTypes.string,
  negative: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  sx: PropTypes.object,
};

export default InputNumber;

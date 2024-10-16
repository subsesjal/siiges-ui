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
  const [input, setInput] = useState(value || 0);
  const [rangeError, setRangeError] = useState(null);

  useEffect(() => {
    setInput(value || 0);
  }, [value]);

  const handleOnChange = (e) => {
    const newValue = e.target.value;
    const numberRegex = negative ? /^-?\d*\.?\d*$/ : /^\d*\.?\d*$/;
    const floatValue = newValue === '' ? 0 : parseFloat(newValue);

    if (numberRegex.test(newValue)) {
      setInput(newValue);
      onChange({
        target: {
          name,
          value: floatValue,
        },
      });

      if (
        (min !== null && floatValue < min)
        || (max !== null && floatValue > max)
      ) {
        setRangeError(`Number must be between ${min} and ${max}`);
      } else {
        setRangeError(null);
      }
    }
  };

  const increment = () => {
    const currentValue = parseFloat(input) || 0;
    const newValue = currentValue + 1;
    if (max !== null && newValue > max) return;
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
    const newValue = currentValue - 1;
    if (min !== null && newValue < min) return;
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
      onBlur={onblur}
      onFocus={onfocus}
      helperText={rangeError || errorMessage}
      error={!!rangeError || !!errorMessage}
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

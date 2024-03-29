import { TextField } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
  onchange,
  onblur,
  onfocus,
  negative,
  min,
  max,
}) {
  const [input, setInput] = useState(value);
  const [rangeError, setRangeError] = useState(null);

  const handleOnChange = (e) => {
    const newValue = e.target.value;
    const numberRegex = negative ? /^-?\d*\.?\d*$/ : /^\d*\.?\d*$/;
    const floatValue = newValue === '' ? null : parseFloat(newValue);

    if (numberRegex.test(newValue)) {
      setInput(newValue);
      onchange({
        target: {
          name,
          value: floatValue,
        },
      });

      if ((min !== null && floatValue < min) || (max !== null && floatValue > max)) {
        setRangeError(`Number must be between ${min} and ${max}`);
      } else {
        setRangeError(null);
      }
    }
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
    />
  );
}

InputNumber.defaultProps = {
  size: 'small',
  errorMessage: '',
  value: '',
  required: false,
  disabled: false,
  onchange: () => {},
  onblur: () => {},
  onfocus: () => {},
  negative: false,
  min: null,
  max: null,
};

InputNumber.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onchange: PropTypes.func,
  onblur: PropTypes.func,
  required: PropTypes.bool,
  onfocus: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.number,
  errorMessage: PropTypes.string,
  size: PropTypes.string,
  auto: PropTypes.string.isRequired,
  negative: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default InputNumber;

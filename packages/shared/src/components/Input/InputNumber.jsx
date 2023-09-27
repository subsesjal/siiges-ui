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
}) {
  const [input, setInput] = useState(value);

  const handleOnChange = (e) => {
    const newValue = e.target.value;
    const numberRegex = negative ? /^-?\d*\.?\d*$/ : /^\d*\.?\d*$/;

    if (numberRegex.test(newValue)) {
      setInput(newValue);
      onchange({
        target: {
          name,
          value: newValue === '' ? null : parseFloat(newValue),
        },
      });
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
      helperText={errorMessage}
      error={!!errorMessage}
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
};

export default InputNumber;

import { TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Input({
  id,
  label,
  required,
  disabled,
  name,
  auto,
  type,
  value,
  size,
  errorMessage,
  onchange,
  onblur,
  onfocus,
}) {
  const [input, setInput] = useState(value);

  useEffect(() => {
    if (type === 'time' && value instanceof Date) {
      const hours = value.getHours().toString().padStart(2, '0');
      const minutes = value.getMinutes().toString().padStart(2, '0');
      setInput(`${hours}:${minutes}`);
    } else {
      setInput(value);
    }
  }, [type, value]);

  const handleOnChange = (e) => {
    const newValue = e.target.value;
    setInput(newValue);
    onchange({
      target: {
        name,
        value: type === 'date' || type === 'time' ? newValue : e.target.value,
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
      type={type === 'time' ? 'time' : type}
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
      InputLabelProps={
        type === 'date' || type === 'time' ? { shrink: true } : {}
      }
    />
  );
}

Input.defaultProps = {
  type: 'text',
  size: 'small',
  errorMessage: '',
  value: '',
  required: false,
  disabled: false,
  onchange: () => {},
  onblur: () => {},
  onfocus: () => {},
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onchange: PropTypes.func,
  onblur: PropTypes.func,
  required: PropTypes.bool,
  onfocus: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  errorMessage: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  auto: PropTypes.string.isRequired,
};

export default Input;

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
  variant,
}) {
  const [input, setInput] = useState(value);

  useEffect(() => {
    if (value instanceof Date) {
      if (type === 'time') {
        const hours = value.getHours().toString().padStart(2, '0');
        const minutes = value.getMinutes().toString().padStart(2, '0');
        setInput(`${hours}:${minutes}`);
      } else if (type === 'datetime') {
        setInput(value.toISOString().slice(0, 16));
      } else {
        setInput(value);
      }
    } else {
      setInput(value);
    }
  }, [type, value]);

  const handleOnChange = (e) => {
    const newValue = e.target.value;

    let formattedValue;
    if (type === 'datetime') {
      formattedValue = new Date(newValue);
    } else if (type === 'date' || type === 'time') {
      formattedValue = newValue;
    } else {
      formattedValue = e.target.value;
    }

    setInput(newValue);
    onchange({
      target: {
        name,
        value: formattedValue,
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
      variant={variant}
      type={type === 'datetime' ? 'datetime-local' : type}
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
        type === 'date' || type === 'time' || type === 'datetime'
          ? { shrink: true }
          : {}
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
  variant: 'outlined',
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
  variant: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]),
  errorMessage: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  auto: PropTypes.string.isRequired,
};

export default Input;

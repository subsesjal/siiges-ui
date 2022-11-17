import { TextField } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Input({
  id,
  label,
  name,
  auto,
  type,
  value,
  size,
  errorMessage,
  onchange,
  onblur,
}) {
  const [input, setInput] = useState(value);
  const handleOnChange = (e) => {
    setInput(e.target.value);
    onchange(e);
  };
  return (
    <TextField
      margin="normal"
      fullWidth
      id={id}
      label={label}
      type={type}
      name={name}
      autoComplete={auto}
      size={size}
      value={input}
      onChange={handleOnChange}
      onBlur={onblur}
      helperText={errorMessage}
      error={!!errorMessage}
      className="data-form"
    />
  );
}

Input.defaultProps = {
  type: 'text',
  size: 'small',
  errorMessage: '',
  value: '',
  onchange: () => {},
  onblur: () => {},
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onchange: PropTypes.func,
  onblur: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  value: PropTypes.string,
  errorMessage: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  auto: PropTypes.string.isRequired,
};

export default Input;

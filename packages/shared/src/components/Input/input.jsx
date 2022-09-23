import { TextField } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function Input({
  id,
  label,
  name,
  auto,
  type,
  size,
  errorMessage,
}) {
  return (
    <TextField
      margin="normal"
      fullWidth
      id={id}
      label={label}
      type={type}
      name={name}
      autoComplete={auto}
      autoFocus
      size={size}
      helperText={errorMessage}
      error={!!errorMessage}
    />
  );
}

Input.defaultProps = {
  type: 'text',
  size: 'small',
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  type: PropTypes.string,
  size: PropTypes.string,
  auto: PropTypes.string.isRequired,
};

export default Input;

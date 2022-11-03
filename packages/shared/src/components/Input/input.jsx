import { TextField } from '@mui/material';
import React from 'react';
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
      size={size}
      value={value}
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
  // eslint-disable-next-line react/require-default-props
  value: PropTypes.string,
  errorMessage: PropTypes.string.isRequired,
  type: PropTypes.string,
  size: PropTypes.string,
  auto: PropTypes.string.isRequired,
};

export default Input;

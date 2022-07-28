import { TextField } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function Input({
  id, label, name, auto, type, value,
}) {
  return (
    <TextField
      margin="normal"
      fullWidth
      id={id}
      label={label}
      type={type}
      name={name}
      value={value}
      autoComplete={auto}
      autoFocus
    />
  );
}

Input.defaultProps = {
  type: 'text',
  value: '',
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  auto: PropTypes.string.isRequired,
};

export default Input;

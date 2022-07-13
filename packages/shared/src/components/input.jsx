import { TextField } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function Input({
  id, label, name, auto,
}) {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      id={id}
      label={label}
      name={name}
      autoComplete={auto}
      autoFocus
    />
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  auto: PropTypes.string.isRequired,
};

export default Input;

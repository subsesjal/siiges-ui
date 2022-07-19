import { TextField } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function Input({
  id, label, name, auto, type,
}) {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      id={id}
      label={label}
      type={type}
      name={name}
      autoComplete={auto}
      autoFocus
    />
  );
}

Input.defaultProps = {
  type: 'text',
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  auto: PropTypes.string.isRequired,
};

export default Input;

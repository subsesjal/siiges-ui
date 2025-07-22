import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select as MuiSelect,
  FormHelperText,
} from '@mui/material';

export default function SituacionSelect({
  value,
  onChange,
  disabled,
  errorMessage,
  ifRepresentantes,
  options,
  name,
  title,
}) {
  const filteredOptions = ifRepresentantes
    ? options.filter((opt) => opt.id === 4 || opt.id === value)
    : options;

  return (
    <Box sx={{ minWidth: 120, mt: 2 }}>
      <FormControl fullWidth size="small" error={!!errorMessage}>
        <InputLabel>{title}</InputLabel>
        <MuiSelect
          label={title}
          name={name}
          value={value || ''}
          onChange={onChange}
          disabled={disabled}
        >
          {filteredOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.nombre}
            </MenuItem>
          ))}
        </MuiSelect>
        <FormHelperText>{errorMessage}</FormHelperText>
      </FormControl>
    </Box>
  );
}

SituacionSelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  ifRepresentantes: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      nombre: PropTypes.string,
    }),
  ).isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

SituacionSelect.defaultProps = {
  value: '',
  disabled: false,
  errorMessage: '',
  ifRepresentantes: false,
};

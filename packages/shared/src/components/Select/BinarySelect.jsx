import {
  Select, MenuItem, FormControl, InputLabel, Box,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

export default function BinarySelect({
  title,
  options,
  value,
  name,
  onChange,
  disabled,
}) {
  let normalizedValue = value;
  if (typeof value === 'boolean') {
    normalizedValue = value ? 1 : 0;
  } else if (value === '') {
    normalizedValue = 0;
  }

  const sortedOptions = [...options].sort((a, b) => b.id - a.id);

  return (
    <Box sx={{ minWidth: 120, mt: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel>{title}</InputLabel>
        <Select
          label={title}
          name={name}
          value={normalizedValue !== '' ? normalizedValue : 0}
          onChange={onChange}
          disabled={disabled}
        >
          {sortedOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

BinarySelect.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOf([0, 1]).isRequired,
      nombre: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.oneOf([0, 1]), PropTypes.bool]),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

BinarySelect.defaultProps = {
  value: 0,
  disabled: false,
};

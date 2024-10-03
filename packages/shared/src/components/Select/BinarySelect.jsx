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
}) {
  return (
    <Box sx={{ minWidth: 120, mt: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel>{title}</InputLabel>
        <Select label={title} name={name} value={value} onChange={onChange}>
          {options.map((option) => (
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
  ),
  value: PropTypes.oneOf([0, 1]).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

BinarySelect.defaultProps = {
  options: [
    { id: 0, label: 'Option 0' },
    { id: 1, label: 'Option 1' },
  ],
};

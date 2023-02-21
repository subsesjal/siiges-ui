import React, { useState } from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormHelperText } from '@mui/material';

export default function BasicSelect({
  title,
  options,
  value,
  name,
  onchange,
  onblur,
  required,
  errorMessage,
}) {
  const [option, setOption] = useState(value);
  const handleOnChange = (e) => {
    setOption(e.target.value);
    onchange(e);
  };
  return (
    <Box sx={{ minWidth: 120, mt: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel
          id="select-label"
          required={required}
          error={!!errorMessage}
        >
          {title}
        </InputLabel>
        <Select
          labelId="select-label"
          id={value}
          name={name}
          value={option}
          onChange={handleOnChange}
          onBlur={onblur}
          error={!!errorMessage}
        >
          {options.map((opcion) => (
            <MenuItem key={opcion.id} value={opcion.id}>
              {opcion.nombre}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error>{errorMessage}</FormHelperText>
      </FormControl>
    </Box>
  );
}

BasicSelect.defaultProps = {
  value: '',
  required: false,
  errorMessage: '',
  onchange: () => {},
  onblur: () => {},
};

BasicSelect.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      nombre: PropTypes.string,
    }),
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
  onchange: PropTypes.func,
  onblur: PropTypes.func,
};

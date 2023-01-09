import React, { useState } from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({
  title, options, value, name, onchange,
}) {
  const [option, setOption] = useState(value);
  const handleOnChange = (e) => {
    setOption(e.target.value);
    onchange(e);
  };
  return (
    <Box sx={{ minWidth: 120, mt: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="select-label">{title}</InputLabel>
        <Select
          labelId="select-label"
          id="algo"
          name={name}
          value={option}
          label={title}
          onChange={handleOnChange}
        >
          {options.map((opcion) => (
            <MenuItem key={opcion.id} value={opcion.id}>{opcion.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

BasicSelect.defaultProps = {
  value: '',
  onchange: () => {},
};

BasicSelect.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  name: PropTypes.string.isRequired,
  onchange: PropTypes.func,
};
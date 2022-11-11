import React, { useState } from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({
  title,
  options,
  value,
  name,
}) {
  const [option, setOption] = useState(value);
  const handleOnChange = (e) => {
    setOption(e.target.value);
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
            <MenuItem value={opcion.id}>{opcion.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

BasicSelect.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

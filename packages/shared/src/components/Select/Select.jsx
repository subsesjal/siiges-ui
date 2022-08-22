import React from 'react';
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
  onChange,
}) {
  return (
    <Box sx={{ minWidth: 120, mt: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="select-label">{title}</InputLabel>
        <Select
          labelId="select-form-label"
          id="select-form"
          value={value}
          label="Age"
          onChange={onChange}
        >
          {options.map((option) => (
            <MenuItem value={option.id}>{option.name}</MenuItem>
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
  onChange: PropTypes.string.isRequired,
};

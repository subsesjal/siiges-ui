import React, { useState, useEffect } from 'react';
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
  value: propValue,
  disabled,
  name,
  onchange,
  onfocus,
  multiple,
  onblur,
  required,
  errorMessage,
  textValue,
}) {
  const [option, setOption] = useState(propValue);

  useEffect(() => {
    setOption(propValue);
  }, [propValue]);

  const handleOnChange = (e) => {
    setOption(e.target.value);
    onchange(e);
  };

  return (
    <Box sx={{ minWidth: 120, mt: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel
          id="select-label"
          disabled={disabled}
          required={required}
          error={!!errorMessage}
        >
          {title}
        </InputLabel>
        <Select
          labelId="select-label"
          id={String(propValue)}
          label={title}
          name={name}
          value={option || ''}
          onChange={handleOnChange}
          onBlur={onblur}
          onFocus={onfocus}
          multiple={multiple}
          error={!!errorMessage}
          disabled={disabled}
          displayEmpty
        >
          <MenuItem value="" disabled={!multiple}>
            <em />
          </MenuItem>
          {options
            && options.map((opcion) => (
              <MenuItem
                key={opcion.id}
                value={textValue ? opcion.nombre : opcion.id}
              >
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
  value: [],
  required: false,
  multiple: false,
  disabled: false,
  textValue: false,
  errorMessage: '',
  onchange: () => { },
  onblur: () => { },
  onfocus: () => { },
};

BasicSelect.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      nombre: PropTypes.string,
    }),
  ).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ]),
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  textValue: PropTypes.bool,
  errorMessage: PropTypes.string,
  onchange: PropTypes.func,
  onblur: PropTypes.func,
  onfocus: PropTypes.func,
};

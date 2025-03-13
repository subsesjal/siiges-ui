import React, { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  FormHelperText,
  InputAdornment,
  ListSubheader,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const containsText = (text = '', searchText = '') => text.toString().toLowerCase().indexOf(searchText.toString().toLowerCase()) > -1;

export default function BasicSelect({
  title,
  options,
  value: propValue,
  disabled,
  name,
  onChange,
  onfocus,
  multiple,
  onblur,
  required,
  errorMessage,
  textValue,
}) {
  const [option, setOption] = useState(propValue);

  const [searchText, setSearchText] = useState('');
  const displayedOptions = useMemo(
    () => options?.filter((optionValue) => containsText(optionValue.nombre || '', searchText)),
    [searchText, options],
  );

  useEffect(() => {
    setOption(propValue);
  }, [propValue]);

  const handleOnChange = (e) => {
    setOption(e.target.value);
    onChange(e);
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
          onClose={() => setSearchText('')}
          multiple={multiple}
          error={!!errorMessage}
          disabled={disabled}
          MenuProps={{ autoFocus: false }}
          displayEmpty
        >
          <ListSubheader>
            <TextField
              size="small"
              autoFocus
              placeholder="Escriba para buscar..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== 'Escape') {
                  e.stopPropagation();
                }
              }}
            />
          </ListSubheader>
          {!multiple && (
          <MenuItem value="" disabled={!multiple}>
            <em />
          </MenuItem>
          )}
          {displayedOptions
            && displayedOptions.map((opcion) => (
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
  onChange: () => {},
  onblur: () => {},
  onfocus: () => {},
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
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  ]),
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  textValue: PropTypes.bool,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
  onblur: PropTypes.func,
  onfocus: PropTypes.func,
};

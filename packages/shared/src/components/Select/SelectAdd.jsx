import Tooltip from '@mui/material/Tooltip';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormHelperText, Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function SelectAdd({
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
  onAddClick,
}) {
  const [option, setOption] = useState(propValue);

  useEffect(() => {
    setOption(propValue);
  }, [propValue]);

  const handleOnChange = (e) => {
    setOption(e.target.value);
    onChange(e);
  };

  return (
    <Grid container sx={{ mt: 2 }}>
      <Grid item xs={10.5}>
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
            sx={{ height: '40px' }}
          >
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
      </Grid>
      <Grid item xs={1.5}>
        <Tooltip title="Agregar" placement="top">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onAddClick();
            }}
            disabled={disabled}
            edge="end"
            size="small"
            sx={{
              border: '1px solid',
              borderRadius: 1,
              borderColor: 'rgba(0, 0, 0, 0.23)',
              marginLeft: 1,
              height: '40px', // match the Select height
              width: '38px', // make it square
              '&:hover': {
                borderColor: 'rgba(0, 0, 0, 0.87)', // darken the border color on hover
              },
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

SelectAdd.defaultProps = {
  value: [],
  required: false,
  multiple: false,
  disabled: false,
  textValue: false,
  errorMessage: '',
  onChange: () => { },
  onblur: () => { },
  onfocus: () => { },
  onAddClick: () => { },
};

SelectAdd.propTypes = {
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
  disabled: PropTypes.bool,
  textValue: PropTypes.bool,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
  onblur: PropTypes.func,
  onfocus: PropTypes.func,
  onAddClick: PropTypes.func,
};

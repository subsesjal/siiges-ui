import React, { useState } from 'react';
import PropTypes from 'prop-types';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import ButtonVisibility from './buttonVisibility';

const handleClickShowPassword = (setValues, values) => {
  setValues({
    ...values,
    showPassword: !values.showPassword,
  });
};

const handleMouseDownPassword = (event) => {
  event.preventDefault();
};

function InputPassword({
  id, label, name, auto,
}) {
  const initialValues = {
    showPassword: false,
  };

  const [values, setValues] = useState(initialValues);

  return (
    <FormControl sx={{ mt: 1 }} variant="outlined">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        type={values.showPassword ? 'text' : 'password'}
        endAdornment={(
          <InputAdornment position="end" data-testid="visibility">
            <ButtonVisibility
              showPassword={values.showPassword}
              onPress={() => handleClickShowPassword(setValues, values)}
              onMouse={(event) => handleMouseDownPassword(event)}
            />
          </InputAdornment>
        )}
        label={label}
        name={name}
        autoComplete={auto}
      />
    </FormControl>
  );
}

InputPassword.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  auto: PropTypes.string.isRequired,
};

export default InputPassword;

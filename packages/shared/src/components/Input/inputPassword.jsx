import React, { useState } from 'react';
import PropTypes from 'prop-types';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import ButtonVisibility from '../Buttons/buttonVisibility';
import '../../styles/Inputs/InputPassword.css';

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
  id, label, name, auto, errorMessage,
}) {
  const initialValues = {
    showPassword: false,
  };

  const [values, setValues] = useState(initialValues);

  return (
    <FormControl className="formInputPasswrd" variant="outlined">
      <InputLabel htmlFor={id} error={!!errorMessage}>{label}</InputLabel>
      <OutlinedInput
        className="outlinedInput"
        margin="none"
        fullWidth
        id={id}
        type={values.showPassword ? 'text' : 'password'}
        error={!!errorMessage}
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
      {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}

InputPassword.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  auto: PropTypes.string.isRequired,
};

export default InputPassword;

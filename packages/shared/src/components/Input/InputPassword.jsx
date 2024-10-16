import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputAdornment from '@mui/material/InputAdornment';
import { TextField } from '@mui/material';
import ButtonVisibility from '../Buttons/ButtonVisibility';
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
  id,
  label,
  name,
  auto,
  value,
  size,
  required,
  errorMessage,
  onChange,
  onblur,
}) {
  const initialValues = {
    showPassword: false,
  };

  const [values, setValues] = useState(initialValues);

  const [input, setInput] = useState(value);
  const handleOnChange = (e) => {
    setInput(e.target.value);
    onChange(e);
  };

  return (
    <TextField
      margin="normal"
      fullWidth
      id={id}
      label={label}
      type={values.showPassword ? 'text' : 'password'}
      name={name}
      autoComplete={auto}
      size={size}
      required={required}
      value={input}
      onChange={handleOnChange}
      onBlur={onblur}
      helperText={errorMessage}
      error={!!errorMessage}
      className="data-form"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" data-testid="visibility">
            <ButtonVisibility
              showPassword={values.showPassword}
              onPress={() => handleClickShowPassword(setValues, values)}
              onMouse={(event) => handleMouseDownPassword(event)}
            />
          </InputAdornment>
        ),
      }}
    />
  );
}

InputPassword.defaultProps = {
  onChange: () => {},
  onblur: () => {},
  value: '',
  errorMessage: '',
  size: 'small',
  required: false,
};

InputPassword.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onblur: PropTypes.func,
  name: PropTypes.string.isRequired,
  auto: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
  errorMessage: PropTypes.string,
  size: PropTypes.string,
};

export default InputPassword;

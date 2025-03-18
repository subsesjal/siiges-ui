import { TextField, InputAdornment, IconButton } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';

function InputSearch({
  id,
  label,
  required,
  disabled,
  name,
  auto,
  value,
  size,
  errorMessage,
  onChange,
  onClickButton,
  onBlur,
  onFocus,
}) {
  return (
    <TextField
      margin="normal"
      fullWidth
      id={id}
      label={label}
      required={required}
      disabled={disabled}
      name={name}
      autoComplete={auto}
      size={size}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      helperText={errorMessage}
      error={!!errorMessage}
      className="data-form"
      type="text"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton key="search-button" onClick={onClickButton}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

InputSearch.defaultProps = {
  size: 'small',
  errorMessage: '',
  value: '',
  auto: '',
  required: false,
  disabled: false,
  onChange: undefined,
  onClickButton: undefined,
  onBlur: undefined,
  onFocus: undefined,
};

InputSearch.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onClickButton: PropTypes.func,
  onBlur: PropTypes.func,
  required: PropTypes.bool,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  errorMessage: PropTypes.string,
  size: PropTypes.string,
  auto: PropTypes.string,
};

export default React.memo(InputSearch);

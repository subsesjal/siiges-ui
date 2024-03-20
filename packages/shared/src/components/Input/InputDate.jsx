import React from 'react';
import PropTypes from 'prop-types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function InputDate({
  value,
  label,
  name,
  onchange,
  onfocus,
  onblur,
  errorMessage,
  disabled,
  required,
}) {
  const handleDateChange = (newDate) => {
    const formattedDate = newDate ? newDate.toISOString() : '';
    const event = {
      target: {
        name,
        value: formattedDate,
      },
    };

    onchange(event);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        name={name}
        onChange={handleDateChange}
        disabled={disabled}
        format="DD/MM/YYYY"
        sx={{ width: '100%', mt: 2 }}
        slotProps={{
          textField: {
            disabled,
            required,
            name,
            onChange: handleDateChange,
            helperText: errorMessage,
            error: !!errorMessage,
            size: 'small',
            onFocus: onfocus,
            onBlur: onblur,
          },
        }}
      />
    </LocalizationProvider>
  );
}

InputDate.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    .isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  onchange: PropTypes.func.isRequired,
  onfocus: PropTypes.func,
  onblur: PropTypes.func,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

InputDate.defaultProps = {
  label: '',
  name: '',
  onfocus: () => {},
  onblur: () => {},
  errorMessage: '',
  disabled: false,
  required: false,
};

export default InputDate;

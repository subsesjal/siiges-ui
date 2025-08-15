import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers';

function InputTime({
  value,
  label,
  name,
  onChange,
  onfocus,
  onblur,
  errorMessage,
  disabled,
  required,
  size,
}) {
  const handleDateChange = (newDate) => {
    if (newDate && newDate.isValid && newDate.isValid()) {
      const formattedDate = newDate.toDate();
      onChange({ target: { name, value: formattedDate } });
    } else {
      onChange({ target: { name, value: null } });
    }
  };

  const handleAccept = () => {
    if (onblur) {
      onblur({ target: { name } });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        value={value ? dayjs(value) : null}
        onChange={handleDateChange}
        onAccept={handleAccept}
        onFocus={onfocus}
        disabled={disabled}
        sx={{ width: '100%', mt: 2 }}
        slotProps={{
          textField: {
            name,
            disabled,
            required,
            onBlur: onblur,
            helperText: errorMessage,
            error: !!errorMessage,
            size,
          },
        }}
      />
    </LocalizationProvider>
  );
}

InputTime.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    .isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onfocus: PropTypes.func,
  onblur: PropTypes.func,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

InputTime.defaultProps = {
  label: '',
  name: '',
  onfocus: () => {},
  onblur: () => {},
  errorMessage: '',
  disabled: false,
  required: false,
  size: 'small',
};

export default InputTime;

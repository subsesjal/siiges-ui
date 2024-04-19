import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
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
    const isValidDate = newDate && dayjs(newDate).isValid();
    const formattedDate = isValidDate ? newDate.toISOString() : '';

    onchange({ target: { name, value: formattedDate } });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value ? dayjs(value) : null}
        name={name}
        onChange={handleDateChange}
        onFocus={onfocus}
        onBlur={onblur}
        disabled={disabled}
        maxDate={dayjs()}
        minDate={dayjs('1900-01-01')}
        format="DD/MM/YYYY"
        sx={{ width: '100%', mt: 2 }}
        slotProps={{
          textField: {
            disabled,
            required,
            helperText: errorMessage,
            error: !!errorMessage,
            size: 'small',
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

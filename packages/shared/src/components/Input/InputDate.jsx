import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/es';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

function InputDate({
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
  type,
  variant,
  marginTop,
}) {
  const handleDateChange = (newDate) => {
    const isValidDate = newDate && dayjs(newDate).isValid();
    let formattedDate = '';

    if (isValidDate) {
      if (type === 'datetime') {
        formattedDate = dayjs(newDate).format('YYYY-MM-DDTHH:mm:ss');
      } else {
        formattedDate = dayjs(newDate).format('YYYY-MM-DD');
      }
    }

    onChange({ target: { name, value: formattedDate } });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <DesktopDatePicker
        label={label}
        value={value ? dayjs(value) : null}
        name={name}
        onChange={handleDateChange}
        onFocus={onfocus}
        disabled={disabled}
        maxDate={dayjs('2100-01-01')}
        minDate={dayjs('1900-01-01')}
        format="DD/MM/YYYY"
        sx={{ width: '100%', mt: marginTop }}
        slotProps={{
          textField: {
            disabled,
            required,
            onBlur: onblur,
            helperText: errorMessage,
            error: !!errorMessage,
            size,
            variant,
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
  size: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onfocus: PropTypes.func,
  onblur: PropTypes.func,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  type: PropTypes.string,
  variant: PropTypes.string,
  marginTop: PropTypes.number,
};

InputDate.defaultProps = {
  type: 'date',
  label: '',
  name: '',
  onfocus: () => {},
  onblur: () => {},
  errorMessage: '',
  disabled: false,
  required: false,
  size: 'small',
  variant: 'outlined',
  marginTop: 2,
};

export default InputDate;

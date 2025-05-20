import { InputDate } from '@siiges-ui/shared';
import React from 'react';
import PropTypes from 'prop-types';

export default function FechaExamenInput({
  id,
  disabled,
  updateCalificaciones,
  value,
}) {
  const formatForInput = (dateStr) => {
    if (!dateStr) return '';

    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;

    const parts = dateStr.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return '';
  };

  const isValidDate = (dateStr) => {
    if (!dateStr) return false;
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const date = new Date(dateStr);
      return !Number.isNaN(date.getTime());
    }

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      const parts = dateStr.split('/');
      const date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      return !Number.isNaN(date.getTime());
    }

    return false;
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (isValidDate(inputValue)) {
      updateCalificaciones(id, inputValue, 'fechaExamen');
    } else {
      updateCalificaciones(id, '', 'fechaExamen');
    }
  };

  const inputValue = formatForInput(value);

  return (
    <div style={{ marginTop: -12, width: '100%' }}>
      <InputDate
        name="fechaExamen"
        type="date"
        value={inputValue}
        variant="standard"
        disabled={disabled}
        onChange={handleChange}
        size="small"
      />
    </div>
  );
}

FechaExamenInput.defaultProps = {
  value: '',
};

FechaExamenInput.propTypes = {
  value: PropTypes.string,
  id: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  updateCalificaciones: PropTypes.func.isRequired,
};

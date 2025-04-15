import { Input } from '@siiges-ui/shared';
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

  const formatForOutput = (dateStr) => {
    if (!dateStr) return '';
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) return dateStr;

    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return '';
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatForOutput(inputValue);
    updateCalificaciones(id, formattedValue, 'fechaExamen');
  };

  const inputValue = formatForInput(value);

  return (
    <div style={{ marginTop: -10, width: '100%' }}>
      <Input
        name="fechaExamen"
        type="date"
        value={inputValue}
        variant="standard"
        disabled={disabled}
        onChange={handleChange}
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

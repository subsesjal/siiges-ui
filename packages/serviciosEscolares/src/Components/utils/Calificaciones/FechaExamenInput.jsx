import { Input } from '@siiges-ui/shared';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function FechaExamenInput({
  id,
  disabled,
  updateCalificaciones,
  value,
}) {
  useEffect(() => {
    updateCalificaciones(id, value, 'fechaExamen');
  }, [value]);

  const handleChange = (e) => {
    updateCalificaciones(id, e.target.value, 'fechaExamen');
  };

  return (
    <div style={{ marginTop: -10, width: '100%' }}>
      <Input
        name="fechaExamen"
        type="date"
        value={value}
        variant="standard"
        disabled={disabled}
        onchange={handleChange}
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

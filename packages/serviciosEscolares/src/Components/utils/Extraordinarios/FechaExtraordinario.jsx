import { Input } from '@siiges-ui/shared';
import React from 'react';
import PropTypes from 'prop-types';

export default function FechaExtraordinario({ id, disabled, updateCalificaciones }) {
  const handleChange = (e) => {
    updateCalificaciones(id, e.target.value, 'fechaExamen');
  };

  return (
    <div style={{ marginTop: -10, width: '100%' }}>
      <Input
        name="fechaExamen"
        type="date"
        variant="standard"
        disabled={disabled}
        onchange={handleChange}
      />
    </div>
  );
}

FechaExtraordinario.propTypes = {
  id: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  updateCalificaciones: PropTypes.func.isRequired,
};

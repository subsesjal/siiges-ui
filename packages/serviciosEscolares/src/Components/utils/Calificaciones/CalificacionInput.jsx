import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@siiges-ui/shared';

export default function CalificacionInput({
  id,
  value,
  disabled,
  updateCalificaciones,
}) {
  const handleChange = (e) => {
    updateCalificaciones(id, e.target.value, 'calificacion');
  };

  return (
    <div style={{ marginTop: -10 }}>
      <Input
        name="calificacionInput"
        value={value}
        variant="standard"
        disabled={disabled}
        onchange={handleChange}
      />
    </div>
  );
}

CalificacionInput.defaultProps = {
  value: '',
};

CalificacionInput.propTypes = {
  id: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  value: PropTypes.string,
  updateCalificaciones: PropTypes.func.isRequired,
};

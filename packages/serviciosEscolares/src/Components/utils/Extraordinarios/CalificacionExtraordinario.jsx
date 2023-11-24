import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@siiges-ui/shared';

export default function CalificacionExtraordinario({
  id,
  disabled,
  updateCalificaciones,
}) {
  const handleChange = (e) => {
    updateCalificaciones(id, e.target.value, 'calificacion');
  };

  return (
    <div style={{ marginTop: -10 }}>
      <Input
        name="calificacionExtraordinario"
        variant="standard"
        disabled={disabled}
        onchange={handleChange}
      />
    </div>
  );
}

CalificacionExtraordinario.propTypes = {
  id: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  updateCalificaciones: PropTypes.func.isRequired,
};

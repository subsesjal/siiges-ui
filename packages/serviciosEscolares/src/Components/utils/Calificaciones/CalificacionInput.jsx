import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@siiges-ui/shared';

export default function CalificacionInput({
  id,
  value,
  disabled,
  updateCalificaciones,
  calificacionMinima,
  calificacionMaxima,
  calificacionDecimal,
}) {
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue < calificacionMinima || newValue > calificacionMaxima) return;
    if (!calificacionDecimal && newValue.includes('.')) return;
    updateCalificaciones(id, newValue, 'calificacion');
  };

  return (
    <div style={{ marginTop: -10 }}>
      <Input
        name="calificacionInput"
        value={value}
        variant="standard"
        disabled={disabled}
        onChange={handleChange}
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
  calificacionMinima: PropTypes.number.isRequired,
  calificacionMaxima: PropTypes.number.isRequired,
  calificacionDecimal: PropTypes.bool.isRequired,
};

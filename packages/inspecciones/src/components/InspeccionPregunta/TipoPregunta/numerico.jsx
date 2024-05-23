import { InputNumber } from '@siiges-ui/shared';
import React from 'react';
import PropTypes from 'prop-types';

export default function Numerico({ setForm, pregunta }) {
  const handleChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [pregunta.pregunta]: e.target.value,
    }));
  };

  return (
    <InputNumber
      id={pregunta.pregunta}
      name={pregunta.pregunta}
      auto={pregunta.pregunta}
      label=""
      onchange={handleChange}
      sx={{ marginTop: 0 }}
    />
  );
}

Numerico.propTypes = {
  setForm: PropTypes.func.isRequired,
  pregunta: PropTypes.shape({
    pregunta: PropTypes.string.isRequired,
  }).isRequired,
};

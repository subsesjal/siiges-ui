import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@siiges-ui/shared';

export default function Texto({ setForm, pregunta }) {
  const handleChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [pregunta.pregunta]: e.target.value,
    }));
  };
  return (
    <Input
      id={pregunta.pregunta}
      name={pregunta.pregunta}
      label=""
      multiline
      rows={2}
      onchange={handleChange}
      sx={{ marginTop: 0 }}
    />
  );
}

Texto.propTypes = {
  setForm: PropTypes.func.isRequired,
  pregunta: PropTypes.shape({
    pregunta: PropTypes.string.isRequired,
  }).isRequired,
};

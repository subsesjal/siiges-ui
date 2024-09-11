import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@siiges-ui/shared';

export default function Texto({
  setForm, pregunta, id, respuesta,
}) {
  const handleChange = (e) => {
    const questionData = {
      inspeccionId: id,
      inspeccionPreguntaId: pregunta.id,
      respuesta: e.target.value,
    };

    setForm((prevForm) => {
      const existingQuestionIndex = prevForm.findIndex(
        (item) => item.inspeccionPreguntaId === pregunta.id,
      );

      if (existingQuestionIndex !== -1) {
        return prevForm.map((item, index) => (index === existingQuestionIndex ? questionData : item));
      }
      return [...prevForm, questionData];
    });
  };

  return (
    <Input
      id={pregunta.pregunta}
      name={pregunta.pregunta}
      label=""
      multiline
      rows={2}
      value={respuesta || ''}
      onChange={handleChange}
      sx={{ marginTop: 0 }}
    />
  );
}

Texto.propTypes = {
  setForm: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  pregunta: PropTypes.shape({
    pregunta: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  respuesta: PropTypes.string,
};

Texto.defaultProps = {
  respuesta: '',
};

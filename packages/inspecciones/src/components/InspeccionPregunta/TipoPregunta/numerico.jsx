import { InputNumber } from '@siiges-ui/shared';
import React from 'react';
import PropTypes from 'prop-types';

export default function Numerico({
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
        return prevForm
          .map((item, index) => (index === existingQuestionIndex ? questionData : item));
      }
      return [...prevForm, questionData];
    });
  };

  return (
    <InputNumber
      id={pregunta.pregunta}
      name={pregunta.pregunta}
      auto={pregunta.pregunta}
      label=""
      onChange={handleChange}
      value={respuesta || ''}
      sx={{ marginTop: 0 }}
    />
  );
}

Numerico.propTypes = {
  setForm: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  pregunta: PropTypes.shape({
    pregunta: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  respuesta: PropTypes.number,
};

Numerico.defaultProps = {
  respuesta: 0,
};

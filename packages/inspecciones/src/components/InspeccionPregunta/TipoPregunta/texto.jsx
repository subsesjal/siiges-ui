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
        // Si la pregunta ya existe en el array, actualiza su respuesta
        return prevForm.map((item, index) => (index === existingQuestionIndex ? questionData : item));
      }
      // Si la pregunta no existe en el array, añádela
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
      value={respuesta || ''} // Usa la respuesta como valor inicial
      onChange={handleChange} // Corrige el nombre del prop a 'onChange'
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
  respuesta: PropTypes.string, // Agrega esta prop para manejar la respuesta
};

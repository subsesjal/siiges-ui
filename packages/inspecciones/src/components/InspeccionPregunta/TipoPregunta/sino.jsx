import React, { useState } from 'react';
import { Grid, Button, Box } from '@mui/material';
import PropTypes from 'prop-types';

export default function Sino({ setForm, pregunta, id }) {
  const [selected, setSelected] = useState(null);

  const handleClick = (value) => {
    setSelected(value);
    const questionData = {
      inspeccionId: id,
      inspeccionPreguntaId: pregunta.id,
      respuesta: value,
    };
    setForm((prevForm) => {
      const existingQuestionIndex = prevForm.findIndex(
        (item) => item.inspeccionPreguntaId === pregunta.id,
      );

      if (existingQuestionIndex !== -1) {
      // Si la pregunta ya existe en el array, actualiza su respuesta
        return prevForm
          .map((item, index) => (index === existingQuestionIndex ? questionData : item));
      }
      // Si la pregunta no existe en el array, añádela
      return [...prevForm, questionData];
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container justifyContent="flex-end">
        <Box>
          <Button
            onClick={() => handleClick(true)}
            sx={{
              color: selected === true ? 'white' : 'green',
              backgroundColor: selected === true ? 'green' : 'transparent',
              border: '1px solid green',
              marginRight: 1,
              '&:hover': {
                backgroundColor: 'green',
                color: 'white',
              },
            }}
          >
            Sí
          </Button>
          <Button
            onClick={() => handleClick(false)}
            sx={{
              color: selected === false ? 'white' : 'red',
              backgroundColor: selected === false ? 'red' : 'transparent',
              border: '1px solid red',
              '&:hover': {
                backgroundColor: 'red',
                color: 'white',
              },
            }}
          >
            No
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

Sino.propTypes = {
  setForm: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  pregunta: PropTypes.shape({
    pregunta: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

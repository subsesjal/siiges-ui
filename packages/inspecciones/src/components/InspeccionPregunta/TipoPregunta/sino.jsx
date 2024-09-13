import React, { useState, useEffect } from 'react';
import { Grid, Button, Box } from '@mui/material';
import PropTypes from 'prop-types';

export default function Sino({
  setForm, pregunta, id, respuesta,
}) {
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
        return prevForm
          .map((item, index) => (index === existingQuestionIndex ? questionData : item));
      }
      return [...prevForm, questionData];
    });
  };
  useEffect(() => {
    if (respuesta !== null) {
      setSelected(respuesta);
    }
    if (respuesta === 'true') {
      handleClick(true);
    } else if (respuesta === 'false') {
      handleClick(false);
    }
  }, [respuesta]);
  const sxStyles = {
    yesButton: {
      color: selected === true ? 'white' : 'green',
      backgroundColor: selected === true ? 'green' : 'transparent',
      border: '1px solid green',
      marginRight: 1,
      '&:hover': {
        backgroundColor: 'green',
        color: 'white',
      },
    },
    noButton: {
      color: selected === false ? 'white' : 'red',
      backgroundColor: selected === false ? 'red' : 'transparent',
      border: '1px solid red',
      '&:hover': {
        backgroundColor: 'red',
        color: 'white',
      },
    },
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container justifyContent="flex-end">
        <Box>
          <Button
            onClick={() => handleClick(true)}
            sx={sxStyles.yesButton}
          >
            Sí
          </Button>
          <Button
            onClick={() => handleClick(false)}
            sx={sxStyles.noButton}
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
  respuesta: PropTypes.bool,
};

Sino.defaultProps = {
  respuesta: null,
};

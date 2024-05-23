import React from 'react';
import { Grid, Typography, Divider } from '@mui/material';
import PropTypes from 'prop-types';
import Texto from './TipoPregunta/texto';
import Numerico from './TipoPregunta/numerico';
import Sino from './TipoPregunta/sino';

export default function InspeccionPregunta({ pregunta, setForm }) {
  const componentMap = {
    1: Sino,
    2: Numerico,
    3: Texto,
  };
  const QuestionComponent = componentMap[pregunta.tipoPreguntaId];
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Typography>{pregunta.pregunta}</Typography>
      </Grid>
      <Grid item xs={4}>
        {QuestionComponent && <QuestionComponent setForm={setForm} pregunta={pregunta} />}
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ marginBottom: 2 }} />
      </Grid>
    </Grid>
  );
}

InspeccionPregunta.propTypes = {
  pregunta: PropTypes.shape({
    pregunta: PropTypes.string.isRequired,
    tipoPreguntaId: PropTypes.number.isRequired,
  }).isRequired,
  setForm: PropTypes.func.isRequired,
};

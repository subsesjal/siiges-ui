import React from 'react';
import { Typography, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import ButtonStyled from '../Buttons/ButtonStyled';
import '../../Styles/PaperHome.css';

export default function PaperHome({ title, text }) {
  return (
    <Paper className="paper" variant="outlined">
      <Typography variant="h5" gutterBottom component="div">
        {title}
      </Typography>
      <hr />
      <Typography>
        {text}
      </Typography>
      <Stack direction="row" justifyContent="end" sx={{ mt: 2 }}>
        <ButtonStyled text="Botón" alt="Alternativo" />
      </Stack>
    </Paper>
  );
}

PaperHome.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

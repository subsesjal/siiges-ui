import React, { useState } from 'react';
import { Grid, Button, Box } from '@mui/material';
import PropTypes from 'prop-types';

export default function Sino({ setForm, pregunta }) {
  const [selected, setSelected] = useState(null);

  const handleClick = (value) => {
    setSelected(value);
    setForm((prevForm) => ({
      ...prevForm,
      [pregunta.pregunta]: value,
    }));
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
  pregunta: PropTypes.shape({
    pregunta: PropTypes.string.isRequired,
  }).isRequired,
};

import { ButtonStyled } from '@siiges-ui/shared';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Grid } from '@mui/material';
import submitNewSolicitud from '../utils/submitNewSolicitud';
import submitEditSolicitud from '../utils/submitEditSolicitud';

export default function ButtonSection({
  position,
  next,
  prev,
  nextModule,
  values,
}) {
  const [newSubmit, setNewSubmit] = useState(true);
  const submit = newSubmit
    ? () => submitNewSolicitud(values, next, setNewSubmit)
    : () => submitEditSolicitud(values, next, setNewSubmit);

  const button = {
    first: (
      <Grid container spacing={1} sx={{ textAlign: 'right', mt: 0.5 }}>
        <Grid item xs={9}>
          <ButtonStyled
            text="Terminar"
            alt="Terminar solicitud"
            type="success"
            onclick={nextModule}
          />
        </Grid>
        <Grid item xs={3}>
          <ButtonStyled
            text={<ArrowForwardIosIcon sx={{ height: 14 }} />}
            alt={<ArrowForwardIosIcon sx={{ height: 14 }} />}
            type="success"
            onclick={submit}
          />
        </Grid>
      </Grid>
    ),
    middle: (
      <Grid container spacing={1} sx={{ textAlign: 'right', mt: 0.5 }}>
        <Grid item xs={5}>
          <ButtonStyled
            text={<ArrowBackIosNewIcon sx={{ height: 14 }} />}
            alt={<ArrowBackIosNewIcon sx={{ height: 14 }} />}
            type="success"
            onclick={prev}
          />
        </Grid>
        <Grid item xs={4}>
          <ButtonStyled
            text="Terminar"
            alt="Terminar solicitud"
            type="success"
            onclick={nextModule}
          />
        </Grid>
        <Grid item xs={2}>
          <ButtonStyled
            text={<ArrowForwardIosIcon sx={{ height: 14 }} />}
            alt={<ArrowForwardIosIcon sx={{ height: 14 }} />}
            type="success"
            onclick={submit}
          />
        </Grid>
      </Grid>
    ),
    last: (
      <Grid container spacing={1} sx={{ textAlign: 'right', mt: 0.5 }}>
        <Grid item xs={8}>
          <ButtonStyled
            text={<ArrowBackIosNewIcon sx={{ height: 14 }} />}
            alt={<ArrowBackIosNewIcon sx={{ height: 14 }} />}
            type="success"
            onclick={prev}
          />
        </Grid>
        <Grid item xs={3}>
          <ButtonStyled
            text="Terminar"
            alt="Terminar solicitud"
            type="success"
            onclick={nextModule}
          />
        </Grid>
      </Grid>
    ),
    only: (
      <Grid container spacing={1} sx={{ textAlign: 'right', mt: 0.5 }}>
        <Grid item xs={12}>
          <ButtonStyled
            text="Terminar"
            alt="Terminar solicitud"
            type="success"
            onclick={nextModule}
          />
        </Grid>
      </Grid>
    ),
  };
  return button[position];
}

ButtonSection.propTypes = {
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
};

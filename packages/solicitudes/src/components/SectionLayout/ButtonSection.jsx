import { ButtonStyled } from '@siiges-ui/shared';
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Grid } from '@mui/material';
import submitNewSolicitud from '../utils/submitNewSolicitud';
import submitEditSolicitud from '../utils/submitEditSolicitud';
import SolicitudContext from '../utils/Context/solicitudContext';

export default function ButtonSection({
  id,
  sections,
  position,
  next,
  prev,
}) {
  const [newSubmit, setNewSubmit] = useState(true);
  const validations = useContext(SolicitudContext);
  const submit = newSubmit
    ? () => submitNewSolicitud(validations, setNewSubmit)
    : () => submitEditSolicitud(validations, sections, id);

  return (
    <>
      {position === 'first' && (
        <Grid container spacing={1} sx={{ textAlign: 'right', mt: 0.5 }}>
          <Grid item xs={9}>
            <ButtonStyled
              text="Terminar"
              alt="Terminar solicitud"
              type="success"
              onclick={submit}
            />
          </Grid>
          <Grid item xs={3}>
            <ButtonStyled
              text={<ArrowForwardIosIcon sx={{ height: 14 }} />}
              alt={<ArrowForwardIosIcon sx={{ height: 14 }} />}
              type="success"
              onclick={next}
            />
          </Grid>
        </Grid>
      )}
      {position === 'middle' && (
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
              onclick={submit}
            />
          </Grid>
          <Grid item xs={2}>
            <ButtonStyled
              text={<ArrowForwardIosIcon sx={{ height: 14 }} />}
              alt={<ArrowForwardIosIcon sx={{ height: 14 }} />}
              type="success"
              onclick={next}
            />
          </Grid>
        </Grid>
      )}
      {position === 'last' && (
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
              onclick={submit}
            />
          </Grid>
        </Grid>
      )}
      {position === 'only' && (
        <Grid container spacing={1} sx={{ textAlign: 'right', mt: 0.5 }}>
          <Grid item xs={12}>
            <ButtonStyled
              text="Terminar"
              alt="Terminar solicitud"
              type="success"
              onclick={submit}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}

ButtonSection.propTypes = {
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  /* nextModule: PropTypes.number.isRequired, */
  position: PropTypes.string.isRequired,
  sections: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

import React from 'react';
import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import '../../styles/buttons/ButtonAdd.css';
import ButtonSimple from './ButtonSimple';

export default function ButtonsSections({
  prev,
  next,
  confirm,
  confirmDisabled,
  cancel,
  position,
}) {
  const isStartPosition = position === 'first';
  const isMidPosition = position === 'middle';
  const isEndPosition = position === 'last';
  const confirmText = isEndPosition ? 'Finalizar' : 'Guardar';

  return (
    <Grid container justifyContent="space-between" spacing={2}>
      <Grid item>
        <ButtonSimple design="cancel" onClick={cancel} text="Cancelar" />
      </Grid>
      <Grid item>
        <Grid container justifyContent="flex-end" spacing={2}>
          {isStartPosition && (
            <Grid item>
              <ButtonSimple onClick={next}>
                <NavigateNextIcon />
              </ButtonSimple>
            </Grid>
          )}
          {isMidPosition && (
            <>
              <Grid item>
                <ButtonSimple onClick={prev}>
                  <NavigateNextIcon style={{ transform: 'rotate(180deg)' }} />
                </ButtonSimple>
              </Grid>
              <Grid item>
                <ButtonSimple onClick={next}>
                  <NavigateNextIcon />
                </ButtonSimple>
              </Grid>
            </>
          )}
          {isEndPosition && (
            <>
              <Grid item>
                <ButtonSimple onClick={prev}>
                  <NavigateNextIcon style={{ transform: 'rotate(180deg)' }} />
                </ButtonSimple>
              </Grid>
              {!confirmDisabled && (
                <Grid item>
                  <ButtonSimple onClick={confirm}>
                    <Typography variant="body1">{confirmText}</Typography>
                  </ButtonSimple>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

ButtonsSections.defaultProps = {
  confirmDisabled: false,
};

ButtonsSections.propTypes = {
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
  confirmDisabled: PropTypes.bool,
};

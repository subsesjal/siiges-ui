import React from 'react';
import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import '../../styles/buttons/ButtonAdd.css';

export default function ButtonsSections({
  prev,
  next,
  confirm,
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
        <ButtonUnstyled className="buttonAdd cancel" onClick={cancel}>
          <Typography variant="body1">Cancelar</Typography>
        </ButtonUnstyled>
      </Grid>
      <Grid item>
        <Grid container justifyContent="flex-end" spacing={2}>
          {isStartPosition && (
            <Grid item>
              <ButtonUnstyled className="buttonAdd guardar" onClick={next}>
                <NavigateNextIcon />
              </ButtonUnstyled>
            </Grid>
          )}
          {isMidPosition && (
            <>
              <Grid item>
                <ButtonUnstyled className="buttonAdd guardar" onClick={prev}>
                  <NavigateNextIcon style={{ transform: 'rotate(180deg)' }} />
                </ButtonUnstyled>
              </Grid>
              <Grid item>
                <ButtonUnstyled className="buttonAdd guardar" onClick={next}>
                  <NavigateNextIcon />
                </ButtonUnstyled>
              </Grid>
            </>
          )}
          {isEndPosition && (
            <>
              <Grid item>
                <ButtonUnstyled className="buttonAdd guardar" onClick={prev}>
                  <NavigateNextIcon style={{ transform: 'rotate(180deg)' }} />
                </ButtonUnstyled>
              </Grid>
              <Grid item>
                <ButtonUnstyled className="buttonAdd guardar" onClick={confirm}>
                  <Typography variant="body1">{confirmText}</Typography>
                </ButtonUnstyled>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

ButtonsSections.propTypes = {
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
};

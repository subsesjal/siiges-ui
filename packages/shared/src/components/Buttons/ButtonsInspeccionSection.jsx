import React from 'react';
import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useRouter } from 'next/router';

import '../../styles/buttons/ButtonAdd.css';

export default function ButtonsInspeccionSection({
  prev,
  next,
  confirm,
  position,
}) {
  const router = useRouter();
  const isStartPosition = position === 'first';
  const isEndPosition = position === 'last';
  const confirmText = isEndPosition ? 'Finalizar' : 'Guardar';

  return (
    <Grid container justifyContent="space-between" spacing={2}>
      <Grid item>
        <ButtonUnstyled
          className="buttonAdd cancel"
          onClick={() => router.back()}
        >
          <Typography variant="body1">Cancelar</Typography>
        </ButtonUnstyled>
      </Grid>
      <Grid item>
        <Grid container justifyContent="flex-end" spacing={2}>
          {!isStartPosition && (
            <Grid item>
              <ButtonUnstyled className="buttonAdd guardar" onClick={prev}>
                <NavigateNextIcon style={{ transform: 'rotate(180deg)' }} />
              </ButtonUnstyled>
            </Grid>
          )}
          <Grid item>
            <ButtonUnstyled className="buttonAdd guardar" onClick={confirm}>
              <Typography variant="body1">{confirmText}</Typography>
            </ButtonUnstyled>
          </Grid>
          {!isEndPosition && (
            <Grid item>
              <ButtonUnstyled className="buttonAdd guardar" onClick={next}>
                <NavigateNextIcon />
              </ButtonUnstyled>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

ButtonsInspeccionSection.propTypes = {
  confirm: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
};

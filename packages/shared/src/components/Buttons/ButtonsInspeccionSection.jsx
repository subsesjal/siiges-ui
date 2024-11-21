import React from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useRouter } from 'next/router';

import '../../styles/buttons/ButtonAdd.css';
import ButtonSimple from './ButtonSimple';

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
        <ButtonSimple
          design="cancel"
          onClick={() => router.back()}
          text="Cancelar"
        />
      </Grid>
      <Grid item>
        <Grid container justifyContent="flex-end" spacing={2}>
          {!isStartPosition && (
            <Grid item>
              <ButtonSimple onClick={prev}>
                <NavigateNextIcon style={{ transform: 'rotate(180deg)' }} />
              </ButtonSimple>
            </Grid>
          )}
          <Grid item>
            <ButtonSimple onClick={confirm} text={confirmText} />
          </Grid>
          {!isEndPosition && (
            <Grid item>
              <ButtonSimple className="buttonAdd guardar" onClick={next}>
                <NavigateNextIcon />
              </ButtonSimple>
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

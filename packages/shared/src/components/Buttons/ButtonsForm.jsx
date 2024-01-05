import React from 'react';
import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';

import '../../styles/buttons/ButtonAdd.css';

export default function UserForm({ confirm, cancel }) {
  return (
    <Grid container justifyContent="flex-end" spacing={2}>
      <Grid item>
        <ButtonUnstyled className="buttonAdd cancel" onClick={cancel}>
          <Typography variant="body1">Cancelar</Typography>
        </ButtonUnstyled>
      </Grid>
      <Grid item>
        <ButtonUnstyled className="buttonAdd guardar" onClick={confirm}>
          <Typography variant="body1">Guardar</Typography>
        </ButtonUnstyled>
      </Grid>
    </Grid>
  );
}

UserForm.propTypes = {
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};

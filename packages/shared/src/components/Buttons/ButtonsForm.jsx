import React from 'react';
import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import '../../styles/buttons/ButtonAdd.css';

export default function UserForm({
  confirm,
  cancel,
  confirmDisabled,
  confirmText = 'Guardar',
  justifyContent,
}) {
  const cancelText = confirmDisabled ? 'Regresar' : 'Cancelar';
  const align = justifyContent || 'flex-end';

  return (
    <Grid container justifyContent={align} spacing={2}>
      <Grid item>
        <ButtonUnstyled className="buttonAdd cancel" onClick={cancel}>
          <Typography variant="body1">{cancelText}</Typography>
        </ButtonUnstyled>
      </Grid>
      {!confirmDisabled && (
        <Grid item>
          <ButtonUnstyled
            className="buttonAdd guardar"
            disabled={confirmDisabled}
            onClick={confirm}
          >
            <Typography variant="body1">{confirmText}</Typography>
          </ButtonUnstyled>
        </Grid>
      )}
    </Grid>
  );
}

UserForm.propTypes = {
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  confirmDisabled: PropTypes.bool,
  confirmText: PropTypes.string,
  justifyContent: PropTypes.string,
};
UserForm.defaultProps = {
  confirmDisabled: false,
  confirmText: 'Guardar',
  justifyContent: 'flex-end',
};

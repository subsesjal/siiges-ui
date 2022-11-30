import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

export default function SnackAlert({
  open, close, type, mensaje,
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={close}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert variant="filled" onClose={close} severity={type} sx={{ width: '100%' }}>
        {mensaje}
      </Alert>
    </Snackbar>
  );
}

SnackAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  mensaje: PropTypes.string.isRequired,
};

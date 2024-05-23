import { Alert, Snackbar, Slide } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function SlideTransition(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide {...props} direction="left" />;
}

export default function SnackAlert({
  open, close, type, mensaje,
}) {
  const [internalType, setInternalType] = useState(type);

  useEffect(() => {
    if (open) {
      setInternalType(type);
    }
  }, [open, type]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={close}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      TransitionComponent={SlideTransition}
    >
      <Alert
        variant="filled"
        onClose={close}
        severity={internalType}
        sx={{ width: '100%' }}
      >
        {mensaje}
      </Alert>
    </Snackbar>
  );
}

SnackAlert.defaultProps = {
  open: false,
  mensaje: '',
};

SnackAlert.propTypes = {
  open: PropTypes.bool,
  type: PropTypes.oneOf(['error', 'warning', 'info', 'success']).isRequired,
  mensaje: PropTypes.string,
  close: PropTypes.func.isRequired,
};

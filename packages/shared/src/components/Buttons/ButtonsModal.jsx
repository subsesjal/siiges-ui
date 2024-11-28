import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import '../../styles/buttons/ButtonAdd.css';
import ButtonSimple from './ButtonSimple';

export default function ButtonsModal({
  confirm, cancel, edit, eliminate,
}) {
  const [cancelText, setCancelText] = useState('Regresar');
  const [confirmText, setConfirmText] = useState('Regresar');

  useEffect(() => {
    setCancelText(edit ? 'Cancelar' : 'Regresar');
  }, [edit]);

  useEffect(() => {
    setConfirmText(eliminate ? 'Eliminar' : 'Guardar');
  }, [eliminate]);

  return (
    <Grid container justifyContent="flex-end" spacing={2}>
      <Grid item>
        <ButtonSimple design="cancel" onClick={cancel} text={cancelText} />
      </Grid>
      {edit && (
        <Grid item>
          <ButtonSimple onClick={confirm} text={confirmText} />
        </Grid>
      )}
    </Grid>
  );
}

ButtonsModal.defaultProps = {
  edit: true,
  eliminate: false,
};

ButtonsModal.propTypes = {
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  edit: PropTypes.bool,
  eliminate: PropTypes.bool,
};

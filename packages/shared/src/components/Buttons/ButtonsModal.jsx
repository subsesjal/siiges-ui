import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import '../../styles/buttons/ButtonAdd.css';
import ButtonSimple from './ButtonSimple';

export default function ButtonsModal({ confirm, cancel, edit }) {
  const [cancelText, setCancelText] = useState('Regresar');

  useEffect(() => {
    setCancelText(edit ? 'Cancelar' : 'Regresar');
  }, [edit]);

  return (
    <Grid container justifyContent="flex-end" spacing={2}>
      <Grid item>
        <ButtonSimple design="cancel" onClick={cancel} text={cancelText} />
      </Grid>
      {edit && (
        <Grid item>
          <ButtonSimple onClick={confirm} text="Guardar" />
        </Grid>
      )}
    </Grid>
  );
}

ButtonsModal.defaultProps = {
  edit: true,
};

ButtonsModal.propTypes = {
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  edit: PropTypes.bool,
};

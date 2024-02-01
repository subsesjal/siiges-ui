import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import '../../styles/buttons/ButtonAdd.css';

export default function ButtonsModal({ confirm, cancel, edit }) {
  const [cancelText, setCancelText] = useState('Regresar');

  useEffect(() => {
    setCancelText(edit ? 'Cancelar' : 'Regresar');
  }, [edit]);

  return (
    <Grid container justifyContent="flex-end" spacing={2}>
      <Grid item>
        <ButtonUnstyled className="buttonAdd cancel" onClick={cancel}>
          {cancelText}
        </ButtonUnstyled>
      </Grid>
      {edit && (
        <Grid item>
          <ButtonUnstyled className="buttonAdd guardar" onClick={confirm}>
            Guardar
          </ButtonUnstyled>
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

import React from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import ButtonStyled from './ButtonStyled';
import '../../styles/buttons/ButtonForm.css';

export default function UserForm({ confirm, cancel }) {
  return (
    <Grid container>
      <Grid item xs={6}>
        <ButtonStyled
          text="Cancelar"
          alt="Cancelar"
          design="error"
          onclick={cancel}
        />
      </Grid>
      <Grid item xs={6}>
        <ButtonStyled
          text="Guardar"
          alt="Guardar"
          design="success"
          type="submit"
          onclick={confirm}
        />
      </Grid>
    </Grid>
  );
}

UserForm.propTypes = {
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};

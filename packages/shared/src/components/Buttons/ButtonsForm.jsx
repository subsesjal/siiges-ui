import React from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import ButtonStyled from './ButtonStyled';
import '../../styles/buttons/ButtonForm.css';

export default function UserForm({ confirm, cancel }) {
  return (
    <Grid
      container
      spacing={5}
      justifyContent="center"
      alignItems="center"
      className="userFormContainer"
    >
      <Grid item xs={2} className="userFormItem">
        <ButtonStyled
          text="Cancelar"
          alt="Cancelar"
          design="error"
          onclick={cancel}
        />
      </Grid>
      <Grid item xs={2}>
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

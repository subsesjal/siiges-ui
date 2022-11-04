import React from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import ButtonStyled from './ButtonStyled';
import '../../styles/buttons/ButtonForm.css';

export default function UserForm({ onconfirm }) {
  return (
    <Grid
      container
      spacing={5}
      justifyContent="center"
      alignItems="center"
      className="userFormContainer"
    >
      <Grid item xs={2} className="userFormItem">
        <ButtonStyled text="Cancelar" alt="Cancelar" design="error" />
      </Grid>
      <Grid item xs={2}>
        <ButtonStyled
          text="Guardar"
          alt="Guardar"
          design="success"
          type="submit"
          onclick={onconfirm}
        />
      </Grid>
    </Grid>
  );
}

UserForm.propTypes = {
  onconfirm: PropTypes.func.isRequired,
};

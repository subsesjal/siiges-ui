import React from 'react';
import { Grid } from '@mui/material';
import ButtonStyled from './ButtonStyled';
import '../../styles/buttons/ButtonForm.css';

export default function UserForm() {
  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center" className="userFormContainer">
      <Grid item xs={2} className="userFormItem">
        <ButtonStyled text="Cancelar" alt="Cancelar" type="error" />
      </Grid>
      <Grid item xs={2}>
        <ButtonStyled text="Guardar" alt="Guardar" type="success" />
      </Grid>
    </Grid>
  );
}

import React from 'react';
import { Grid } from '@mui/material';
import ButtonStyled from './ButtonStyled';

export default function UserForm() {
  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center" sx={{ marginTop: 0, marginLeft: -30 }}>
      <Grid item xs={2} sx={{ marginX: 1 }}>
        <ButtonStyled text="Cancelar" alt="Cancelar" type="error" />
      </Grid>
      <Grid item xs={2} sx={{ marginX: 1 }}>
        <ButtonStyled text="Guardar" alt="Guardar" type="success" />
      </Grid>
    </Grid>
  );
}

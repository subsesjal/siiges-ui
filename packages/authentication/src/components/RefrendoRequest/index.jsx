import { Grid } from '@mui/material';
import { ButtonStyled, Input } from '@siiges-ui/shared';
import React from 'react';

function Refrendo() {
  return (
    <Grid item>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Input
            label="Programa"
            id="program"
            name="program"
            auto="program"
          />
        </Grid>
        <Grid item xs={2} sx={{ mt: 2, mb: 1 }}>
          <ButtonStyled text="Crear" alt="Refrendo" />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Refrendo;

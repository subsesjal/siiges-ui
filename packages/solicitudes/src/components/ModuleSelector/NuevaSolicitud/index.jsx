import { Grid } from '@mui/material';
import { ButtonStyled, Input } from '@siiges-ui/shared';
import Link from 'next/link';
import React from 'react';

function NewRequest() {
  return (
    <Grid item>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Input
            label="Modalidad"
            id="modalidad"
            name="modalidad"
            auto="modalidad"
          />
        </Grid>
        <Grid item xs={5}>
          <Input
            label="Plantel"
            id="plantel"
            name="plantel"
            auto="plantel"
          />
        </Grid>
        <Grid item xs={2} sx={{ mt: 2, mb: 1 }}>
          <Link href="/solicitudes/nuevaSolicitud">
            <div style={{ height: '100%' }}>
              <ButtonStyled text="Crear" alt="Nueva Solicitud" />
            </div>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default NewRequest;

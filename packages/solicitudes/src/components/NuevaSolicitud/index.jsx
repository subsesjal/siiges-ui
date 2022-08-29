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
            label="Primer Apellido"
            id="lastname1"
            name="lastname1"
            auto="lastname1"
          />
        </Grid>
        <Grid item xs={5}>
          <Input
            label="Segundo Apellido"
            id="lastname2"
            name="lastname2"
            auto="lastname2"
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

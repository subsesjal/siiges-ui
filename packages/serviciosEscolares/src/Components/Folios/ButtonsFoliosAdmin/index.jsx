import { Grid } from '@mui/material';
import { ButtonSimple } from '@siiges-ui/shared';
import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

export default function ButtonsFoliosAdmin({ observaciones, folios, estatus }) {
  const router = useRouter();

  const buttonFolios = estatus !== 3 ? 'Generar Folios' : 'Envio Titulación';
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={6}>
        <ButtonSimple
          text="Regresar"
          align="left"
          onClick={() => {
            router.back();
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <ButtonSimple text="Enviar observaciones" onClick={observaciones} />
          </Grid>
          <Grid item>
            <ButtonSimple text={buttonFolios} onClick={folios} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

ButtonsFoliosAdmin.propTypes = {
  observaciones: PropTypes.func.isRequired,
  folios: PropTypes.func.isRequired,
  estatus: PropTypes.number.isRequired,
};

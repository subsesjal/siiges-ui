import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { ButtonsForm, ButtonSimple, DefaultModal } from '@siiges-ui/shared';

export default function ButtonsFolios({ confirm, cancel, send }) {
  const [open, setOpen] = useState(false);
  return (
    <Grid container justifyContent="flex-end" spacing={2}>
      <Grid item>
        <ButtonSimple text="Cancelar" onClick={cancel} design="cancel" />
      </Grid>
      <Grid item>
        <ButtonSimple text="Guardar" onClick={confirm} />
      </Grid>
      <Grid item>
        <ButtonSimple
          text="Enviar"
          onClick={() => {
            setOpen(true);
          }}
        />
      </Grid>
      <DefaultModal title="Enviar solicitud" open={open} setOpen={setOpen}>
        <Typography sx={{ mb: 2 }}>
          ¿Esta seguro de enviar la solicitud?. una vez enviada ya no podra ser
          editada
        </Typography>
        <ButtonsForm
          cancel={() => {
            setOpen(false);
          }}
          confirm={() => {
            send();
          }}
        />
      </DefaultModal>
    </Grid>
  );
}

ButtonsFolios.propTypes = {
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  send: PropTypes.func.isRequired,
};

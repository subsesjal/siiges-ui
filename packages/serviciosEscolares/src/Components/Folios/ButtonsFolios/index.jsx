import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { ButtonsForm, ButtonSimple, DefaultModal } from '@siiges-ui/shared';

export default function ButtonsFolios({
  confirm, cancel, send, disabled,
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Grid container justifyContent="flex-end" spacing={2}>
      <Grid item>
        <ButtonSimple text="Cancelar" onClick={cancel} design="cancel" />
      </Grid>
      {!disabled && (
        <>
          <Grid item>
            <ButtonSimple text="Guardar" onClick={confirm} />
          </Grid>
          <Grid item>
            <ButtonSimple
              text="Enviar Solicitud"
              onClick={() => setOpen(true)}
            />
          </Grid>
        </>
      )}
      <DefaultModal title="Enviar solicitud" open={open} setOpen={setOpen}>
        <Typography sx={{ mb: 2 }}>
          ¿Está seguro de enviar la solicitud? Una vez enviada, ya no podrá ser
          editada.
        </Typography>
        <ButtonsForm
          cancel={() => setOpen(false)}
          confirm={async () => {
            const response = await send();
            if (response && (response.statusCode === 200 || response.statusCode === 201)) {
              setOpen(false);
              router.push('/serviciosEscolares/solicitudesFolios');
            }
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
  disabled: PropTypes.bool.isRequired,
};

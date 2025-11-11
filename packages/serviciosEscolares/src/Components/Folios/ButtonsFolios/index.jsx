import React, { useState } from 'react';
import {
  Grid, Typography,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import { ButtonsForm, ButtonSimple, DefaultModal } from '@siiges-ui/shared';

export default function ButtonsFolios({
  save,
  cancel,
  send,
  disabled,
  saved,
  alumnos,
}) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);

  const handleEnviarClick = () => {
    if (!alumnos || alumnos.length === 0) {
      setOpenWarning(true);
      return;
    }
    setOpenConfirm(true);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={6}>
        <ButtonSimple
          text="Regresar"
          onClick={cancel}
          design="cancel"
          align="left"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Grid container justifyContent="flex-end" spacing={2}>
          {!disabled && (
            !saved ? (
              <Grid item>
                <ButtonSimple text="Guardar" onClick={save} />
              </Grid>
            ) : (
              <Grid item>
                <ButtonSimple
                  text="Enviar Solicitud"
                  onClick={handleEnviarClick}
                />
              </Grid>
            )
          )}
        </Grid>
      </Grid>
      <DefaultModal
        title="Sin alumnos registrados"
        open={openWarning}
        setOpen={setOpenWarning}
      >
        <Typography sx={{ mb: 2 }}>
          No hay alumnos registrados para esta solicitud.
          Por favor, agrega al menos un alumno antes de continuar.
        </Typography>

        <Button
          variant="contained"
          onClick={() => setOpenWarning(false)}
        >
          Entendido
        </Button>
      </DefaultModal>
      <DefaultModal
        title="Enviar solicitud"
        open={openConfirm}
        setOpen={setOpenConfirm}
      >
        <Typography sx={{ mb: 2 }}>
          ¿Está seguro de enviar la solicitud? Una vez enviada, ya no podrá ser editada.
        </Typography>

        <ButtonsForm
          cancel={() => setOpenConfirm(false)}
          confirm={async () => {
            const response = await send();
            if (
              response
              && (response.statusCode === 200 || response.statusCode === 201)
            ) {
              setOpenConfirm(false);
            }
          }}
        />
      </DefaultModal>
    </Grid>
  );
}

ButtonsFolios.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  send: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  saved: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  alumnos: PropTypes.array.isRequired,
};

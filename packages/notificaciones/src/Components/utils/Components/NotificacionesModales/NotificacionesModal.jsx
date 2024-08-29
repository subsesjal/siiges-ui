import React from 'react';
import { Grid, Typography } from '@mui/material';
import { DefaultModal, ButtonSimple } from '@siiges-ui/shared';
import PropTypes from 'prop-types';

export default function NotificacionesModal({
  open,
  hideModal,
  notificacionData, // Recibe los datos como props
}) {
  return (
    <DefaultModal open={open} setOpen={hideModal} title="Detalles de Notificación">
      <Grid container spacing={2} sx={{ width: '100%' }}>
        <Grid item xs={12}>
          <Typography variant="h6">Asunto</Typography>
          <Typography variant="body1">{notificacionData?.asunto || 'Cargando...'}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Notificación</Typography>
          <Typography variant="body1">{notificacionData?.notificacion || 'Cargando...'}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={3}>
          <ButtonSimple
            text="Cancelar"
            alt="Cancelar"
            design="cancel"
            onClick={hideModal}
          />
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

NotificacionesModal.propTypes = {
  open: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  notificacionData: PropTypes.shape({
    asunto: PropTypes.string,
    notificacion: PropTypes.string,
  }).isRequired,
};

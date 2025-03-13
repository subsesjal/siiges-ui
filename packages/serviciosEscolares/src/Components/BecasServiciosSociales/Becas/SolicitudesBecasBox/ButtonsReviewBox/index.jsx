import { Grid } from '@mui/material';
import { ButtonsForm, ButtonSimple, Context } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React, { useContext, useCallback } from 'react';
import { handleUpdateSolicitud } from '../../utils';

export default function ButtonsReviewBox({ router, solicitudId }) {
  const { setNoti, setLoading } = useContext(Context);

  const handleConfirm = useCallback(() => {
    handleUpdateSolicitud(setNoti, setLoading, { estatusSolicitudBecaId: 3 }, solicitudId);
    router.back();
  }, [setNoti, setLoading, solicitudId]);

  const handleCancel = useCallback(() => {
    handleUpdateSolicitud(setNoti, setLoading, { estatusSolicitudBecaId: 4 }, solicitudId);
    router.back();
  }, [setNoti, setLoading, solicitudId]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <ButtonSimple text="Regresar" design="enviar" onClick={() => router.back()} />
      </Grid>
      <Grid item xs={6}>
        <ButtonsForm
          confirm={handleConfirm}
          confirmText="Enviar"
          cancel={handleCancel}
        />
      </Grid>
    </Grid>
  );
}

ButtonsReviewBox.propTypes = {
  router: PropTypes.shape({ back: PropTypes.func }).isRequired,
  solicitudId: PropTypes.number.isRequired,
};

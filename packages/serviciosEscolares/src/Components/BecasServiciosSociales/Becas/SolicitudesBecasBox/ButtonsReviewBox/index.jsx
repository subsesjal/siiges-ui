import { Grid } from '@mui/material';
import {
  ButtonsForm, ButtonSimple, Context, Input,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React, { useContext, useCallback, useState } from 'react';
import { handleUpdateSolicitud } from '../../utils';

export default function ButtonsReviewBox({ router, solicitudId }) {
  const { setNoti, setLoading } = useContext(Context);
  const [form, setForm] = useState({
    observaciones: '',
    estatusSolicitudBecaId: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleConfirm = useCallback(() => {
    const payload = {
      estatusSolicitudBecaId: 3,
    };
    handleUpdateSolicitud(setNoti, setLoading, payload, solicitudId);
    router.back();
  }, [setNoti, setLoading, solicitudId, form.observaciones, router]);

  const handleCancel = useCallback(() => {
    const payload = {
      estatusSolicitudBecaId: 4,
      observaciones: form.observaciones,
    };
    handleUpdateSolicitud(setNoti, setLoading, payload, solicitudId);
    router.back();
  }, [setNoti, setLoading, solicitudId, form.observaciones, router]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Input
          label="Observaciones"
          id="observaciones"
          name="observaciones"
          value={form.observaciones}
          onChange={handleChange}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={6}>
        <ButtonSimple text="Regresar" design="enviar" onClick={() => router.back()} />
      </Grid>
      <Grid item xs={6}>
        <ButtonsForm
          confirm={handleConfirm}
          confirmText="Procesar Solicitud"
          cancelText="Enviar Observaciones"
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

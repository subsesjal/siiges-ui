import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import {
  Context, DefaultModal, useApi,
} from '@siiges-ui/shared';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import '@siiges-ui/shared/src/styles/buttons/ButtonAdd.css';

function Modal({
  id,
  modalState,
  setModalState,
}) {
  const router = useRouter();
  const { setNoti, setLoading } = useContext(Context);
  const [endpoint, setEndpoint] = useState('');
  const [dataBody, setDataBody] = useState([]);
  const [method, setMethod] = useState('POST');

  const { error, data, loading } = useApi({
    endpoint,
    method,
    dataBody,
  });
  useEffect(() => {
    if (endpoint) {
      setModalState({ ...modalState, open: false });
      setEndpoint('');
    }
    if (data) {
      setNoti({
        open: true,
        message: 'Proceso creado correctamente',
        type: 'success',
      });
      router.back();
    }
  }, [endpoint, data]);
  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (error) {
      const { message } = error;
      setNoti({
        open: true,
        message,
        type: 'error',
      });
    }
  }, [error]);

  const confirmDocument = () => {
    setMethod('POST');
    setDataBody([]);
    setEndpoint(`api/v1/solicitudes/${id}/observaciones`);
  };
  const confirmDocumentWithoutObservations = () => {
    setMethod('PATCH');
    setDataBody({ estatusSolicitudId: 7 });
    setEndpoint(`api/v1/solicitudes/${id}`);
  };

  return (
    <DefaultModal
      title={modalState.title}
      open={modalState.open}
      setOpen={(open) => setModalState({ ...modalState, open })}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="p" sx={{ fontWeight: 'bold' }}>
            Desea terminar la revisión de la documentación? La institución sera
            notificada.
          </Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" spacing={2}>
        <Grid item>
          <ButtonUnstyled
            className="buttonAdd cancel"
            onClick={() => router.back()}
          >
            Cancelar
          </ButtonUnstyled>
        </Grid>
        <Grid item>
          <ButtonUnstyled
            className="buttonAdd enviar"
            onClick={() => confirmDocumentWithoutObservations()}
          >
            Enviar sin observaciones
          </ButtonUnstyled>
        </Grid>
        <Grid item>
          <ButtonUnstyled
            className="buttonAdd guardar"
            onClick={() => confirmDocument()}
          >
            Guardar
          </ButtonUnstyled>
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

Modal.defaultProps = {
  id: 0,
  modalState: {},
};

Modal.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  modalState: PropTypes.shape({
    title: PropTypes.string,
    open: PropTypes.bool,
    disabled: PropTypes.bool,
    confirmAction: PropTypes.func,
    edit: PropTypes.bool,
  }),
  setModalState: PropTypes.func.isRequired,
};

export default Modal;

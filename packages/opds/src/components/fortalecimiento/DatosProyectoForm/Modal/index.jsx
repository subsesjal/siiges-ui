import { Grid } from '@mui/material';
import { ButtonsModal, DefaultModal, Input } from '@siiges-ui/shared';
import React from 'react';
import PropTypes from 'prop-types';

function Modal({ id, modalState, setModalState }) {
  return (
    <DefaultModal
      title={modalState.title}
      open={modalState.open}
      setOpen={(open) => setModalState({ ...modalState, open })}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Input
            name="nombre"
            label="Nombre"
            id={`nombre-${id}`}
            disabled={modalState.disabled}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            name="cantidad"
            label="Cantidad"
            id={`cantidad-${id}`}
            disabled={modalState.disabled}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            name="metrosCuadrados"
            label="Metros Cuadrados"
            id={`metrosCuadrados-${id}`}
            disabled={modalState.disabled}
          />
        </Grid>
      </Grid>
      <ButtonsModal
        confirm={modalState.confirmAction}
        cancel={() => setModalState({ ...modalState, open: false })}
        edit={modalState.edit}
      />
    </DefaultModal>
  );
}

Modal.defaultProps = {
  id: '',
};

Modal.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  modalState: PropTypes.shape({
    title: PropTypes.string,
    open: PropTypes.bool,
    disabled: PropTypes.bool,
    confirmAction: PropTypes.func,
    edit: PropTypes.bool,
  }).isRequired,
  setModalState: PropTypes.func.isRequired,
};

export default Modal;

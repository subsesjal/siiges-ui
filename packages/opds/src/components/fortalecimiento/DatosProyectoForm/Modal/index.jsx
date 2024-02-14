import { Grid } from '@mui/material';
import { ButtonsModal, DefaultModal, Input } from '@siiges-ui/shared';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Modal({
  id, modalState, setModalState, setRowsData,
}) {
  const [form, setForm] = useState({});
  const updateForm = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };
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
            onchange={(e) => updateForm(e.target.name, e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            name="cantidad"
            label="Cantidad"
            id={`cantidad-${id}`}
            onchange={(e) => updateForm(e.target.name, e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            name="metrosCuadrados"
            label="Metros Cuadrados"
            id={`metrosCuadrados-${id}`}
            onchange={(e) => updateForm(e.target.name, e.target.value)}
          />
        </Grid>
      </Grid>
      <ButtonsModal
        confirm={() => { setRowsData(form); setModalState({ ...modalState, open: false }); }}
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
  setRowsData: PropTypes.func.isRequired,
};

export default Modal;

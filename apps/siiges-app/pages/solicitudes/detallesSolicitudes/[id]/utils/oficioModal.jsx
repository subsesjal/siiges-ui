import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { DefaultModal, Input, ButtonStyled } from '@siiges-ui/shared';
// eslint-disable-next-line import/prefer-default-export
export function OficioModal({ open, hideModal, downloadFile }) {
  const [oficioNumber, setOficioNumber] = useState('');
  const [fechaEfecto, setFechaEfecto] = useState('');

  const handleOnSubmit = () => {
    downloadFile('RVOE');
    hideModal();
  };

  return (
    <DefaultModal open={open} setOpen={hideModal} title="Oficio">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Input
            id="oficioNumber"
            label="Número de oficio"
            name="oficioNumber"
            type="number"
            value={oficioNumber}
            onChange={(e) => setOficioNumber(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="fechaEfecto"
            label="Fecha en que surte efecto"
            name="fechaEfecto"
            type="date"
            value={fechaEfecto}
            onChange={(e) => setFechaEfecto(e.target.value)}
            required
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" marginTop={2}>
        <Grid item xs={2}>
          <ButtonStyled
            text="Cancelar"
            alt="Cancelar"
            design="error"
            onclick={hideModal}
          />
        </Grid>
        <Grid item xs={2}>
          <ButtonStyled
            text="Guardar"
            alt="Guardar"
            onclick={handleOnSubmit}
          />
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

OficioModal.propTypes = {
  open: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  downloadFile: PropTypes.func.isRequired,
};

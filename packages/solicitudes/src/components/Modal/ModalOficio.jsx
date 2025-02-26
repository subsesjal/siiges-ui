import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { DefaultModal, Input, ButtonSimple } from '@siiges-ui/shared';
import { updateRecord } from '@siiges-ui/shared/src/utils/handlers/apiUtils';
import PropTypes from 'prop-types';

export default function oficioModal({
  open,
  hideModal,
  downloadFile,
  solicitudId,
}) {
  const [oficioNumber, setOficioNumber] = useState('');
  const [fechaEfecto, setFechaEfecto] = useState('');
  const [setError] = useState('');
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'oficioNumber') {
      setOficioNumber(value);
    } else if (name === 'fechaEfecto') {
      setFechaEfecto(value);
    }
  };

  const handleOnSubmit = async () => {
    if (!fechaEfecto || !oficioNumber) {
      setError('¡Por favor, completa todos los campos!.');
      return;
    }

    const formattedDate = new Date(fechaEfecto).toISOString();
    const dataRvoe = {
      estatusSolicitudId: 11,
      programa: {
        fechaSurteEfecto: formattedDate,
        acuerdoRvoe: String(oficioNumber),
      },
    };

    try {
      const response = await updateRecord({ data: dataRvoe, endpoint: `/solicitudes/${solicitudId}` });
      if (response.statusCode === 200) {
        downloadFile('ACUERDO_RVOE');
        hideModal();
      } else {
        setError(response.errorMessage);
      }
    } catch (errorResponse) {
      setError(errorResponse);
    }
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
            onChange={handleChange}
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
            onChange={handleChange}
            required
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" marginTop={2}>
        <Grid item xs={2}>
          <ButtonSimple
            text="Cancelar"
            design="cancel"
            onClick={hideModal}
          />
        </Grid>
        <Grid item xs={2}>
          <ButtonSimple
            text="Guardar"
            onClick={handleOnSubmit}
          />
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

oficioModal.propTypes = {
  open: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  downloadFile: PropTypes.func.isRequired,
  solicitudId: PropTypes.number.isRequired,
};

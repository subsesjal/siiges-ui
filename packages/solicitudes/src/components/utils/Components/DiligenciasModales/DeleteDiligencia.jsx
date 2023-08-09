import { Grid, Typography } from '@mui/material';
import { ButtonStyled, DefaultModal } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React from 'react';

function DeleteDiligencia({ modal, hideModal, id }) {
  console.log(id);
  return (
    <DefaultModal open={modal} setOpen={hideModal}>
      <Typography>Desea eliminar esta diligencia?</Typography>
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item>
          <ButtonStyled
            text="Cancelar"
            alt="Cancelar"
            design="error"
            onclick={hideModal}
          >
            Cancelar
          </ButtonStyled>
        </Grid>
        <Grid item>
          <ButtonStyled text="Confirmar" alt="Confirmar" onclick={() => {}}>
            Confirmar
          </ButtonStyled>
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

DeleteDiligencia.propTypes = {
  id: PropTypes.number.isRequired,
  modal: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default DeleteDiligencia;

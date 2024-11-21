import { Grid, Typography } from '@mui/material';
import { ButtonSimple, DefaultModal } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React from 'react';

export default function DeleteAsignaturaFormacion({ modal, hideModal, id }) {
  console.log(id);
  return (
    <DefaultModal open={modal} setOpen={hideModal}>
      <Typography>¿Desea eliminar esta asignatura de formación electiva?</Typography>
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item>
          <ButtonSimple
            text="Cancelar"
            design="cancel"
            onClick={hideModal}
          >
            Cancelar
          </ButtonSimple>
        </Grid>
        <Grid item>
          <ButtonSimple text="Confirmar" onClick={() => {}}>
            Confirmar
          </ButtonSimple>
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

DeleteAsignaturaFormacion.propTypes = {
  id: PropTypes.number.isRequired,
  modal: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
};

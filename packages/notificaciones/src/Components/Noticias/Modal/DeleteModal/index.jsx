import React from 'react';
import PropTypes from 'prop-types';
import { ButtonsForm, DefaultModal } from '@siiges-ui/shared';
import { Grid, Typography } from '@mui/material';

export default function DeleteModal({ open, setOpen, onConfirm }) {
  return (
    <DefaultModal open={open} setOpen={setOpen} title="Eliminar noticia">
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h6">
            ¿Estás seguro que deseas eliminar esta noticia?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ButtonsForm cancel={() => setOpen(false)} confirm={onConfirm} />
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

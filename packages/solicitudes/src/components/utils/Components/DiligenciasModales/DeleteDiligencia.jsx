import { Grid, Typography } from '@mui/material';
import {
  ButtonStyled, Context, DefaultModal, deleteRecord,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import DatosGeneralesContext from '../../Context/datosGeneralesContext';

function DeleteDiligencia({ modal, hideModal, id }) {
  const {
    diligenciasRows,
    setDiligenciasRows,
  } = useContext(DatosGeneralesContext);
  const { setNoti } = useContext(Context);

  const handleDelete = () => {
    const endpoint = `/diligencias/${id}`;
    deleteRecord({ endpoint })
      .then(() => {
        const updatedRows = diligenciasRows.filter((row) => row.id !== id);
        setDiligenciasRows(updatedRows);
        setNoti({
          open: true,
          message: 'Se ha borrado la diligencia exitosamente!',
          type: 'success',
        });
      })
      .catch((error) => {
        setNoti({
          open: true,
          message: `Ocurrio un error al eliminar la diligencia: ${error}`,
          type: 'error',
        });
      });

    hideModal();
  };

  return (
    <DefaultModal open={modal} setOpen={hideModal} title="Eliminar Diligente">
      <Typography>¿Desea eliminar esta diligencia?</Typography>
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item>
          <ButtonStyled
            text="Cancelar"
            alt="Cancelar"
            design="error"
            onclick={hideModal}
          />
        </Grid>
        <Grid item>
          <ButtonStyled
            text="Confirmar"
            alt="Confirmar"
            onclick={handleDelete}
          />
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

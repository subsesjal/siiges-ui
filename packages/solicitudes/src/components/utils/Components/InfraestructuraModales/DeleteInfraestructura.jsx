import { Grid, Typography } from '@mui/material';
import {
  ButtonStyled,
  Context,
  DefaultModal,
  deleteRecord,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import PlantelContext from '../../Context/plantelContext';

function DeleteInfraestructura({ modal, hideModal, id }) {
  const { setLoading, setNoti } = useContext(Context);
  const { plantelId, setInfraestructuras } = useContext(PlantelContext);

  const handleDelete = async () => {
    setLoading(true);
    const endpoint = `/planteles/${plantelId}/infraestructuras/${id}`;
    const response = await deleteRecord({ endpoint });

    if (response.statusCode === 200) {
      // Update the infraestructuras array by filtering out the deleted item
      setInfraestructuras((prevInfraestructuras) => prevInfraestructuras.filter(
        (infraestructura) => infraestructura.id !== id,
      ));

      setLoading(false);
      hideModal();
      setNoti({
        open: true,
        message: '¡Se eliminó exitosamente la infraestructura!',
        type: 'success',
      });
    } else {
      setLoading(false);
      setNoti({
        open: true,
        message: `¡Ocurrió un error al borrar esta institución!: ${response.message}`,
        type: 'error',
      });
    }
  };

  return (
    <DefaultModal open={modal} setOpen={hideModal} title="Eliminar Infraestructura">
      <Typography>¿Desea eliminar esta Infraestructura?</Typography>
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

DeleteInfraestructura.propTypes = {
  id: PropTypes.number.isRequired,
  modal: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default DeleteInfraestructura;

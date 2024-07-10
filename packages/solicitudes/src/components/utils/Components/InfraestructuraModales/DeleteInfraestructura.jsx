import { Grid, Typography } from '@mui/material';
import {
  ButtonStyled, Context, DefaultModal, deleteRecord,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import PlantelContext from '../../Context/plantelContext';

function DeleteInfraestructura({ modal, hideModal, id }) {
  const { setLoading, setNoti } = useContext(Context);
  const { plantelId } = useContext(PlantelContext);
  const handleDelete = async () => {
    setLoading(true);
    const endpoint = `/planteles/${plantelId}/infraestructuras/${id}`;
    const response = await deleteRecord({ endpoint });

    if (response.status === 200) {
      // Handle success (e.g., show a success message, refresh data)
      setLoading(false);
      hideModal();
    } else {
      // Handle error (e.g., show an error message)
      setLoading(false);
      setNoti({
        open: true,
        message: `Ocurrio un error al borrar esta institución: ${response.message}`,
        type: 'error',
      });
    }
  };

  return (
    <DefaultModal open={modal} setOpen={hideModal}>
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
          <ButtonStyled text="Confirmar" alt="Confirmar" onclick={handleDelete} />
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

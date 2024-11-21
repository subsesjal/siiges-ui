import { Grid, Typography } from '@mui/material';
import {
  ButtonSimple,
  Context,
  DefaultModal,
  deleteRecord,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import PlantelContext from '../../Context/plantelContext';

function DeleteInstitucionesAledanas({
  modal, hideModal, id, setInstitucionesAledanas,
}) {
  const { setNoti, setLoading } = useContext(Context);
  const { plantelId } = useContext(PlantelContext);

  const handleDelete = async () => {
    setLoading(true);
    const endpoint = `/planteles/${plantelId}/saludInstituciones/${id}`;
    const response = await deleteRecord({ endpoint });

    if (response.statusCode === 200) {
      setInstitucionesAledanas(
        (prevInstitucionesAledanas) => prevInstitucionesAledanas.filter(
          (institucion) => institucion.id !== id,
        ),
      );

      setLoading(false);
      hideModal();
      setNoti({
        open: true,
        message: '¡Se eliminó exitosamente la institución aledaña!',
        type: 'success',
      });
    } else {
      setLoading(false);
      setNoti({
        open: true,
        message: `¡Ocurrió un error al borrar la institución!: ${response.message}`,
        type: 'error',
      });
    }
  };

  return (
    <DefaultModal open={modal} setOpen={hideModal} title="Eliminar Institución Aledaña">
      <Typography>¿Desea eliminar esta institución aledaña?</Typography>
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item>
          <ButtonSimple
            text="Cancelar"
            design="cancel"
            onClick={hideModal}
          />
        </Grid>
        <Grid item>
          <ButtonSimple
            text="Confirmar"
            onClick={handleDelete}
          />
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

DeleteInstitucionesAledanas.propTypes = {
  id: PropTypes.number.isRequired,
  modal: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  setInstitucionesAledanas: PropTypes.func.isRequired,
};

export default DeleteInstitucionesAledanas;

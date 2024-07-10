import { Grid, Typography } from '@mui/material';
import {
  ButtonStyled, Context, DefaultModal, deleteRecord,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

function DeleteDocentes({
  modal, hideModal, id, setDocentesList,
}) {
  const { setLoading, setNoti } = useContext(Context);

  const deleteDocente = () => {
    setLoading(true);
    const endpoint = `/docentes/${id}`; // Replace with your actual endpoint
    deleteRecord({ endpoint })
      .then((response) => {
        console.log('Record deleted:', response);
        setNoti({
          open: true,
          message: 'Docente eliminado con éxito',
          type: 'success',
        });
        setLoading(false);
        hideModal();
        setDocentesList((prevList) => prevList.filter((docente) => docente.id !== id));
      })
      .catch((error) => {
        setNoti({
          open: true,
          message: `Error al eliminar el docente: ${error.message}`,
          type: 'error',
        });
        setLoading(false);
      });
  };

  return (
    <DefaultModal open={modal} setOpen={hideModal} title="Eliminar Docente">
      <Typography>¿Desea eliminar a este/a docente?</Typography>
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
          <ButtonStyled
            text="Confirmar"
            alt="Confirmar"
            onclick={deleteDocente}
          >
            Confirmar
          </ButtonStyled>
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

DeleteDocentes.propTypes = {
  id: PropTypes.number.isRequired,
  modal: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  setDocentesList: PropTypes.func.isRequired,
};

export default DeleteDocentes;

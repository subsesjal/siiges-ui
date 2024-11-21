import { Grid, Typography } from '@mui/material';
import {
  ButtonSimple,
  Context,
  DefaultModal,
  getToken,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

function DeleteAsignatura({
  modal, hideModal, id, setAsignaturasList,
}) {
  const { setNoti } = useContext(Context);

  const handleDelete = async () => {
    const apikey = process.env.NEXT_PUBLIC_API_KEY;
    const url = process.env.NEXT_PUBLIC_URL;
    const token = getToken();

    try {
      const response = await fetch(`${url}/api/v1/asignaturas/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          api_key: apikey,
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('¡No se ha podido eliminar la asignatura!.');
      }

      setAsignaturasList((prevAsignaturas) => prevAsignaturas.filter(
        (asignatura) => asignatura.id !== id,
      ));
      hideModal();
      setNoti({
        open: true,
        message: '¡Asignatura eliminada exitosamente!.',
        type: 'success',
      });
    } catch (error) {
      console.error('¡Error de eliminación!:', error);
      setNoti({ open: true, message: error.toString(), type: 'error' });
    }
  };
  return (
    <DefaultModal open={modal} setOpen={hideModal} title="Eliminar Asignatura">
      <Typography>¿Desea eliminar esta asignatura?</Typography>
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item>
          <ButtonSimple
            text="Cancelar"
            design="cancel"
            onClick={hideModal}
          />
        </Grid>
        <Grid item>
          <ButtonSimple text="Confirmar" onClick={handleDelete} />
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

DeleteAsignatura.propTypes = {
  id: PropTypes.number.isRequired,
  modal: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  setAsignaturasList: PropTypes.func.isRequired,
};

export default DeleteAsignatura;

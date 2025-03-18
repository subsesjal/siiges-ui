import React, { useContext, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Visibility, Edit, Delete, RateReview,
} from '@mui/icons-material';
import { Typography, IconButton } from '@mui/material';
import {
  deleteRecord, Context, DefaultModal, ButtonsForm,
} from '@siiges-ui/shared';
import { handleEditClick, handleViewClick } from '..';

export default function SolicitudesBecasTableButtons({
  id,
  programa,
  institucion,
  estatusSolicitudBecaId,
  router,
  isBecasSicyt,
  onDeleteSuccess,
}) {
  const { setNoti } = useContext(Context);
  const [open, setOpen] = useState(false);
  const isEnRevision = estatusSolicitudBecaId === 'EN REVISION' || estatusSolicitudBecaId === 'PROCESADA';

  const handleDeleteClick = useCallback(async () => {
    try {
      const response = await deleteRecord({ endpoint: `/solicitudesBecas/${id}` });
      if (response.statusCode === 200 || response.statusCode === 204) {
        setNoti({
          open: true,
          message: '¡Solicitud eliminada correctamente!',
          type: 'success',
        });
        onDeleteSuccess();
      } else {
        setNoti({
          open: true,
          message: response.errorMessage || '¡Error al eliminar la solicitud!',
          type: 'error',
        });
      }
    } catch (error) {
      console.error(error);
      setNoti({
        open: true,
        message: '¡Error al eliminar la solicitud!',
        type: 'error',
      });
    }
  }, [id, setNoti, onDeleteSuccess]);

  return (
    <>
      <IconButton
        onClick={() => handleViewClick(id, { programa, institucion }, router)}
        title="Consultar"
      >
        {isBecasSicyt ? <RateReview /> : <Visibility />}
      </IconButton>

      {!isBecasSicyt && !isEnRevision && (
        <>
          <IconButton
            onClick={() => handleEditClick(id, { programa, institucion }, router)}
            title="Editar"
          >
            <Edit />
          </IconButton>
          <IconButton onClick={() => { setOpen(true); }} title="Borrar">
            <Delete />
          </IconButton>
        </>
      )}
      <DefaultModal title="Eliminar solicitud de Becas" open={open} setOpen={setOpen}>
        <Typography>¿Desea eliminar esta solicitud de Becas?</Typography>
        <ButtonsForm confirm={handleDeleteClick} cancel={() => { setOpen(false); }} />
      </DefaultModal>
    </>
  );
}

SolicitudesBecasTableButtons.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  programa: PropTypes.string.isRequired,
  institucion: PropTypes.string.isRequired,
  estatusSolicitudBecaId: PropTypes.string.isRequired,
  router: PropTypes.shape.isRequired,
  isBecasSicyt: PropTypes.bool.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
};

import Tooltip from '@mui/material/Tooltip';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import React, { useContext, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Edit, Delete,
} from '@mui/icons-material';
import { Typography, IconButton } from '@mui/material';
import {
  deleteRecord, Context, DefaultModal, ButtonsForm,
} from '@siiges-ui/shared';
import { handleEditClick, handleViewClick } from '..';

export default function SolicitudesServSocTableButtons({
  id,
  programa,
  institucion,
  estatusSolicitudId,
  router,
  isAdmin,
  onDeleteSuccess,
}) {
  const { setNoti } = useContext(Context);
  const [open, setOpen] = useState(false);
  const isEnRevision = estatusSolicitudId === 'EN REVISIÓN' || estatusSolicitudId === 'LISTA PARA ENTREGA' || estatusSolicitudId === 'CANCELADA';

  const handleDeleteClick = useCallback(async () => {
    try {
      const response = await deleteRecord({ endpoint: `/solicitudesServicioSocial/${id}` });
      if (response.statusCode === 200 || response.statusCode === 204) {
        setNoti({
          open: true,
          message: '¡Solicitud eliminada correctamente!',
          type: 'success',
        });
        onDeleteSuccess(id);
      } else {
        setNoti({
          open: true,
          message: response.errorMessage || '¡Error al eliminar la solicitud!',
          type: 'error',
        });
      }
    } catch (error) {
      setNoti({
        open: true,
        message: '¡Error al eliminar la solicitud!',
        type: 'error',
      });
    }
  }, [id, setNoti, onDeleteSuccess]);

  return (
    <>
      <Tooltip title="Consultar" placement="top">
        <IconButton
          onClick={() => handleViewClick(id, { programa, institucion }, router)}
          title="Consultar"
        >
          <VisibilityOutlinedIcon />
        </IconButton>
      </Tooltip>

      {!isAdmin && !isEnRevision && (
        <>
          <Tooltip title="Editar" placement="top">
            <IconButton
              onClick={() => handleEditClick(id, { programa, institucion }, router)}
              title="Editar"
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar" placement="top">
            <IconButton onClick={() => { setOpen(true); }} title="Borrar">
              <Delete />
            </IconButton>
          </Tooltip>
        </>
      )}
      <DefaultModal title="Eliminar Solicitud Servicio Social" open={open} setOpen={setOpen}>
        <Typography>¿Desea eliminar esta Solicitud de Servicio Social?</Typography>
        <ButtonsForm confirm={handleDeleteClick} cancel={() => { setOpen(false); }} />
      </DefaultModal>
    </>
  );
}

SolicitudesServSocTableButtons.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  programa: PropTypes.string.isRequired,
  institucion: PropTypes.string.isRequired,
  estatusSolicitudId: PropTypes.string.isRequired,
  router: PropTypes.shape.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
};

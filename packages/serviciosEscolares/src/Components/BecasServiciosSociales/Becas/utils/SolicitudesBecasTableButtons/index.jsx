import React from 'react';
import PropTypes from 'prop-types';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { handleEditClick, handleViewClick } from '..';

export default function SolicitudesBecasTableButtons({
  id, programa, institucion, estatusSolicitudBecaId, router,
}) {
  const isEnRevision = estatusSolicitudBecaId === 'EN REVISION';

  return (
    <>
      <IconButton onClick={() => handleViewClick(id, { programa, institucion }, router)} title="Consultar">
        <Visibility />
      </IconButton>
      {!isEnRevision && (
        <>
          <IconButton onClick={() => handleEditClick(id, { programa, institucion }, router)} title="Editar">
            <Edit />
          </IconButton>
          <IconButton onClick={() => ''} title="Borrar">
            <Delete />
          </IconButton>
        </>
      )}
    </>
  );
}

SolicitudesBecasTableButtons.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  programa: PropTypes.string.isRequired,
  institucion: PropTypes.string.isRequired,
  estatusSolicitudBecaId: PropTypes.string.isRequired,
  router: PropTypes.shape.isRequired,
};

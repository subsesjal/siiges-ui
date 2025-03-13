import React from 'react';
import PropTypes from 'prop-types';
import {
  Visibility, Edit, Delete, RateReview,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { handleEditClick, handleViewClick } from '..';

export default function SolicitudesBecasTableButtons({
  id,
  programa,
  institucion,
  estatusSolicitudBecaId,
  router,
  isBecasSicyt,
}) {
  const isEnRevision = estatusSolicitudBecaId === 'EN REVISION' || estatusSolicitudBecaId === 'PROCESADA';

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
          <IconButton onClick={() => {}} title="Borrar">
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
  router: PropTypes.func.isRequired,
  isBecasSicyt: PropTypes.bool.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@mui/material';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import { updateRecord, useUI } from '@siiges-ui/shared';

export default function ButtonsActivarPrograma({ id, permisoAlumno, onSuccess }) {
  const { setNoti } = useUI();

  const handleToggle = async () => {
    const { statusCode, errorMessage } = await updateRecord({
      endpoint: `/programas/${id}`,
      data: { permisoAlumno: !permisoAlumno },
    });

    if (statusCode !== 200) {
      setNoti({
        open: true,
        message: errorMessage || 'Error al actualizar el programa',
        type: 'error',
      });
      return;
    }

    setNoti({
      open: true,
      message: permisoAlumno ? 'Programa desactivado' : 'Programa activado',
      type: 'success',
    });
    onSuccess();
  };

  return (
    <Tooltip title={permisoAlumno ? 'Desactivar' : 'Activar'} placement="top">
      <IconButton aria-label="activar-desactivar" onClick={handleToggle} size="small">
        {permisoAlumno
          ? <ToggleOnIcon color="success" sx={{ fontSize: 56 }} />
          : <ToggleOffIcon color="disabled" sx={{ fontSize: 56 }} />}
      </IconButton>
    </Tooltip>
  );
}

ButtonsActivarPrograma.propTypes = {
  id: PropTypes.number.isRequired,
  permisoAlumno: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@mui/material';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import { updateRecord, useUI } from '@siiges-ui/shared';

export default function ButtonsActivarPlantel({
  programaIds, activo, onSuccess,
}) {
  const { setNoti } = useUI();

  const handleToggle = async () => {
    const { statusCode, errorMessage } = await updateRecord({
      endpoint: '/programas/bulk',
      data: { ids: programaIds, permisoAlumno: !activo },
    });

    if (statusCode !== 200) {
      setNoti({
        open: true,
        message: errorMessage || 'Error al actualizar los programas del plantel',
        type: 'error',
      });
      return;
    }

    setNoti({
      open: true,
      message: activo ? 'Programas del plantel desactivados' : 'Programas del plantel activados',
      type: 'success',
    });
    onSuccess();
  };

  return (
    <Tooltip title={activo ? 'Desactivar todos los programas' : 'Activar todos los programas'} placement="top">
      <IconButton aria-label="activar-desactivar-plantel" onClick={handleToggle} size="small">
        {activo
          ? <ToggleOnIcon color="success" sx={{ fontSize: 56 }} />
          : <ToggleOffIcon color="disabled" sx={{ fontSize: 56 }} />}
      </IconButton>
    </Tooltip>
  );
}

ButtonsActivarPlantel.propTypes = {
  programaIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  activo: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

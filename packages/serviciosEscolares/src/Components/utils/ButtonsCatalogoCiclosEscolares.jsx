import React from 'react';
import PropTypes from 'prop-types';
import {
  IconButton, Stack, Tooltip, Chip,
} from '@mui/material';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import { updateRecord, useUI } from '@siiges-ui/shared';

export default function ButtonsCatalogoCiclosEscolares({
  id, tipo, ciclosActivos, onSuccess,
}) {
  const { setNoti } = useUI();

  const handleUpdate = async (data, successMessage) => {
    const { statusCode } = await updateRecord({
      endpoint: `/ciclosEscolares/catalogo/${id}`,
      data,
    });

    if (statusCode !== 200) {
      setNoti({
        open: true,
        message: 'Error al actualizar el ciclo escolar.',
        type: 'error',
      });
      return;
    }

    setNoti({ open: true, message: successMessage, type: 'success' });
    onSuccess();
  };

  const handleToggleActivo = () => handleUpdate(
    { ciclosActivos: !ciclosActivos },
    ciclosActivos ? 'Ciclo desactivado' : 'Ciclo activado',
  );

  const handleToggleTipo = () => handleUpdate(
    { tipo: tipo === 1 ? 2 : 1 },
    tipo === 1 ? 'Ciclo cambiado a Extemporáneo' : 'Ciclo cambiado a Ordinario',
  );

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Tooltip title={ciclosActivos ? 'Desactivar' : 'Activar'} placement="top">
        <IconButton aria-label="activar-desactivar" onClick={handleToggleActivo} size="small">
          {ciclosActivos
            ? <ToggleOnIcon color="success" sx={{ fontSize: 56 }} />
            : <ToggleOffIcon color="disabled" sx={{ fontSize: 56 }} />}
        </IconButton>
      </Tooltip>
      <Tooltip title="Cambiar tipo de ciclo" placement="top">
        <Chip
          label={tipo === 1 ? 'Ordinario' : 'Extemporáneo'}
          color={tipo === 1 ? 'primary' : 'warning'}
          size="small"
          onClick={handleToggleTipo}
          sx={{ cursor: 'pointer', fontWeight: 500 }}
        />
      </Tooltip>
    </Stack>
  );
}

ButtonsCatalogoCiclosEscolares.propTypes = {
  id: PropTypes.number.isRequired,
  tipo: PropTypes.number.isRequired,
  ciclosActivos: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

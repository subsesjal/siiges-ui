import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { IconButton, Stack } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { GetFile, useUI } from '@siiges-ui/shared';
import PropTypes from 'prop-types';

export default function DocumentosValidacion({ id }) {
  const { setNoti, setLoading } = useUI();
  const domain = process.env.NEXT_PUBLIC_URL;

  const handleVerDocumento = (tipoDocumento) => {
    setLoading(true);

    const fileData = {
      entidadId: id,
      tipoEntidad: 'ALUMNO',
      tipoDocumento,
    };

    GetFile(fileData, (ubicacion, error) => {
      setLoading(false);

      if (error || !ubicacion) {
        setNoti({
          open: true,
          message: 'No se pudo obtener el documento',
          type: 'error',
        });
        return;
      }

      window.open(`${domain}${ubicacion}`, '_blank');
    });
  };

  return (
    <Stack direction="row" spacing={1}>
      <Tooltip title="Ver Archivo de Validación" placement="top">
        <IconButton
          onClick={() => handleVerDocumento('ARCHIVO_VALIDACION_ALUMNO')}
          color="gray"
        >
          <PictureAsPdfIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Ver Certificado" placement="top">
        <IconButton
          onClick={() => handleVerDocumento('ARCHIVO_CERTIFICADO')}
          color="gray"
        >
          <PictureAsPdfIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

DocumentosValidacion.propTypes = {
  id: PropTypes.number.isRequired,
};

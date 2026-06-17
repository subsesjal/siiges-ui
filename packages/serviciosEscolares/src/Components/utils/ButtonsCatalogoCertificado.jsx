import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import { IconButton, Stack } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { getData, useUI } from '@siiges-ui/shared';

export default function ButtonsCatalogoCertificado({ id }) {
  const { setLoading, setNoti } = useUI();

  const handleGenerarPDF = async () => {
    setLoading(true);
    try {
      const response = await getData({
        endpoint: `/files?tipoEntidad=FOLIO_DOCUMENTO_ALUMNO&entidadId=${id}&tipoDocumento=CERTIFICADO_ELECTRONICO_PDF`,
      });
      if (response.errorMessage) {
        setNoti({ open: true, message: response.errorMessage, type: 'error' });
        return;
      }
      if (response.data?.url) {
        window.open(response.data.url, '_blank');
      } else if (typeof response.data === 'string') {
        window.open(response.data, '_blank');
      } else {
        setNoti({ open: true, message: 'No se pudo obtener el PDF', type: 'error' });
      }
    } catch (error) {
      setNoti({ open: true, message: error.message || 'Error al generar el PDF', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      {id && (
        <Tooltip title="Descargar PDF" placement="top">
          <span>
            <IconButton
              aria-label="Descargar PDF"
              onClick={handleGenerarPDF}
            >
              <PictureAsPdfIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
    </Stack>
  );
}

ButtonsCatalogoCertificado.propTypes = {
  id: PropTypes.number.isRequired,
};

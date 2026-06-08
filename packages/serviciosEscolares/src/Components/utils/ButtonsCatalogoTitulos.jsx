import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import { IconButton, Stack } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { GetFile, useUI } from '@siiges-ui/shared';

const url = process.env.NEXT_PUBLIC_URL;

export default function ButtonsCatalogoTitulo({ id, fechaExpedicion }) {
  const { setLoading, setNoti } = useUI();

  const pdfDeshabilitado = fechaExpedicion
    ? new Date(fechaExpedicion) <= new Date('2018-12-31')
    : false;

  const handleDownload = async (tipoDocumento) => {
    setLoading(true);
    try {
      const ubicacion = await GetFile({
        tipoEntidad: 'TITULO_ELECTRONICO',
        entidadId: id,
        tipoDocumento,
      });

      if (ubicacion) {
        window.open(url + ubicacion, '_blank');
      }
    } catch (error) {
      setNoti({
        open: true,
        message: `Error al descargar ${tipoDocumento}: ${error}`,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      {id && (
        <>
          <Tooltip title="Descargar XML" placement="top">
            <IconButton
              aria-label="Descargar XML"
              onClick={() => handleDownload('TITULO_ELECTRONICO_XML')}
            >
              <FileDownloadIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={pdfDeshabilitado ? 'PDF no disponible' : 'Descargar PDF'} placement="top">
            <span>
              <IconButton
                aria-label="Descargar PDF"
                onClick={() => handleDownload('TITULO_ELECTRONICO_PDF')}
                disabled={pdfDeshabilitado}
              >
                <PictureAsPdfIcon />
              </IconButton>
            </span>
          </Tooltip>
        </>
      )}
    </Stack>
  );
}

ButtonsCatalogoTitulo.propTypes = {
  id: PropTypes.number.isRequired,
  fechaExpedicion: PropTypes.string.isRequired,
};

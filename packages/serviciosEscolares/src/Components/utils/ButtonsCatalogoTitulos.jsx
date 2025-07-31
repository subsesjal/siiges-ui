import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import { IconButton, Stack } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Context, GetFile } from '@siiges-ui/shared';

export default function ButtonsCatalogoTitulo({ id }) {
  const { setLoading, setNoti } = useContext(Context);
  const handleDownload = async (tipoDocumento) => {
    setLoading(true);
    try {
      const ubicacion = await GetFile({
        tipoEntidad: 'TITULO_ELECTRONICO',
        entidadId: id,
        tipoDocumento,
      });

      if (ubicacion) {
        window.open(ubicacion, '_blank');
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

          <Tooltip title="Descargar PDF" placement="top">
            <IconButton
              aria-label="Descargar PDF"
              onClick={() => handleDownload('TITULO_ELECTRONICO_PDF')}
            >
              <PictureAsPdfIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Stack>
  );
}

ButtonsCatalogoTitulo.propTypes = {
  id: PropTypes.number.isRequired,
};
